# GraphQL POC Demo Guide

Step-by-step demonstration of the GraphQL + QuestDB proof-of-concept application.

## 🎯 Demo Overview

This demo showcases a complete GraphQL application with:
- Real-time data operations
- Time-series database integration
- Modern React UI with Ant Design
- Full TypeScript type safety

**Demo Duration**: ~10-15 minutes  
**Audience**: Developers interested in GraphQL, QuestDB, or modern full-stack development

## 🚀 Demo Setup (5 minutes)

### Prerequisites Check
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 8.0.0
docker --version # For QuestDB
```

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start QuestDB
docker run -d --name questdb-demo \
  -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 \
  questdb/questdb:latest

# 3. Initialize database
cd server && npm run setup-db && cd ..

# 4. Start applications
npm run dev
```

**Expected Output:**
- Server: `🚀 GraphQL server running on http://localhost:4000/graphql`
- Client: `Local: http://localhost:5173/`
- QuestDB: Available at http://localhost:9009

## 📱 Demo Script

### Part 1: Application Overview (2 minutes)

**Open browser to http://localhost:5173**

**"Let me show you a full-stack GraphQL application that demonstrates modern development practices."**

1. **Point out the tech stack:**
   - React 19 with TypeScript
   - GraphQL Yoga server
   - QuestDB time-series database
   - Ant Design UI components

2. **Show the connection status:**
   - Green connection indicator
   - Server version and endpoint information
   - Real-time connection monitoring

### Part 2: Database Integration (3 minutes)

**"First, let's look at our QuestDB integration and real-time data."**

1. **Database Statistics Card:**
   - Show current user/post/comment counts
   - Click "Refresh" to demonstrate real-time updates
   - If empty, click "Seed Database" to populate sample data

