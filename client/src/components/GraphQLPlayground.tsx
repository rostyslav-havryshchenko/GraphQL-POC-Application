import { Card, Tabs, Row, Col } from 'antd'
import { ApiOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons'
import { UsersList } from './UsersList'
import { PostsList } from './PostsList'
import { CreateUserForm } from './CreateUserForm'
import { CreatePostForm } from './CreatePostForm'
import { CreateCommentForm } from './CreateCommentForm'
import type { User, Post } from '../types/graphql'

export const GraphQLPlayground = () => {
  const handleViewUser = (user: User) => {
    console.log('View user details:', user)
    // Future implementation: open user details modal
  }

  const handleViewPost = (post: Post) => {
    console.log('View post details:', post)
    // Future implementation: open post details modal
  }

  return (
    <Card 
      title={
        <span>
          <ApiOutlined style={{ marginRight: 8 }} />
          GraphQL Operations Playground
        </span>
      }
      style={{ marginBottom: 24 }}
    >
      <Tabs 
        defaultActiveKey="queries" 
        type="card"
        items={[
          {
            key: 'queries',
            label: (
              <span>
                <UserOutlined />
                Query Data
              </span>
            ),
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <UsersList onViewUser={handleViewUser} />
                </Col>
                <Col xs={24} lg={12}>
                  <PostsList onViewPost={handleViewPost} />
                </Col>
              </Row>
            )
          },
          {
            key: 'mutations',
            label: (
              <span>
                <PlusOutlined />
                Create Data
              </span>
            ),
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                  <CreateUserForm />
                </Col>
                <Col xs={24} lg={8}>
                  <CreatePostForm />
                </Col>
                <Col xs={24} lg={8}>
                  <CreateCommentForm />
                </Col>
              </Row>
            )
          }
        ]}
      />
    </Card>
  )
}