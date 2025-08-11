import { Card, Form, Input, Button, Select, message, Space } from 'antd'
import { FileAddOutlined, UserOutlined } from '@ant-design/icons'
import { useCreatePost, useUsers } from '../hooks/useGraphQL'
import type { CreatePostInput } from '../types/graphql'

const { TextArea } = Input
const { Option } = Select

export const CreatePostForm = () => {
  const [form] = Form.useForm()
  const { data: usersData } = useUsers()
  
  const [createPost, { loading }] = useCreatePost({
    onCompleted: (data) => {
      message.success(data.createPost)
      form.resetFields()
    },
    onError: (error) => {
      message.error(`Failed to create post: ${error.message}`)
    }
  })

  const handleSubmit = async (values: CreatePostInput) => {
    try {
      await createPost({
        variables: {
          input: {
            title: values.title.trim(),
            content: values.content.trim(),
            authorId: values.authorId
          }
        }
      })
    } catch (error) {
      // Error is handled by onError callback
    }
  }

  const users = usersData?.users || []

  return (
    <Card 
      title={
        <Space>
          <FileAddOutlined />
          Create New Post
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
          label="Author"
          rules={[
            { required: true, message: 'Please select an author' }
          ]}
        >
          <Select
            placeholder="Select an author"
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
          name="title"
          label="Post Title"
          rules={[
            { required: true, message: 'Please enter the post title' },
            { min: 5, message: 'Title must be at least 5 characters' },
            { max: 200, message: 'Title must be less than 200 characters' }
          ]}
        >
          <Input 
            placeholder="Enter post title"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="Post Content"
          rules={[
            { required: true, message: 'Please enter the post content' },
            { min: 10, message: 'Content must be at least 10 characters' },
            { max: 5000, message: 'Content must be less than 5000 characters' }
          ]}
        >
          <TextArea 
            rows={6}
            placeholder="Enter post content"
            disabled={loading}
            showCount
            maxLength={5000}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<FileAddOutlined />}
            disabled={users.length === 0}
          >
            Create Post
          </Button>
          {users.length === 0 && (
            <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
              Create some users first to be able to create posts
            </div>
          )}
        </Form.Item>
      </Form>
    </Card>
  )
}