# GraphQL POC Application

A proof-of-concept application demonstrating GraphQL capabilities with a modern tech stack.

## Tech Stack

### Server
- **Node.js** - Runtime environment
- **GraphQL Yoga** - GraphQL server
- **TypeScript** - Type safety
- **QuestDB** - Time-series database

### Client
- **React** - Frontend framework
- **TypeScript** - Type safety
- **Ant Design** - UI component library

## Project Structure

```
poc/
├── server/          # Backend GraphQL API
├── client/          # Frontend React application
├── TASKS.MD         # Detailed task breakdown
├── package.json     # Root workspace configuration
└── README.md        # This file
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- QuestDB (installation instructions in server/README.md)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up the server (see server/README.md)
4. Set up the client (see client/README.md)

### Development

Run both server and client in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
npm run dev:server  # Start GraphQL server
npm run dev:client  # Start React client
```

## Documentation

- [TASKS.MD](./TASKS.MD) - Complete task breakdown and implementation plan
- [Server Documentation](./server/README.md) - Backend setup and API documentation
- [Client Documentation](./client/README.md) - Frontend setup and usage

## Features

- ✅ GraphQL Queries and Mutations
- ✅ Full TypeScript integration
- ✅ Real-time data with QuestDB
- ✅ Modern UI with Ant Design
- ✅ Development hot reload
- ✅ Type-safe GraphQL operations

## License

MIT