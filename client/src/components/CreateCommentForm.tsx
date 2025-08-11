import { Card, Form, Input, Button, Select, message, Space } from 'antd'
import { MessageOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons'
import { useCreateComment, useUsers, usePosts } from '../hooks/useGraphQL'
import type { CreateCommentInput } from '../types/graphql'

const { TextArea } = Input
const { Option } = Select

export const CreateCommentForm = () => {
  const [form] = Form.useForm()
  const { data: usersData } = useUsers()
  const { data: postsData } = usePosts()
  
  const [createComment, { loading }] = useCreateComment({
    onCompleted: (data) => {
      message.success(data.createComment)
      form.resetFields()
    },
    onError: (error) => {
      message.error(`Failed to create comment: ${error.message}`)
    }
  })

  const handleSubmit = async (values: CreateCommentInput) => {
    try {
      await createComment({
        variables: {
          input: {
            content: values.content.trim(),
            postId: values.postId,
            authorId: values.authorId
          }
        }
      })
    } catch (error) {
      // Error is handled by onError callback
    }
  }

  const users = usersData?.users || []
  const posts = postsData?.posts || []

  return (
    <Card 
      title={
        <Space>
          <MessageOutlined />
          Add New Comment
        </Space>
      }
      style={{ marginBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="authorId"
          label="Comment Author"
          rules={[
            { required: true, message: 'Please select a comment author' }
          ]}
        >
          <Select
            placeholder="Select comment author"
            disabled={loading}
            loading={users.length === 0}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {users.map(user => (
              <Option key={user.id} value={user.id}>
                <Space>
                  <UserOutlined />
                  {user.name} ({user.email})
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="postId"
          label="Post to Comment On"
          rules={[
            { required: true, message: 'Please select a post to comment on' }
          ]}
        >
          <Select
            placeholder="Select a post"
            disabled={loading}
            loading={posts.length === 0}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {posts.map(post => (
              <Option key={post.id} value={post.id}>
                <Space>
                  <FileTextOutlined />
                  <div>
                    <div>{post.title}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      by {post.author?.name || 'Unknown'}
                    </div>
                  </div>
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="content"
          label="Comment Content"
          rules={[
            { required: true, message: 'Please enter the comment content' },
            { min: 3, message: 'Comment must be at least 3 characters' },
            { max: 1000, message: 'Comment must be less than 1000 characters' }
          ]}
        >
          <TextArea 
            rows={4}
            placeholder="Enter your comment"
            disabled={loading}
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<MessageOutlined />}
            disabled={users.length === 0 || posts.length === 0}
          >
            Add Comment
          </Button>
          {(users.length === 0 || posts.length === 0) && (
            <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
              {users.length === 0 && 'Create some users first. '}
              {posts.length === 0 && 'Create some posts first.'}
            </div>
          )}
        </Form.Item>
      </Form>
    </Card>
  )
}