import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { config } from 'dotenv'
import { schema } from './schema'

// Load environment variables
config()

const PORT = process.env.PORT || 4000

// Create GraphQL Yoga server
const yoga = createYoga({
  schema,
  cors: {
    origin: ['http://localhost:3000'], // React app will run on port 3000
    credentials: true,
  },
  logging: {
    debug: (...args) => console.log('[DEBUG]', ...args),
    info: (...args) => console.log('[INFO]', ...args),
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
  },
})

// Create HTTP server
const server = createServer(yoga)

server.listen(PORT, () => {
  console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`)
  console.log(`📊 GraphQL playground available at http://localhost:${PORT}/graphql`)
})