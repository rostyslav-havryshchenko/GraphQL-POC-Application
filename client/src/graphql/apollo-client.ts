import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// GraphQL server endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

// Create Apollo Client instance
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Cache policy for users query
          users: {
            merge(_existing = [], incoming) {
              return incoming
            }
          },
          // Cache policy for posts query
          posts: {
            merge(_existing = [], incoming) {
              return incoming
            }
          },
          // Cache policy for comments query
          commentsByPost: {
            keyArgs: ['postId'],
            merge(_existing = [], incoming) {
              return incoming
            }
          }
        }
      },
      User: {
        fields: {
          posts: {
            merge(_existing = [], incoming) {
              return incoming
            }
          }
        }
      },
      Post: {
        fields: {
          comments: {
            merge(_existing = [], incoming) {
              return incoming
            }
          }
        }
      }
    }
  }),
  // Development settings
  connectToDevTools: import.meta.env.DEV,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})