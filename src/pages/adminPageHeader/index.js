import { Avatar, Divider, Dropdown, Icon, Menu, PageHeader } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useQuery } from '@apollo/react-hooks'

const GET_ME = gql`
  query {
    me {
      hoTen
    }
  }
`

function AdminPageHeader(props) {
  const { onLogout, history } = props
  const { data } = useQuery(GET_ME)
  const info = (
    <Menu>
      <Menu.Item disabled style={{}}>
        <Avatar src='https://ticket-app-resource.s3.amazonaws.com/avatar.png' />
        <span style={{ color: '#000', fontWeight: 'bold', marginLeft: '1em' }}>
          {data && data.me.hoTen}
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Icon type='user' />
        <span>Thông tin cá nhân</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          onLogout()
          openNotificationWithIcon('success', 'Đăng xuất thành công', '')
          history.push('/admin/login')
        }}
      >
        <Icon type='logout' />
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      <PageHeader
        style={{ backgroundColor: 'transparent' }}
        title={
          <Icon
            type='home'
            onClick={() => history.push('/admin/dashboard')}
            style={{ color: '#ffffff' }}
          />
        }
        onBack={() => history.goBack()}
        backIcon={<Icon type='arrow-left' style={{ color: '#ffffff' }} />}
        extra={[
          <Dropdown
            key='0'
            overlay={info}
            trigger={['click']}
            placement='bottomRight'
          >
            <Avatar src='https://ticket-app-resource.s3.amazonaws.com/avatar.png' />
          </Dropdown>
        ]}
        footer={<Divider style={{ margin: '0' }} />}
      />
    </div>
  )
}

export default AdminPageHeader
