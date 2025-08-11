import { createSchema } from 'graphql-yoga'

// Define GraphQL type definitions
const typeDefs = `
  type Query {
    hello: String
    version: String
  }

  type Mutation {
    echo(message: String!): String
  }
`

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL Yoga!',
    version: () => '1.0.0',
  },
  Mutation: {
    echo: (_parent: any, args: { message: string }) => {
      return `Echo: ${args.message}`
    },
  },
}

// Create and export schema
export const schema = createSchema({
  typeDefs,
  resolvers,
})