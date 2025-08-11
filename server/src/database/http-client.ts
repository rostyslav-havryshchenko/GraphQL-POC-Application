import { config } from 'dotenv'
import { User, Post, Comment } from './questdb'

config()

const QUESTDB_HTTP_HOST = process.env.QUESTDB_HOST || 'localhost'
const QUESTDB_HTTP_PORT = parseInt(process.env.QUESTDB_HTTP_PORT || '9000')
const QUESTDB_HTTP_URL = `http://${QUESTDB_HTTP_HOST}:${QUESTDB_HTTP_PORT}`

interface QueryResult {
  query: string
  columns: Array<{
    name: string
    type: string
  }>
  dataset: any[][]
  count: number
}

class QuestDBHttpClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = QUESTDB_HTTP_URL
  }

  // Execute SQL query via HTTP API
  private async executeQuery(sql: string): Promise<QueryResult> {
    try {
      const response = await fetch(`${this.baseUrl}/exec?query=${encodeURIComponent(sql)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error)
      }

      return result
    } catch (error) {
      console.error('❌ QuestDB HTTP query failed:', error)
      throw error
    }
  }

  // Check if QuestDB is available
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.executeQuery('SELECT 1')
      console.log('✅ QuestDB HTTP API is accessible')
      return true
    } catch (error) {
      console.error('❌ QuestDB HTTP API is not accessible:', error)
      return false
    }
  }

  // Create tables if they don't exist
  async initializeTables(): Promise<void> {
    console.log('🏗️ Initializing database tables...')

    try {
      // Create users table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS users (
          name STRING,
          email STRING,
          created_at TIMESTAMP
        ) TIMESTAMP(created_at) PARTITION BY DAY
      `)

      // Create posts table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS posts (
          title STRING,
          content STRING,
          author_id INT,
          created_at TIMESTAMP,
          updated_at TIMESTAMP
        ) TIMESTAMP(created_at) PARTITION BY DAY
      `)

      // Create comments table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS comments (
          content STRING,
          post_id INT,
          author_id INT,
          created_at TIMESTAMP
        ) TIMESTAMP(created_at) PARTITION BY DAY
      `)

      console.log('✅ Database tables initialized')
    } catch (error) {
      console.error('❌ Failed to initialize tables:', error)
      throw error
    }
  }

  // Get all users
  async getUsers(): Promise<User[]> {
    try {
      const result = await this.executeQuery(`
        SELECT 
          row_number() OVER (ORDER BY created_at) as id,
          name,
          email,
          created_at
        FROM users 
        ORDER BY created_at DESC
      `)

      return result.dataset.map((row: any[]) => ({
        id: row[0],
        name: row[1],
        email: row[2],
        created_at: row[3]
      }))
    } catch (error) {
      console.error('❌ Failed to fetch users:', error)
      return []
    }
  }

  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await this.executeQuery(`
        SELECT 
          ${id} as id,
          name,
          email,
          created_at
        FROM users 
        ORDER BY created_at 
        LIMIT ${id}, 1
      `)

      if (result.dataset.length === 0) {
        return null
      }

      const row = result.dataset[0]
      if (!row) {
        return null
      }
      
      return {
        id: row[0],
        name: row[1],
        email: row[2],
        created_at: row[3]
      }
    } catch (error) {
      console.error('❌ Failed to fetch user by ID:', error)
      return null
    }
  }

  // Get all posts
  async getPosts(): Promise<Post[]> {
    try {
      const result = await this.executeQuery(`
        SELECT 
          row_number() OVER (ORDER BY created_at) as id,
          title,
          content,
          author_id,
          created_at,
          updated_at
        FROM posts 
        ORDER BY created_at DESC
      `)

      return result.dataset.map((row: any[]) => ({
        id: row[0],
        title: row[1],
        content: row[2],
        author_id: row[3],
        created_at: row[4],
        updated_at: row[5]
      }))
    } catch (error) {
      console.error('❌ Failed to fetch posts:', error)
      return []
    }
  }

  // Get posts by author ID
  async getPostsByAuthor(authorId: number): Promise<Post[]> {
    try {
      const result = await this.executeQuery(`
        SELECT 
          row_number() OVER (ORDER BY created_at) as id,
          title,
          content,
          author_id,
          created_at,
          updated_at
        FROM posts 
        WHERE author_id = ${authorId}
        ORDER BY created_at DESC
      `)

      return result.dataset.map((row: any[]) => ({
        id: row[0],
        title: row[1],
        content: row[2],
        author_id: row[3],
        created_at: row[4],
        updated_at: row[5]
      }))
    } catch (error) {
      console.error('❌ Failed to fetch posts by author:', error)
      return []
    }
  }

  // Get comments for a post
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    try {
      const result = await this.executeQuery(`
        SELECT 
          row_number() OVER (ORDER BY created_at) as id,
          content,
          post_id,
          author_id,
          created_at
        FROM comments 
        WHERE post_id = ${postId}
        ORDER BY created_at ASC
      `)

      return result.dataset.map((row: any[]) => ({
        id: row[0],
        content: row[1],
        post_id: row[2],
        author_id: row[3],
        created_at: row[4]
      }))
    } catch (error) {
      console.error('❌ Failed to fetch comments:', error)
      return []
    }
  }

  // Get database statistics
  async getStats(): Promise<{ users: number; posts: number; comments: number }> {
    try {
      const [usersResult, postsResult, commentsResult] = await Promise.all([
        this.executeQuery('SELECT count(*) FROM users'),
        this.executeQuery('SELECT count(*) FROM posts'),
        this.executeQuery('SELECT count(*) FROM comments')
      ])

      return {
        users: usersResult.dataset[0]?.[0] || 0,
        posts: postsResult.dataset[0]?.[0] || 0,
        comments: commentsResult.dataset[0]?.[0] || 0
      }
    } catch (error) {
      console.error('❌ Failed to fetch stats:', error)
      return { users: 0, posts: 0, comments: 0 }
    }
  }
}

// Export singleton instance
export const questDBHttp = new QuestDBHttpClient()