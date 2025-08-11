// GraphQL Types - Generated from server schema

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  posts: Post[]
}

export interface Post {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
  author?: User
  comments: Comment[]
}

export interface Comment {
  id: number
  content: string
  post_id: number
  author_id: number
  created_at: string
  author?: User
}

export interface Stats {
  users: number
  posts: number
  comments: number
}

// Input types for mutations
export interface CreateUserInput {
  name: string
  email: string
}

export interface CreatePostInput {
  title: string
  content: string
  authorId: number
}

export interface CreateCommentInput {
  content: string
  postId: number
  authorId: number
}

export interface UpdatePostInput {
  id: number
  title?: string
  content?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  loading: boolean
  error?: Error | null
}

// Common component props
export interface ComponentProps {
  className?: string
  style?: React.CSSProperties
}