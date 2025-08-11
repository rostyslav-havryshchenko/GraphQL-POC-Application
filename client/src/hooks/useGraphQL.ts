import { useQuery, useMutation } from '@apollo/client'
import type { QueryHookOptions, MutationHookOptions } from '@apollo/client'
import {
  GET_HELLO,
  GET_STATS,
  GET_USERS,
  GET_USER,
  GET_POSTS,
  GET_POSTS_WITH_COMMENTS,
  GET_POSTS_BY_AUTHOR,
  GET_COMMENTS_BY_POST
} from '../graphql/queries'
import {
  ECHO,
  CREATE_USER,
  CREATE_POST,
  CREATE_COMMENT,
  SEED_DATABASE
} from '../graphql/mutations'
import type { 
  User, 
  Post, 
  Comment, 
  Stats, 
  CreateUserInput, 
  CreatePostInput, 
  CreateCommentInput 
} from '../types/graphql'

// Query hooks
export const useHello = (options?: QueryHookOptions) => {
  return useQuery<{ hello: string; version: string }>(GET_HELLO, options)
}

export const useStats = (options?: QueryHookOptions) => {
  return useQuery<{ stats: Stats }>(GET_STATS, options)
}

export const useUsers = (options?: QueryHookOptions) => {
  return useQuery<{ users: User[] }>(GET_USERS, options)
}

export const useUser = (id: number, options?: QueryHookOptions) => {
  return useQuery<{ user: User }>(GET_USER, {
    variables: { id },
    ...options
  })
}

export const usePosts = (options?: QueryHookOptions) => {
  return useQuery<{ posts: Post[] }>(GET_POSTS, options)
}

export const usePostsWithComments = (options?: QueryHookOptions) => {
  return useQuery<{ posts: Post[] }>(GET_POSTS_WITH_COMMENTS, options)
}

export const usePostsByAuthor = (authorId: number, options?: QueryHookOptions) => {
  return useQuery<{ postsByAuthor: Post[] }>(GET_POSTS_BY_AUTHOR, {
    variables: { authorId },
    ...options
  })
}

export const useCommentsByPost = (postId: number, options?: QueryHookOptions) => {
  return useQuery<{ commentsByPost: Comment[] }>(GET_COMMENTS_BY_POST, {
    variables: { postId },
    ...options
  })
}

// Mutation hooks
export const useEcho = (options?: MutationHookOptions<{ echo: string }, { message: string }>) => {
  return useMutation<{ echo: string }, { message: string }>(ECHO, options)
}

export const useCreateUser = (options?: MutationHookOptions<{ createUser: string }, { input: CreateUserInput }>) => {
  return useMutation<{ createUser: string }, { input: CreateUserInput }>(CREATE_USER, {
    refetchQueries: [GET_USERS, GET_STATS],
    ...options
  })
}

export const useCreatePost = (options?: MutationHookOptions<{ createPost: string }, { input: CreatePostInput }>) => {
  return useMutation<{ createPost: string }, { input: CreatePostInput }>(CREATE_POST, {
    refetchQueries: [GET_POSTS, GET_POSTS_WITH_COMMENTS, GET_STATS],
    ...options
  })
}

export const useCreateComment = (options?: MutationHookOptions<{ createComment: string }, { input: CreateCommentInput }>) => {
  return useMutation<{ createComment: string }, { input: CreateCommentInput }>(CREATE_COMMENT, {
    refetchQueries: [GET_POSTS_WITH_COMMENTS, GET_STATS],
    ...options
  })
}

export const useSeedDatabase = (options?: MutationHookOptions<{ seedDatabase: string }>) => {
  return useMutation<{ seedDatabase: string }>(SEED_DATABASE, {
    refetchQueries: [GET_USERS, GET_POSTS, GET_POSTS_WITH_COMMENTS, GET_STATS],
    ...options
  })
}