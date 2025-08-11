# GraphQL POC Application

A comprehensive proof-of-concept application demonstrating GraphQL capabilities with QuestDB time-series database, featuring a modern full-stack architecture.

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

**Option 2 - Detailed Setup:**
See [SETUP.md](./SETUP.md) for comprehensive instructions.

## 🏗️ Tech Stack

### Backend
- **Node.js** + **TypeScript** - Runtime and type safety
- **GraphQL Yoga** - Modern GraphQL server
- **QuestDB** - High-performance time-series database
- **Apollo Server** ecosystem integration

### Frontend  
- **React 19** + **TypeScript** - UI framework with latest features
- **Vite** - Fast development server and build tool
- **Ant Design** - Professional UI component library
- **Apollo Client** - GraphQL client with intelligent caching

## 📁 Project Structure

```
poc/
├── server/                    # GraphQL API Server
│   ├── src/
│   │   ├── database/         # QuestDB integration
│   │   ├── resolvers/        # GraphQL resolvers
│   │   ├── types/           # TypeScript definitions
│   │   └── schema.ts        # GraphQL schema
│   ├── schema.graphql       # Schema documentation
│   └── README.md           # Server documentation
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── graphql/         # GraphQL queries/mutations
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript definitions
│   └── README.md           # Client documentation
├── SETUP.md                 # Detailed setup guide
├── TASKS.MD                 # Implementation breakdown
└── package.json            # Workspace configuration
```

## ✨ Features Showcase

### 🔗 Real-time GraphQL Operations
- **Queries**: Users, posts, comments with relationships
- **Mutations**: Create users, posts, comments with validation
- **Real-time Updates**: Auto-polling and cache updates
- **Type Safety**: Full TypeScript integration

### 📊 QuestDB Integration
- **Time-series Data**: Optimized for temporal queries
- **High Performance**: Columnar storage and vectorized execution
- **Dual API**: HTTP REST + InfluxDB Line Protocol
- **Web Console**: Built-in data visualization

### 🎨 Modern UI
- **Professional Design**: Ant Design component library
- **Responsive Layout**: Mobile-friendly interface
- **Real-time Status**: Connection and database monitoring
- **Interactive Forms**: Validation and error handling

### 🛠️ Developer Experience
- **Hot Reload**: Instant development feedback
- **TypeScript**: End-to-end type safety
- **Error Handling**: Comprehensive error boundaries
- **Documentation**: Extensive inline and README docs

## 🌐 Access Points

After starting the application:

- **React Client**: http://localhost:5173
- **GraphQL Playground**: http://localhost:4000/graphql
- **QuestDB Console**: http://localhost:9009
- **QuestDB API**: http://localhost:9000

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP.md](./SETUP.md) | Complete setup and troubleshooting guide |
| [TASKS.MD](./TASKS.MD) | Implementation roadmap and task breakdown |
| [server/README.md](./server/README.md) | Backend API documentation |
| [client/README.md](./client/README.md) | Frontend implementation details |

## 🧪 Testing the POC

### Basic Functionality
1. **Connection Status**: Verify GraphQL server connectivity
2. **Database Stats**: View real-time data counts
3. **Query Operations**: Browse users and posts
4. **Mutation Operations**: Create new data entries

### Advanced Features
1. **GraphQL Playground**: Test queries directly
2. **QuestDB Console**: Explore time-series data
3. **Real-time Updates**: Watch data sync across UI
4. **Form Validation**: Test input validation rules

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

## 🎯 Use Cases Demonstrated

### 1. **Blog Platform**
- Users create accounts
- Authors publish posts
- Readers add comments
- Real-time content updates

### 2. **Time-series Analytics**
- QuestDB optimized queries
- Temporal data relationships
- Performance monitoring
- Real-time dashboards

### 3. **Modern GraphQL Patterns**
- Schema-first development
- Type-safe operations
- Intelligent caching
- Error boundary handling

## 🔧 Production Considerations

- **Database**: Configure QuestDB clustering for scale
- **Caching**: Implement Redis for GraphQL cache persistence  
- **Monitoring**: Add observability with OpenTelemetry
- **Security**: Implement authentication and rate limiting
- **Deployment**: Container orchestration with Docker/Kubernetes

## 🤝 Contributing

This is a proof-of-concept project demonstrating GraphQL + QuestDB integration. Feel free to:

- Explore the codebase
- Test different GraphQL operations
- Experiment with QuestDB features
- Extend the UI with additional components

## 📄 License

MIT License - see individual component licenses for details.

---

**Ready to explore GraphQL with QuestDB?** 🚀  
Start with `npm run dev` and visit http://localhost:5173