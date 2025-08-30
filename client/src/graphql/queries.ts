import { gql } from '@apollo/client'

// Basic info queries
export const GET_HELLO = gql`
  query GetHello {
    hello
    version
  }
`

export const GET_STATS = gql`
  query GetStats {
    stats {
      users
      posts
      comments
    }
  }
`

// User queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      created_at
    }
  }
`

// Post queries
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author_id
      created_at
      updated_at
      author {
        id
        name
        email
      }
    }
  }
`

export const GET_POSTS_WITH_COMMENTS = gql`
  query GetPostsWithComments {
    posts {
      id
      title
      content
      author_id
      created_at
      updated_at
      author {
        id
        name
        email
      }
      comments {
        id
        content
        created_at
        author {
          id
          name
        }
      }
    }
  }
`

