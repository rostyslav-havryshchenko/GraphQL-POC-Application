import { config } from 'dotenv'
import { questDBHttp, questDB, initializeDatabase } from '../database'

config()

async function setupQuestDB() {
  console.log('🔧 Setting up QuestDB for GraphQL POC...')
  
  try {
    // Initialize database
    await initializeDatabase()
    
    // Display connection info
    console.log('\n📊 QuestDB Setup Complete!')
    console.log('='.repeat(50))
    console.log('🌐 QuestDB Web Console: http://localhost:9009')
    console.log('📡 HTTP API: http://localhost:9000')
    console.log('🔌 ILP Port: 9003')
    console.log('🐘 PostgreSQL Wire: 8812')
    console.log('='.repeat(50))
    
    // Get current stats
    const stats = await questDBHttp.getStats()
    console.log('\n📈 Current Database Stats:')
    console.log(`👥 Users: ${stats.users}`)
    console.log(`📝 Posts: ${stats.posts}`)
    console.log(`💬 Comments: ${stats.comments}`)
    
    // Test queries
    console.log('\n🔍 Testing sample queries...')
    
    const users = await questDBHttp.getUsers()
    console.log(`✅ Fetched ${users.length} users`)
    
    const posts = await questDBHttp.getPosts()
    console.log(`✅ Fetched ${posts.length} posts`)
    
    if (posts.length > 0) {
      const comments = await questDBHttp.getCommentsByPost(1)
      console.log(`✅ Fetched ${comments.length} comments for post 1`)
    }
    
    console.log('\n🎉 QuestDB setup and testing complete!')
    console.log('🚀 You can now start the GraphQL server with: npm run dev')
    
  } catch (error) {
    console.error('❌ QuestDB setup failed:', error)
    console.log('\n📖 Troubleshooting:')
    console.log('1. Make sure QuestDB is running:')
    console.log('   Docker: docker run -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 questdb/questdb:latest')
    console.log('2. Check if ports are available (9000, 9009, 8812, 9003)')
    console.log('3. Visit http://localhost:9009 to access QuestDB web console')
    
    process.exit(1)
  } finally {
    await questDB.disconnect()
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupQuestDB()
}