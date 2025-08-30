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

      const result = await response.json() as QueryResult & { error?: string }
      
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

  // Get user by ID (using row position)
  async getUserById(id: number): Promise<User | null> {
    try {
      const users = await this.getUsers()
      return users.find(user => user.id === id) || null
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

  // Seed database with sample data using HTTP API
  async seedDatabase(): Promise<void> {
    console.log('🌱 Seeding database with sample data via HTTP API...')

    try {
      const timestamps = [
        new Date(Date.now() - 3000).toISOString(), // 3 seconds ago
        new Date(Date.now() - 2000).toISOString(), // 2 seconds ago
        new Date(Date.now() - 1000).toISOString(), // 1 second ago
      ]

      // Insert users
      await this.executeQuery(`
        INSERT INTO users (name, email, created_at) VALUES 
        ('John Doe', 'john@example.com', '${timestamps[0]}'),
        ('Jane Smith', 'jane@example.com', '${timestamps[1]}'),
        ('Bob Wilson', 'bob@example.com', '${timestamps[2]}')
      `)
      console.log('📝 Users inserted successfully')

      // Insert posts
      await this.executeQuery(`
        INSERT INTO posts (title, content, author_id, created_at, updated_at) VALUES 
        ('Getting Started with GraphQL', 'GraphQL is a powerful query language for APIs...', 1, '${timestamps[0]}', '${timestamps[0]}'),
        ('QuestDB Time Series Database', 'QuestDB is optimized for time-series data...', 2, '${timestamps[1]}', '${timestamps[1]}'),
        ('TypeScript Best Practices', 'Here are some TypeScript tips and tricks...', 1, '${timestamps[2]}', '${timestamps[2]}')
      `)
      console.log('📝 Posts inserted successfully')

      // Insert comments  
      await this.executeQuery(`
        INSERT INTO comments (content, post_id, author_id, created_at) VALUES 
        ('Great introduction to GraphQL!', 1, 2, '${timestamps[0]}'),
        ('Very helpful, thanks for sharing.', 1, 3, '${timestamps[1]}'),
        ('QuestDB performance is impressive.', 2, 1, '${timestamps[2]}')
      `)
      console.log('📝 Comments inserted successfully')

      console.log('✅ Database seeded successfully!')
    } catch (error) {
      console.error('❌ Failed to seed database:', error)
      throw error
    }
  }

  // Insert a new user via HTTP API
  async insertUser(user: { name: string; email: string }): Promise<void> {
    try {
      const now = new Date().toISOString()
      await this.executeQuery(`
        INSERT INTO users (name, email, created_at) VALUES 
        ('${user.name.replace(/'/g, "''")}', '${user.email.replace(/'/g, "''")}', '${now}')
      `)
      console.log(`📝 User inserted via HTTP: ${user.name}`)
    } catch (error) {
      console.error('❌ Failed to insert user via HTTP:', error)
      throw error
    }
  }

  // Insert a new post via HTTP API
  async insertPost(post: { title: string; content: string; author_id: number }): Promise<void> {
    try {
      const now = new Date().toISOString()
      await this.executeQuery(`
        INSERT INTO posts (title, content, author_id, created_at, updated_at) VALUES 
        ('${post.title.replace(/'/g, "''")}', '${post.content.replace(/'/g, "''")}', ${post.author_id}, '${now}', '${now}')
      `)
      console.log(`📝 Post inserted via HTTP: ${post.title}`)
    } catch (error) {
      console.error('❌ Failed to insert post via HTTP:', error)
      throw error
    }
  }

  // Insert a new comment via HTTP API
  async insertComment(comment: { content: string; post_id: number; author_id: number }): Promise<void> {
    try {
      const now = new Date().toISOString()
      await this.executeQuery(`
        INSERT INTO comments (content, post_id, author_id, created_at) VALUES 
        ('${comment.content.replace(/'/g, "''")}', ${comment.post_id}, ${comment.author_id}, '${now}')
      `)
      console.log(`📝 Comment inserted via HTTP for post ${comment.post_id}`)
    } catch (error) {
      console.error('❌ Failed to insert comment via HTTP:', error)
      throw error
    }
  }
}

// Export singleton instance
export const questDBHttp = new QuestDBHttpClient()