import { gql } from '@apollo/client'

// Basic mutations
export const ECHO = gql`
  mutation Echo($message: String!) {
    echo(message: $message)
  }
`

// User mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input)
  }
`

// Post mutations
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input)
  }
`

// Comment mutations
export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input)
  }
`

// Utility mutations
export const SEED_DATABASE = gql`
  mutation SeedDatabase {
    seedDatabase
  }
`