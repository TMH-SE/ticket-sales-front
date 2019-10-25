import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { PageHeader, Icon, Divider, Dropdown, Menu, Avatar } from 'antd'
import avt from '../../assets/avatar.png'
import { openNotificationWithIcon } from '../../components/notification'

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
        <Avatar src={avt} />
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
            <Avatar src={avt} />
          </Dropdown>
        ]}
        footer={<Divider style={{ margin: '0' }} />}
      />
    </div>
  )
}

export default AdminPageHeader
