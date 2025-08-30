import { useQuery, useMutation } from '@apollo/client'
import type { QueryHookOptions, MutationHookOptions } from '@apollo/client'
import {
  GET_HELLO,
  GET_STATS,
  GET_USERS,
  GET_POSTS,
  GET_POSTS_WITH_COMMENTS
} from '../graphql/queries'
import {
  CREATE_USER,
  CREATE_POST,
  CREATE_COMMENT,
  SEED_DATABASE
} from '../graphql/mutations'
import type { 
  User, 
  Post,
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

export const usePosts = (options?: QueryHookOptions) => {
  return useQuery<{ posts: Post[] }>(GET_POSTS, options)
}

export const usePostsWithComments = (options?: QueryHookOptions) => {
  return useQuery<{ posts: Post[] }>(GET_POSTS_WITH_COMMENTS, options)
}

// Mutation hooks
export const useCreateUser = (options?: MutationHookOptions<{ createUser: string }, { input: CreateUserInput }>) => {
  return useMutation<{ createUser: string }, { input: CreateUserInput }>(CREATE_USER, {
    refetchQueries: ['GetUsers', 'GetStats'],
    awaitRefetchQueries: true,
    ...options
  })
}

export const useCreatePost = (options?: MutationHookOptions<{ createPost: string }, { input: CreatePostInput }>) => {
  return useMutation<{ createPost: string }, { input: CreatePostInput }>(CREATE_POST, {
    refetchQueries: ['GetPosts', 'GetPostsWithComments', 'GetStats'],
    awaitRefetchQueries: true,
    ...options
  })
}

export const useCreateComment = (options?: MutationHookOptions<{ createComment: string }, { input: CreateCommentInput }>) => {
  return useMutation<{ createComment: string }, { input: CreateCommentInput }>(CREATE_COMMENT, {
    refetchQueries: ['GetPostsWithComments', 'GetStats'],
    awaitRefetchQueries: true,
    ...options
  })
}

export const useSeedDatabase = (options?: MutationHookOptions<{ seedDatabase: string }>) => {
  return useMutation<{ seedDatabase: string }>(SEED_DATABASE, {
    refetchQueries: ['GetUsers', 'GetStats'],
    awaitRefetchQueries: true,
    ...options
  })
}