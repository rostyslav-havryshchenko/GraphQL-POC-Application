# GraphQL POC Setup Guide

Complete setup instructions for the GraphQL + QuestDB + React proof-of-concept application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Docker** (recommended for QuestDB) OR
- **QuestDB** standalone installation

## Quick Start (Recommended)

### 1. Install Dependencies

```bash
# Install root workspace dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Start QuestDB

**Option A: Using Docker (Recommended)**
```bash
docker run -d --name questdb \
  -p 9000:9000 \
  -p 9009:9009 \
  -p 8812:8812 \
  -p 9003:9003 \
  questdb/questdb:latest
```

**Option B: Direct Download**
1. Download QuestDB from https://questdb.io/get-questdb/
2. Extract and run: `./questdb.sh start`

### 3. Initialize Database

```bash
cd server && npm run setup-db
```

This will:
- Verify QuestDB connection
- Create necessary tables
- Seed with sample data
- Display connection information

### 4. Start Development Servers

**Terminal 1 - GraphQL Server:**
```bash
cd server && npm run dev
```
Server will run on: http://localhost:4000/graphql

**Terminal 2 - React Client:**
```bash
cd client && npm run dev
```
Client will run on: http://localhost:5173

### 5. Verify Setup

1. Open http://localhost:5173 in your browser
2. Check connection status (should show green)
3. View database statistics
4. Try the GraphQL operations playground

## Detailed Setup Instructions

### QuestDB Setup

QuestDB will be available at:
- **Web Console**: http://localhost:9009 (Database management UI)
- **HTTP API**: http://localhost:9000 (REST API)
- **PostgreSQL Wire**: localhost:8812 (SQL queries)
- **InfluxDB Line Protocol**: localhost:9003 (High-performance ingestion)

### Server Configuration

The server can be configured via environment variables. Copy the example:

```bash
cd server
cp .env.example .env
```

Edit `.env` file if needed:
```env
PORT=4000
NODE_ENV=development
QUESTDB_HOST=localhost
QUESTDB_PORT=9000
QUESTDB_HTTP_PORT=9009
```

### Development Scripts

**Root workspace:**
- `npm run dev` - Start both server and client
- `npm run build` - Build both applications
- `npm run start` - Start both in production mode

**Server:**
- `npm run dev` - Development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Production server
- `npm run setup-db` - Initialize and seed database
- `npm run type-check` - TypeScript validation

**Client:**
- `npm run dev` - Development server (Vite)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - ESLint validation

## Troubleshooting

### Common Issues

**1. QuestDB Connection Failed**
- Ensure QuestDB is running: `docker ps` or check process
- Verify ports are available (9000, 9009, 8812, 9003)
- Check firewall settings
- Visit http://localhost:9009 to confirm QuestDB web console

**2. GraphQL Server Error**
- Check server logs for detailed error messages
- Verify QuestDB connection with `npm run setup-db`
- Ensure all dependencies are installed: `npm install`
- Check TypeScript compilation: `npm run type-check`

**3. Client Connection Error**
- Verify GraphQL server is running on port 4000
- Check browser console for CORS errors
- Ensure both server and client are running
- Clear browser cache and try again

**4. Database Seeding Issues**
- Stop and restart QuestDB
- Clear QuestDB data directory (if using standalone)
- Re-run database setup: `npm run setup-db`
- Check QuestDB logs for errors

### Port Conflicts

If default ports are in use, update configuration:

**Server (.env file):**
```env
PORT=4001  # Change GraphQL server port
QUESTDB_HTTP_PORT=9010  # Change QuestDB HTTP port
```

**Client (vite.config.ts):**
```typescript
export default defineConfig({
  server: {
    port: 5174  // Change client port
  }
})
```

### Performance Optimization

**Database:**
- QuestDB is optimized for time-series data
- Consider partitioning strategies for large datasets
- Monitor memory usage in production

**Client:**
- Bundle size can be reduced with code splitting
- Enable Apollo Client cache persistence
- Implement service worker for offline support

## Testing the Application

### Basic Functionality Test

1. **Connection Test:**
   - Visit http://localhost:5173
   - Verify green connection status

2. **Database Operations:**
   - Check database statistics show counts > 0
   - If empty, click "Seed Database"

3. **GraphQL Queries:**
   - Navigate to "Query Data" tab
   - View users and posts lists
   - Verify data loads correctly

4. **GraphQL Mutations:**
   - Navigate to "Create Data" tab
   - Create a new user
   - Create a new post (requires users)
   - Create a new comment (requires users and posts)
   - Verify real-time updates in Query Data tab

### Advanced Testing

**GraphQL Playground:**
- Visit http://localhost:4000/graphql
- Test queries and mutations directly
- Explore schema documentation

**QuestDB Console:**
- Visit http://localhost:9009
- Run SQL queries on the data
- Explore time-series capabilities

**API Testing:**
```bash
# Test GraphQL endpoint
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ hello version }"}'

# Test QuestDB HTTP API
curl "http://localhost:9000/exec?query=SELECT%20*%20FROM%20users"
```

## Production Deployment

### Build for Production

```bash
# Build both applications
npm run build

# Test production builds
npm run start
```

### Environment Variables

Set production environment variables:

```env
NODE_ENV=production
QUESTDB_HOST=your-questdb-host
QUESTDB_PORT=9000
PORT=4000
```

### Docker Deployment

A complete Docker setup can be created with:
- QuestDB container
- Node.js server container
- Nginx for client static files

## Next Steps

After successful setup, explore:

1. **GraphQL Schema**: Review `server/schema.graphql`
2. **QuestDB Features**: Time-series functions, SQL capabilities
3. **React Components**: Extend UI with more features
4. **Real-time Updates**: Add GraphQL subscriptions
5. **Authentication**: Add user authentication
6. **Monitoring**: Add logging and metrics

## Support

- **Documentation**: See individual README files in `server/` and `client/`
- **Issues**: Check console logs and error messages
- **QuestDB Docs**: https://questdb.io/docs/
- **GraphQL Docs**: https://graphql.org/learn/
- **React Docs**: https://react.dev/

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│  GraphQL Server │───▶│    QuestDB      │
│  (Port 5173)    │    │   (Port 4000)   │    │ (Ports 9000-9009)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                      │                      │
│ • Apollo Client      │ • GraphQL Yoga      │ • Time-series DB
│ • Ant Design UI      │ • TypeScript        │ • HTTP/SQL API
│ • TypeScript         │ • QuestDB Client    │ • Real-time data
│ • Vite Dev Server    │ • Schema & Resolvers│ • High performance
└─────────────────────┘└─────────────────────┘└─────────────────────┘
```

This completes the full-stack GraphQL proof-of-concept setup!