import { Layout, Typography, Space } from 'antd'
import { DatabaseOutlined, ApiOutlined } from '@ant-design/icons'
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
      
      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '0 auto'
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
          
          <ul style={{ marginTop: '16px' }}>
            <li><strong>Frontend:</strong> React + TypeScript + Ant Design</li>
            <li><strong>Backend:</strong> Node.js + GraphQL Yoga + TypeScript</li>
            <li><strong>Database:</strong> QuestDB (Time-series database)</li>
            <li><strong>GraphQL Client:</strong> Apollo Client</li>
          </ul>
          
          <div style={{ 
            marginTop: '32px', 
            padding: '16px', 
            background: '#f6ffed', 
            border: '1px solid #b7eb8f',
            borderRadius: '6px'
          }}>
            <Text strong>Status: </Text>
            <Text type="success">Client initialized successfully! 🎉</Text>
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
