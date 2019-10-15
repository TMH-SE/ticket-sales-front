import React from 'react'
import { List, Card, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { adminMenu } from '../../routers'

function index() {
  return (
    <>
      <h1 style={{ color: '#fff' }}>Menu chức năng</h1>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3
        }}
        dataSource={adminMenu}
        renderItem={item => (
          <List.Item>
            <Link to={item.to}>
              <Card hoverable>
                <Card.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: '#00a2ae' }}
                      shape='square'
                      size='large'
                      icon={item.icon}
                    />
                  }
                  title={item.title}
                />
              </Card>
            </Link>
          </List.Item>
        )}
      ></List>
    </>
  )
}

export default index
