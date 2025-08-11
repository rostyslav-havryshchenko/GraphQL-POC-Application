# GraphQL POC Client

A React frontend application with TypeScript and Ant Design, demonstrating GraphQL integration with Apollo Client.

## Features

- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Ant Design** - Modern UI component library
- **Apollo Client** - GraphQL client with caching
- **Vite** - Fast development server and build tool

## Prerequisites

- Node.js >= 18.0.0
- GraphQL server running on http://localhost:4000/graphql

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The client will run on http://localhost:5173

## Production

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## GraphQL Integration

The client uses Apollo Client to connect to the GraphQL server at `http://localhost:4000/graphql`.

### Available Operations

#### Queries
- `GET_STATS` - Get database statistics
- `GET_USERS` - Get all users
- `GET_USER` - Get user by ID
- `GET_POSTS` - Get all posts
- `GET_POSTS_BY_AUTHOR` - Get posts by author
- `GET_COMMENTS_BY_POST` - Get comments for a post

#### Mutations
- `CREATE_USER` - Create a new user
- `CREATE_POST` - Create a new post
- `CREATE_COMMENT` - Create a new comment
- `SEED_DATABASE` - Seed database with sample data

## Project Structure

```
client/
├── src/
│   ├── components/          # React components
│   ├── graphql/            # GraphQL queries and mutations
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md              # This file
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## UI Components

The application uses Ant Design components:
- Layout (Header, Content, Footer)
- Typography (Title, Text, Paragraph)
- Forms (Input, Button, Select)
- Data Display (Table, Card, List)
- Feedback (Message, Notification, Spin)

## Styling

- Global styles in `src/index.css`
- Component-specific styles in `src/App.css`
- Ant Design theme customization via CSS variables
- Responsive design with mobile-first approach

## Development Tips

1. Use the browser's GraphQL DevTools for debugging
2. Apollo Client DevTools available for Chrome/Firefox
3. Hot reload is enabled for fast development
4. TypeScript strict mode is enabled for better type safety

## API Connection

Make sure the GraphQL server is running before starting the client:

1. Start QuestDB (see server/README.md)
2. Start the GraphQL server: `cd ../server && npm run dev`
3. Start the client: `npm run dev`

The client will automatically connect to the GraphQL endpoint and display connection status.
