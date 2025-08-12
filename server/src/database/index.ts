import { questDB } from './questdb'
import { questDBHttp } from './http-client'

// Database initialization function
export async function initializeDatabase(): Promise<void> {
  console.log('🚀 Initializing database connection...')

  try {
    // Check if QuestDB HTTP API is accessible
    const isHealthy = await questDBHttp.healthCheck()
    
    if (!isHealthy) {
      console.warn('⚠️ QuestDB HTTP API not accessible. Please ensure QuestDB is running.')
      console.warn('📖 See server/README.md for QuestDB setup instructions.')
      return
    }

    // Initialize tables
    await questDBHttp.initializeTables()

    // Connect the ILP client for data insertion
    await questDB.connect()

    // Check if we need to seed the database
    const stats = await questDBHttp.getStats()
    
    if (stats.users === 0 && stats.posts === 0 && stats.comments === 0) {
      console.log('🌱 Database is empty, seeding with sample data...')
      await questDBHttp.seedDatabase()
      console.log('✅ Database seeded successfully!')
    } else {
      console.log('📊 Database already contains data:', stats)
    }

    console.log('✅ Database initialization complete!')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    console.warn('⚠️ The server will continue without database functionality.')
    console.warn('📖 See server/README.md for QuestDB setup instructions.')
  }
}

// Graceful shutdown function
export async function closeDatabase(): Promise<void> {
  try {
    await questDB.disconnect()
    console.log('👋 Database connections closed')
  } catch (error) {
    console.error('❌ Error closing database:', error)
  }
}

// Export database clients
export { questDB, questDBHttp }
export * from './questdb'