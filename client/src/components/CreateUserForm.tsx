import { Card, Form, Input, Button, message, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useCreateUser } from '../hooks/useGraphQL'
import type { CreateUserInput } from '../types/graphql'

export const CreateUserForm = () => {
  const [form] = Form.useForm()
  const [createUser, { loading }] = useCreateUser({
    onCompleted: (data) => {
      message.success(data.createUser)
      form.resetFields()
    },
    onError: (error) => {
      message.error(`Failed to create user: ${error.message}`)
    }
  })

  const handleSubmit = async (values: CreateUserInput) => {
    try {
      await createUser({
        variables: {
          input: {
            name: values.name.trim(),
            email: values.email.trim().toLowerCase()
          }
        }
      })
    } catch (error) {
      // Error is handled by onError callback
    }
  }

  return (
    <Card 
      title={
        <Space>
          <UserAddOutlined />
          Create New User
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
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: 'Please enter the user name' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 50, message: 'Name must be less than 50 characters' }
          ]}
        >
          <Input 
            placeholder="Enter full name"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter the email address' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input 
            placeholder="Enter email address"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<UserAddOutlined />}
          >
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}