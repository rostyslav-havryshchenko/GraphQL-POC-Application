import { Layout, Typography, Space } from 'antd'
import { DatabaseOutlined, ApiOutlined } from '@ant-design/icons'
import { ConnectionStatus } from './components/ConnectionStatus'
import { DatabaseStats } from './components/DatabaseStats'
import { GraphQLPlayground } from './components/GraphQLPlayground'
import './App.css'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: '#001529' 
      }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          <Space>
            <ApiOutlined />
            GraphQL POC
          </Space>
        </Title>
      </Header>
      
      <Content style={{ padding: '24px 50px', background: '#f0f2f5' }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <Title level={1}>
              <Space>
                <DatabaseOutlined />
                GraphQL + QuestDB POC
              </Space>
            </Title>
            
            <Text>
              Welcome to the GraphQL proof-of-concept application built with:
            </Text>
            
            <ul style={{ marginTop: '16px', marginBottom: '24px' }}>
              <li><strong>Frontend:</strong> React + TypeScript + Ant Design</li>
              <li><strong>Backend:</strong> Node.js + GraphQL Yoga + TypeScript</li>
              <li><strong>Database:</strong> QuestDB (Time-series database)</li>
              <li><strong>GraphQL Client:</strong> Apollo Client</li>
            </ul>
          </div>

          {/* Connection Status */}
          <ConnectionStatus />

          {/* Database Statistics */}
          <DatabaseStats />

          {/* GraphQL Operations Playground */}
          <GraphQLPlayground />

          <div style={{ 
            background: 'white', 
            padding: '24px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <Text type="secondary">
              This application demonstrates GraphQL queries and mutations with real-time data from QuestDB.
              Try creating users, posts, and comments to see the GraphQL operations in action!
            </Text>
          </div>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        GraphQL POC ©{new Date().getFullYear()} - Built with React, TypeScript & Ant Design
      </Footer>
    </Layout>
  )
}

export default App
