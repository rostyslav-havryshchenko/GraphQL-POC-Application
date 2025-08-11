import { Alert, Space, Spin } from 'antd'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useHello } from '../hooks/useGraphQL'

export const ConnectionStatus = () => {
  const { data, loading, error } = useHello({
    pollInterval: 10000, // Poll every 10 seconds
    errorPolicy: 'all'
  })

  if (loading) {
    return (
      <Alert
        message={
          <Space>
            <Spin size="small" />
            Connecting to GraphQL server...
          </Space>
        }
        type="info"
        showIcon={false}
        style={{ marginBottom: 16 }}
      />
    )
  }

  if (error) {
    return (
      <Alert
        message="GraphQL Server Connection Failed"
        description={
          <div>
            <p>Unable to connect to the GraphQL server at <code>http://localhost:4000/graphql</code></p>
            <p><strong>Error:</strong> {error.message}</p>
            <p>Please ensure:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>QuestDB is running (see server/README.md)</li>
              <li>GraphQL server is running: <code>cd ../server && npm run dev</code></li>
              <li>Server is accessible on port 4000</li>
            </ul>
          </div>
        }
        type="error"
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: 16 }}
      />
    )
  }

  if (data) {
    return (
      <Alert
        message="GraphQL Server Connected"
        description={
          <Space direction="vertical" size="small">
            <div>
              <strong>Server Response:</strong> {data.hello}
            </div>
            <div>
              <strong>API Version:</strong> {data.version}
            </div>
            <div>
              <strong>Endpoint:</strong> <code>http://localhost:4000/graphql</code>
            </div>
          </Space>
        }
        type="success"
        icon={<CheckCircleOutlined />}
        style={{ marginBottom: 16 }}
      />
    )
  }

  return null
}