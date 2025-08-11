# GraphQL POC Server

A GraphQL server built with Node.js, GraphQL Yoga, TypeScript, and QuestDB.

## Features

- **GraphQL Yoga** - Modern GraphQL server with built-in playground
- **TypeScript** - Full type safety
- **QuestDB** - High-performance time-series database
- **Hot Reload** - Development server with automatic restarts
- **CORS** - Configured for React client integration

## Prerequisites

- Node.js >= 18.0.0
- QuestDB installed and running (see QuestDB Setup section)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` file with your QuestDB configuration

## Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:4000/graphql with:
- GraphQL endpoint: http://localhost:4000/graphql
- GraphQL playground: http://localhost:4000/graphql

## Production

Build and start:
```bash
npm run build
npm start
```

## QuestDB Setup

### Option 1: Docker (Recommended)
```bash
docker run -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 questdb/questdb:latest
```

### Option 2: Direct Download
1. Download QuestDB from https://questdb.io/get-questdb/
2. Extract and run:
```bash
./questdb.sh start
```

QuestDB will be available at:
- HTTP API: http://localhost:9000
- Web Console: http://localhost:9009
- PostgreSQL wire: localhost:8812
- InfluxDB line protocol: localhost:9003

### Database Setup
After QuestDB is running, initialize the database:
```bash
npm run setup-db
```

This will:
- Create necessary tables (users, posts, comments)
- Seed the database with sample data
- Verify the connection is working

## API

### Basic Queries
```graphql
query {
  hello
  version
}
```

### Basic Mutations
```graphql
mutation {
  echo(message: "Hello World")
}
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
server/
├── src/
│   ├── index.ts          # Server entry point
│   └── schema.ts         # GraphQL schema and resolvers
├── dist/                 # Build output
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```