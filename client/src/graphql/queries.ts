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

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      created_at
      posts {
        id
        title
        content
        created_at
        updated_at
      }
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

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: Int!) {
    postsByAuthor(authorId: $authorId) {
      id
      title
      content
      author_id
      created_at
      updated_at
    }
  }
`

// Comment queries
export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: Int!) {
    commentsByPost(postId: $postId) {
      id
      content
      post_id
      author_id
      created_at
      author {
        id
        name
        email
      }
    }
  }
`