2. **Open QuestDB Console** (new tab: http://localhost:9009):
   - Show the web-based SQL console
   - Run sample query: `SELECT * FROM users ORDER BY created_at DESC`
   - Explain time-series optimizations and columnar storage

3. **Back to main app:**
   - Show how statistics updated automatically
   - Demonstrate polling and real-time sync

### Part 3: GraphQL Operations (5 minutes)

**"Now let's explore the GraphQL operations playground."**

1. **Query Operations Tab:**
   
   **Users List:**
   - Show paginated user table with avatars
   - Point out real-time creation timestamps
   - Click "View" button (logs to console)
   
   **Posts List:**
   - Show rich post cards with author information
   - Point out nested comment previews
   - Demonstrate relationship loading (posts → authors → comments)
   - Show ellipsis text expansion

2. **Create Data Tab:**
   
   **Create User Form:**
   ```
   Name: "Demo User"
   Email: "demo@example.com"
   ```
   - Submit and show success message
   - Switch to Query tab to see new user appear
   - Point out form validation (try invalid email)
   
   **Create Post Form:**
   - Select the newly created user as author
   - Title: "Live GraphQL Demo"
   - Content: "This post was created during a live demonstration of our GraphQL POC application..."
   - Submit and show real-time updates
   
   **Create Comment Form:**
   - Select user and post
   - Content: "Great demo! GraphQL makes data fetching so elegant."
   - Submit and watch comment appear in posts list

### Part 4: Developer Experience (3 minutes)

**"Let's look at the developer experience and technical implementation."**

1. **GraphQL Playground** (new tab: http://localhost:4000/graphql):
   ```graphql
   query GetPostsWithComments {
     posts {
       title
       content
       author {
         name
         email
       }
       comments {
         content
         author {
           name
         }
       }
     }
   }
   ```
   - Run query and show nested data loading
   - Demonstrate schema exploration
   - Show type safety and autocomplete

2. **Code Structure** (optional, if showing code):
   - TypeScript integration throughout
   - Custom React hooks for GraphQL operations
   - Automatic cache updates and refetching
   - Form validation and error handling

3. **Real-time Features:**
   - Show auto-polling (wait 30 seconds for refresh)
   - Demonstrate offline/online connection status
   - Error handling when server is unavailable

### Part 5: Architecture & Performance (2 minutes)

**"Finally, let's discuss the architecture and what makes this special."**

1. **QuestDB Benefits:**
   - Time-series optimized storage
   - High-performance ingestion (InfluxDB Line Protocol)
   - SQL compatibility with time-series extensions
   - Built-in web console for data exploration

2. **GraphQL Benefits:**
   - Single endpoint for all data operations
   - Strong typing and schema-first development
   - Efficient data fetching (no over/under-fetching)
   - Real-time capabilities with subscriptions (future enhancement)

3. **Modern Stack:**
   - Vite for lightning-fast development
   - Apollo Client intelligent caching
   - TypeScript end-to-end type safety
   - Professional UI with Ant Design

## 🎤 Key Demo Points

### For Technical Audiences:
- **Type Safety**: Full TypeScript integration from database to UI
- **Performance**: QuestDB's columnar storage and vectorized execution
- **Developer Experience**: Hot reload, auto-completion, error handling
- **Modern Patterns**: React hooks, GraphQL resolvers, time-series data

### For Business Audiences:
- **Real-time Data**: Live updates without page refreshes
- **User Experience**: Professional UI with immediate feedback
- **Scalability**: Time-series database optimized for growth
- **Development Speed**: Rapid iteration with modern tooling

## 🔍 Questions & Extensions

### Common Demo Questions:

**Q: "How does this compare to REST APIs?"**
A: Show GraphQL playground vs. multiple REST endpoints, demonstrate single request for complex nested data.

**Q: "What about real-time features?"**
A: Demonstrate polling, mention GraphQL subscriptions as next step.

**Q: "How does QuestDB handle time-series data?"**
A: Open QuestDB console, show timestamp-based queries and partitioning.

### Live Extensions:
1. **Custom Query**: Write a live GraphQL query filtering users by creation date
2. **Data Visualization**: Show QuestDB's built-in charting for time-series data
3. **Error Handling**: Disconnect server to show error states and reconnection
4. **Mobile View**: Demonstrate responsive design on mobile device

## 🛠️ Demo Troubleshooting

### If Something Goes Wrong:

**Database Connection Issues:**
```bash
# Check QuestDB status
docker ps | grep questdb

# Restart if needed
docker restart questdb-demo

# Re-seed database
cd server && npm run setup-db
```

**Server Issues:**
```bash
# Check server logs
cd server && npm run dev

# Verify TypeScript compilation
npm run type-check
```

**Client Issues:**
```bash
# Clear cache and restart
rm -rf client/node_modules/.vite
cd client && npm run dev
```

## 🎯 Demo Outcomes

By the end of this demo, viewers should understand:

1. **GraphQL Benefits**: Single endpoint, type safety, efficient data fetching
2. **QuestDB Capabilities**: Time-series optimization, SQL compatibility, web console
3. **Modern Stack**: React + TypeScript + Vite development experience
4. **Real-world Application**: How these technologies work together

## 📋 Demo Checklist

Before starting demo:
- [ ] All dependencies installed
- [ ] QuestDB running on correct ports
- [ ] Database seeded with sample data
- [ ] Both server and client running
- [ ] Browser tabs prepared (app, GraphQL playground, QuestDB console)
- [ ] Network connection stable

During demo:
- [ ] Speak clearly and explain what you're clicking
- [ ] Show real-time updates and data flow
- [ ] Highlight key technical concepts
- [ ] Engage audience with questions
- [ ] Handle questions gracefully

After demo:
- [ ] Provide setup instructions
- [ ] Share repository links
- [ ] Offer to answer additional questions
- [ ] Clean up demo resources

---

**Ready to demonstrate the power of GraphQL + QuestDB?** 🎪  
This POC showcases modern full-stack development at its finest!