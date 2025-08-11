import { Sender } from '@questdb/nodejs-client'
import { config } from 'dotenv'

config()

// QuestDB connection configuration
const QUESTDB_HOST = process.env.QUESTDB_HOST || 'localhost'
const QUESTDB_PORT = parseInt(process.env.QUESTDB_PORT || '9009')

// Types for our POC data
export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface Post {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: number
  content: string
  post_id: number
  author_id: number
  created_at: string
}

class QuestDBClient {
  private sender: Sender | null = null

  async connect(): Promise<void> {
    try {
      this.sender = Sender.fromConfig(`http::addr=${QUESTDB_HOST}:${QUESTDB_PORT};`)
      console.log(`✅ Connected to QuestDB at ${QUESTDB_HOST}:${QUESTDB_PORT}`)
    } catch (error) {
      console.error('❌ Failed to connect to QuestDB:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.sender) {
      await this.sender.close()
      this.sender = null
      console.log('🔌 Disconnected from QuestDB')
    }
  }

  // Insert a new user
  async insertUser(user: Omit<User, 'id' | 'created_at'>): Promise<void> {
    if (!this.sender) {
      throw new Error('QuestDB client not connected')
    }

    try {
      await this.sender
        .table('users')
        .stringColumn('name', user.name)
        .stringColumn('email', user.email)
        .timestampColumn('created_at', Date.now() * 1000) // microseconds
        .atNow()

      await this.sender.flush()
      console.log(`📝 User inserted: ${user.name}`)
    } catch (error) {
      console.error('❌ Failed to insert user:', error)
      throw error
    }
  }

  // Insert a new post
  async insertPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    if (!this.sender) {
      throw new Error('QuestDB client not connected')
    }

    try {
      const now = Date.now() * 1000 // microseconds

      await this.sender
        .table('posts')
        .stringColumn('title', post.title)
        .stringColumn('content', post.content)
        .intColumn('author_id', post.author_id)
        .timestampColumn('created_at', now)
        .timestampColumn('updated_at', now)
        .atNow()

      await this.sender.flush()
      console.log(`📝 Post inserted: ${post.title}`)
    } catch (error) {
      console.error('❌ Failed to insert post:', error)
      throw error
    }
  }

  // Insert a new comment
  async insertComment(comment: Omit<Comment, 'id' | 'created_at'>): Promise<void> {
    if (!this.sender) {
      throw new Error('QuestDB client not connected')
    }

    try {
      await this.sender
        .table('comments')
        .stringColumn('content', comment.content)
        .intColumn('post_id', comment.post_id)
        .intColumn('author_id', comment.author_id)
        .timestampColumn('created_at', Date.now() * 1000) // microseconds
        .atNow()

      await this.sender.flush()
      console.log(`📝 Comment inserted for post ${comment.post_id}`)
    } catch (error) {
      console.error('❌ Failed to insert comment:', error)
      throw error
    }
  }

  // Initialize database with sample data
  async seedDatabase(): Promise<void> {
    console.log('🌱 Seeding database with sample data...')

    try {
      // Insert sample users
      await this.insertUser({ name: 'John Doe', email: 'john@example.com' })
      await this.insertUser({ name: 'Jane Smith', email: 'jane@example.com' })
      await this.insertUser({ name: 'Bob Wilson', email: 'bob@example.com' })

      // Insert sample posts
      await this.insertPost({
        title: 'Getting Started with GraphQL',
        content: 'GraphQL is a powerful query language for APIs...',
        author_id: 1
      })

      await this.insertPost({
        title: 'QuestDB Time Series Database',
        content: 'QuestDB is optimized for time-series data...',
        author_id: 2
      })

      await this.insertPost({
        title: 'TypeScript Best Practices',
        content: 'Here are some TypeScript tips and tricks...',
        author_id: 1
      })

      // Insert sample comments
      await this.insertComment({
        content: 'Great introduction to GraphQL!',
        post_id: 1,
        author_id: 2
      })

      await this.insertComment({
        content: 'Very helpful, thanks for sharing.',
        post_id: 1,
        author_id: 3
      })

      await this.insertComment({
        content: 'QuestDB performance is impressive.',
        post_id: 2,
        author_id: 1
      })

      console.log('✅ Database seeded successfully!')
    } catch (error) {
      console.error('❌ Failed to seed database:', error)
      throw error
    }
  }
}

// Export singleton instance
export const questDB = new QuestDBClient()