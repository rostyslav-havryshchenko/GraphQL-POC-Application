import { Card, List, Avatar, Button, Space, Tag, Tooltip, Typography } from 'antd'
import { FileTextOutlined, UserOutlined, MessageOutlined, ReloadOutlined } from '@ant-design/icons'
import { usePostsWithComments } from '../hooks/useGraphQL'
import { formatDate, formatRelativeTime, truncateText, getInitials } from '../utils/formatters'
import type { Post } from '../types/graphql'

const { Text, Paragraph } = Typography

interface PostsListProps {
  onViewPost?: (post: Post) => void
}

export const PostsList = ({ onViewPost }: PostsListProps) => {
  const { data, loading, error, refetch } = usePostsWithComments({
    pollInterval: 30000, // Poll every 30 seconds
  })

  const handleRefresh = () => {
    refetch()
  }

  if (error) {
    return (
      <Card title="Posts" style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 20, color: '#ff4d4f' }}>
          Error loading posts: {error.message}
        </div>
      </Card>
    )
  }

  return (
    <Card 
      title={
        <Space>
          <FileTextOutlined />
          Posts ({data?.posts.length || 0})
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
      <List
        itemLayout="vertical"
        dataSource={data?.posts || []}
        loading={loading}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} posts`,
        }}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            actions={[
              <Button 
                type="link" 
                size="small"
                onClick={() => onViewPost?.(post)}
              >
                View Details
              </Button>
            ]}
            extra={
              <div style={{ textAlign: 'right', minWidth: 120 }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>
                  <Tooltip title={formatDate(post.created_at)}>
                    {formatRelativeTime(post.created_at)}
                  </Tooltip>
                </div>
                <Tag color="blue" icon={<MessageOutlined />}>
                  {post.comments.length} comments
                </Tag>
              </div>
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar size="small" icon={<UserOutlined />}>
                  {post.author ? getInitials(post.author.name) : '?'}
                </Avatar>
              }
              title={
                <div>
                  <Text strong style={{ fontSize: '16px' }}>{post.title}</Text>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
                    by {post.author?.name || 'Unknown Author'}
                  </div>
                </div>
              }
              description={
                <Paragraph 
                  ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                  style={{ marginBottom: 8, color: '#666' }}
                >
                  {post.content}
                </Paragraph>
              }
            />
            
            {/* Comments preview */}
            {post.comments.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Latest comments:
                </Text>
                {post.comments.slice(0, 2).map((comment) => (
                  <div key={comment.id} style={{ 
                    marginTop: 6, 
                    padding: 8, 
                    background: '#fafafa', 
                    borderRadius: 4,
                    fontSize: '12px'
                  }}>
                    <Space>
                      <Text strong>{comment.author?.name || 'Anonymous'}:</Text>
                      <Text>{truncateText(comment.content, 60)}</Text>
                    </Space>
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    +{post.comments.length - 2} more comments
                  </Text>
                )}
              </div>
            )}
          </List.Item>
        )}
      />
    </Card>
  )
}