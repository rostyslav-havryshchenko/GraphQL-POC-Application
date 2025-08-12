import { questDBHttp, questDB } from '../database'
import type { User, Post, Comment } from '../database'
import {
  validateEmail,
  validateRequired,
  validateStringLength,
  validatePositiveInteger,
  ValidationError
} from '../types/graphql'

// Input types for mutations
interface CreateUserInput {
  name: string
  email: string
}

interface CreatePostInput {
  title: string
  content: string
  authorId: number
}

interface CreateCommentInput {
  content: string
  postId: number
  authorId: number
}

interface UpdatePostInput {
  id: number
  title?: string
  content?: string
}

// Extended types with relationships
interface UserWithPosts extends User {
  posts: Post[]
}

interface PostWithAuthorAndComments extends Post {
  author: User
  comments: Comment[]
}

interface CommentWithAuthor extends Comment {
  author: User
}

export const resolvers = {
  Query: {
    // Basic info queries
    hello: () => 'Hello from GraphQL Yoga with QuestDB!',
    version: () => '1.0.0',
    
    // Database stats
    stats: async () => {
      try {
        return await questDBHttp.getStats()
      } catch (error) {
        console.error('Failed to fetch stats:', error)
        return { users: 0, posts: 0, comments: 0 }
      }
    },

    // User queries
    users: async (): Promise<User[]> => {
      try {
        return await questDBHttp.getUsers()
      } catch (error) {
        console.error('Failed to fetch users:', error)
        return []
      }
    },

    user: async (_parent: any, args: { id: number }): Promise<User | null> => {
      try {
        return await questDBHttp.getUserById(args.id)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        return null
      }
    },

    // Post queries
    posts: async (): Promise<Post[]> => {
      try {
        return await questDBHttp.getPosts()
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        return []
      }
    },

    postsByAuthor: async (_parent: any, args: { authorId: number }): Promise<Post[]> => {
      try {
        return await questDBHttp.getPostsByAuthor(args.authorId)
      } catch (error) {
        console.error('Failed to fetch posts by author:', error)
        return []
      }
    },

    // Comment queries
    commentsByPost: async (_parent: any, args: { postId: number }): Promise<Comment[]> => {
      try {
        return await questDBHttp.getCommentsByPost(args.postId)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
        return []
      }
    },
  },

  Mutation: {
    // Basic echo mutation for testing
    echo: (_parent: any, args: { message: string }) => {
      return `Echo: ${args.message}`
    },

    // User mutations
    createUser: async (_parent: any, args: { input: CreateUserInput }): Promise<string> => {
      try {
        // Validate input
        validateRequired(args.input.name, 'name')
        validateRequired(args.input.email, 'email')
        validateStringLength(args.input.name, 'name', 2, 50)
        
        if (!validateEmail(args.input.email)) {
          throw new ValidationError('Invalid email format')
        }

        await questDBHttp.insertUser({
          name: args.input.name.trim(),
          email: args.input.email.trim().toLowerCase()
        })
        return `User ${args.input.name} created successfully`
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error
        }
        console.error('Failed to create user:', error)
        throw new Error('Failed to create user')
      }
    },

    // Post mutations
    createPost: async (_parent: any, args: { input: CreatePostInput }): Promise<string> => {
      try {
        // Validate input
        validateRequired(args.input.title, 'title')
        validateRequired(args.input.content, 'content')
        validatePositiveInteger(args.input.authorId, 'authorId')
        validateStringLength(args.input.title, 'title', 5, 200)
        validateStringLength(args.input.content, 'content', 10, 5000)

        await questDBHttp.insertPost({
          title: args.input.title.trim(),
          content: args.input.content.trim(),
          author_id: args.input.authorId
        })
        return `Post "${args.input.title}" created successfully`
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error
        }
        console.error('Failed to create post:', error)
        throw new Error('Failed to create post')
      }
    },

    // Comment mutations
    createComment: async (_parent: any, args: { input: CreateCommentInput }): Promise<string> => {
      try {
        // Validate input
        validateRequired(args.input.content, 'content')
        validatePositiveInteger(args.input.postId, 'postId')
        validatePositiveInteger(args.input.authorId, 'authorId')
        validateStringLength(args.input.content, 'content', 3, 1000)

        await questDBHttp.insertComment({
          content: args.input.content.trim(),
          post_id: args.input.postId,
          author_id: args.input.authorId
        })
        return `Comment created successfully`
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error
        }
        console.error('Failed to create comment:', error)
        throw new Error('Failed to create comment')
      }
    },

    // Seed database mutation
    seedDatabase: async (): Promise<string> => {
      try {
        await questDBHttp.seedDatabase()
        return 'Database seeded successfully'
      } catch (error) {
        console.error('Failed to seed database:', error)
        throw new Error('Failed to seed database')
      }
    },
  },

  // Relationship resolvers
  User: {
    posts: async (parent: User): Promise<Post[]> => {
      try {
        return await questDBHttp.getPostsByAuthor(parent.id)
      } catch (error) {
        console.error('Failed to fetch user posts:', error)
        return []
      }
    },
  },

  Post: {
    author: async (parent: Post): Promise<User | null> => {
      try {
        return await questDBHttp.getUserById(parent.author_id)
      } catch (error) {
        console.error('Failed to fetch post author:', error)
        return null
      }
    },
    comments: async (parent: Post): Promise<Comment[]> => {
      try {
        return await questDBHttp.getCommentsByPost(parent.id)
      } catch (error) {
        console.error('Failed to fetch post comments:', error)
        return []
      }
    },
  },

  Comment: {
    author: async (parent: Comment): Promise<User | null> => {
      try {
        return await questDBHttp.getUserById(parent.author_id)
      } catch (error) {
        console.error('Failed to fetch comment author:', error)
        return null
      }
    },
  },
}