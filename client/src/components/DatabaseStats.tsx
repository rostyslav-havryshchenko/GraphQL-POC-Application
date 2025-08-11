import { Card, Statistic, Row, Col, Button, Space, message } from 'antd'
import { UserOutlined, FileTextOutlined, MessageOutlined, DatabaseOutlined } from '@ant-design/icons'
import { useStats, useSeedDatabase } from '../hooks/useGraphQL'

export const DatabaseStats = () => {
  const { data, loading, error, refetch } = useStats({
    pollInterval: 30000, // Poll every 30 seconds
  })

  const [seedDatabase, { loading: seedingLoading }] = useSeedDatabase({
    onCompleted: () => {
      message.success('Database seeded successfully!')
      refetch()
    },
    onError: (error) => {
      message.error(`Failed to seed database: ${error.message}`)
    }
  })

  const handleSeedDatabase = () => {
    seedDatabase()
  }

  const handleRefresh = () => {
    refetch()
    message.info('Statistics refreshed')
  }

  if (error) {
    return (
      <Card title="Database Statistics" style={{ marginBottom: 24 }}>
        <p>Unable to load database statistics: {error.message}</p>
      </Card>
    )
  }

  const stats = data?.stats || { users: 0, posts: 0, comments: 0 }
  const isEmpty = stats.users === 0 && stats.posts === 0 && stats.comments === 0

  return (
    <Card 
      title={
        <Space>
          <DatabaseOutlined />
          Database Statistics
        </Space>
      }
      loading={loading}
      extra={
        <Space>
          {isEmpty && (
            <Button 
              type="primary" 
              onClick={handleSeedDatabase}
              loading={seedingLoading}
            >
              Seed Database
            </Button>
          )}
          <Button onClick={handleRefresh}>
            Refresh
          </Button>
        </Space>
      }
      style={{ marginBottom: 24 }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Users"
            value={stats.users}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Posts"
            value={stats.posts}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Comments"
            value={stats.comments}
            prefix={<MessageOutlined />}
            valueStyle={{ color: '#722ed1' }}
          />
        </Col>
      </Row>

      {isEmpty && (
        <div style={{ 
          marginTop: 16, 
          padding: 16, 
          background: '#fafafa', 
          borderRadius: 6,
          textAlign: 'center' 
        }}>
          <p style={{ margin: 0, color: '#666' }}>
            No data found. Click "Seed Database" to populate with sample data.
          </p>
        </div>
      )}
    </Card>
  )
}