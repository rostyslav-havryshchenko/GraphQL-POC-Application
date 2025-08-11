import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { config } from 'dotenv'
import { schema } from './schema'
import { initializeDatabase, closeDatabase } from './database'

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

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  console.log(`\n🔄 Received ${signal}, shutting down gracefully...`)
  
  // Close database connections
  await closeDatabase()
  
  // Close HTTP server
  server.close((err) => {
    if (err) {
      console.error('❌ Error closing server:', err)
      process.exit(1)
    }
    console.log('👋 Server closed successfully')
    process.exit(0)
  })
}

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Start server
async function startServer() {
  try {
    // Initialize database connection
    await initializeDatabase()
    
    // Start HTTP server
    server.listen(PORT, () => {
      console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`)
      console.log(`📊 GraphQL playground available at http://localhost:${PORT}/graphql`)
      console.log(`🗃️ QuestDB web console: http://localhost:9009`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Start the server
startServer()