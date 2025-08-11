import { Card, Table, Avatar, Button, Space, Tooltip } from 'antd'
import { UserOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons'
import { useUsers } from '../hooks/useGraphQL'
import { formatDate, formatRelativeTime, getInitials } from '../utils/formatters'
import type { User } from '../types/graphql'

interface UsersListProps {
  onViewUser?: (user: User) => void
}

export const UsersList = ({ onViewUser }: UsersListProps) => {
  const { data, loading, error, refetch } = useUsers({
    pollInterval: 30000, // Poll every 30 seconds
  })

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: User) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />}>
            {getInitials(name)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (
        <Tooltip title={formatDate(date)}>
          {formatRelativeTime(date)}
        </Tooltip>
      ),
      sorter: (a: User, b: User) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => onViewUser?.(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ]

  const handleRefresh = () => {
    refetch()
  }

  if (error) {
    return (
      <Card title="Users" style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 20, color: '#ff4d4f' }}>
          Error loading users: {error.message}
        </div>
      </Card>
    )
  }

  return (
    <Card 
      title={
        <Space>
          <UserOutlined />
          Users ({data?.users.length || 0})
        </Space>
      }
      extra={
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleRefresh}
          loading={loading}
          size="small"
        >
          Refresh
        </Button>
      }
      style={{ marginBottom: 24 }}
    >
      <Table
        columns={columns}
        dataSource={data?.users || []}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        size="small"
      />
    </Card>
  )
}