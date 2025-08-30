# GraphQL POC Application

## 🚀 Quick Start

**Option 1 - Full Setup:**
```bash
# 1. Install dependencies
npm install

# 2. Start QuestDB (Docker)
docker run -d --name questdb -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 questdb/questdb:latest

# 3. Initialize database
cd server && npm run setup-db && cd ..

# 4. Start both applications
npm run dev
```

## 🏗️ Tech Stack

### Backend
- **Node.js** + **TypeScript** - Runtime and type safety
- **GraphQL Yoga** - Modern GraphQL server
- **QuestDB** - Database
- **Apollo Server** ecosystem integration

### Frontend  
- **React 19** + **TypeScript** - UI framework
- **Vite** - Fast development server and build tool
- **Ant Design** - Professional UI component library
- **Apollo Client** - GraphQL client with intelligent caching

## 🌐 Access Points

After starting the application:

- **React Client**: http://localhost:5173
- **GraphQL Playground**: http://localhost:4000/graphql
- **QuestDB Console**: http://localhost:9009
- **QuestDB API**: http://localhost:9000

## 🚦 Development Commands

```bash
# Root workspace
npm run dev          # Start both server and client
npm run build        # Build both applications
npm run start        # Production mode

# Server specific
npm run dev:server   # Development server
npm run setup-db     # Initialize QuestDB

# Client specific  
npm run dev:client   # Development client
npm run build:client # Build for production
```