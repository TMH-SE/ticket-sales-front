import './index.scss'

import {
  Avatar,
  Button,
  Col,
  Drawer,
  Dropdown,
  Icon,
  Layout,
  List,
  Menu,
  Row
} from 'antd'
import React, { Suspense, useState } from 'react'

import DoiMatKhau from '../doiMatKhau'
import ThongTinCaNhanForm from '../thongTinCaNhan'
import avt from '../../assets/avatar.png'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { publicMenu } from '../../routers'
import { useQuery } from '@apollo/react-hooks'

const { Header, Content, Sider, Footer } = Layout

const GET_ME = gql`
  query {
    me {
      hoTen
      email
      soCMND
      soDienThoai
      diaChi
      tenDangNhap
    }
  }
`

function ClientLayout(props) {
  const { children, history, store, menuKey } = props
  const { onLogout, isAuth } = store
  const [isMobile, setIsMobile] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleForm, setVisibleForm] = useState(false)
  const [visiblePassForm, setVisiblePassForm] = useState(false)
  const { data, refetch } = useQuery(GET_ME, {
    skip: !isAuth,
    fetchPolicy: 'cache-and-network'
  })

  const fullName = data && data.me && data.me.hoTen

  function logout() {
    onLogout()
    openNotificationWithIcon('success', 'Đăng xuất thành công', '')
    history.push('/login')
  }

  const info = (
    <Menu>
      <Menu.Item disabled key={1}>
        <Avatar src={avt} />
        <span style={{ color: '#000', fontWeight: 'bold', marginLeft: '1em' }}>
          {isAuth && fullName}
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setVisibleForm(true)} key={2}>
        <Icon type='user' />
        <span>Thông tin cá nhân</span>
      </Menu.Item>
      <Menu.Item onClick={() => setVisiblePassForm(true)} key={4}>
        <Icon type='key' />
        <span>Đổi mật khẩu</span>
      </Menu.Item>
      <Menu.Item onClick={logout} key={3}>
        <Icon type='logout' />
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  )
  return menuKey !== 'login' ? (
    <Layout>
      <Sider
        style={{
          position: 'relative',
          left: 0,
          top: '-52px'
        }}
        theme='light'
        collapsedWidth='0'
        width='0'
        breakpoint='md'
        onBreakpoint={broken => setIsMobile(broken)}
        onCollapse={(collapsed, type) => {
          if (type === 'clickTrigger') {
            setVisible(true)
          }
        }}
      />
      <Layout>
        <Header className='header'>
          <Row>
            <Col md={{ span: 6 }} lg={{ span: 4 }}>
              <h1 id='app-name'>
                <span id='app-brand'>DH2</span> Coach
              </h1>
            </Col>
            <Col md={{ span: 18 }} lg={{ span: 20 }}>
              {isMobile ? (
                <Drawer
                  bodyStyle={{ padding: 1 }}
                  title={
                    <h3 id='app-name'>
                      <span id='app-brand'>DH2</span> Coach
                    </h3>
                  }
                  width='70vw'
                  placement='left'
                  onClose={() => setVisible(false)}
                  visible={visible}
                >
                  <Menu
                    style={{ border: 'none' }}
                    defaultSelectedKeys={[menuKey]}
                    theme='light'
                    mode='inline'
                    onSelect={() => setVisible(false)}
                  >
                    {publicMenu.map(item => (
                      <Menu.Item
                        onClick={() => {
                          history.push(item.to)
                        }}
                        key={item.key}
                      >
                        {item.title}
                      </Menu.Item>
                    ))}
                    <Menu.Divider />
                    {isAuth ? (
                      <Menu.SubMenu
                        key='sub4'
                        title={
                          <span>
                            <Avatar src={avt} />
                            <span
                              style={{
                                color: '#000',
                                fontWeight: 'bold',
                                marginLeft: '1em'
                              }}
                            >
                              {isAuth && fullName}
                            </span>
                          </span>
                        }
                      >
                        <Menu.Item onClick={() => setVisibleForm(true)} key={2}>
                          <Icon type='user' />
                          <span>Thông tin cá nhân</span>
                        </Menu.Item>
                        <Menu.Item onClick={() => setVisiblePassForm(true)} key={4}>
                          <Icon type='key' />
                          <span>Đổi mật khẩu</span>
                        </Menu.Item>
                        <Menu.Item onClick={logout} key={3}>
                          <Icon type='logout' />
                          <span>Đăng xuất</span>
                        </Menu.Item>
                      </Menu.SubMenu>
                    ) : (
                      <Menu.Item
                        onClick={() => {
                          history.push('/login')
                        }}
                      >
                        Đăng nhập
                      </Menu.Item>
                    )}
                  </Menu>
                </Drawer>
              ) : (
                <Row type='flex' justify='end' align='middle'>
                  <Menu
                    defaultSelectedKeys={[menuKey]}
                    mode='horizontal'
                    className='menu'
                  >
                    {publicMenu.map(item => (
                      <Menu.Item
                        onClick={() => {
                          history.push(item.to)
                        }}
                        key={item.key}
                        className='menu-item'
                      >
                        {item.title}
                      </Menu.Item>
                    ))}
                  </Menu>
                  <div style={{ marginLeft: '2em' }}>
                    {isAuth ? (
                      <Dropdown
                        key='0'
                        overlay={info}
                        trigger={['click']}
                        placement='bottomRight'
                      >
                        <Avatar src={avt} />
                      </Dropdown>
                    ) : (
                      <Button
                        type='primary'
                        onClick={() => history.push('/login')}
                      >
                        Đăng nhập
                      </Button>
                    )}
                  </div>
                </Row>
              )}
            </Col>
          </Row>
        </Header>
        <Content className='main-content'>
          <Suspense fallback={null}>
            {React.cloneElement(children, { isMobile, me: data && data.me })}
          </Suspense>
        </Content>
        <Footer>
          <div className='footer' id='footer'>
            <div className='container'>
              <Row>
                <Col lg={6} md={20} className='col-footer'>
                  <h4 className='footer-title'>DH2 Coach</h4>
                </Col>
                <Col lg={7} md={20} className='col-footer'>
                  <h3>Liên hệ</h3>
                  <List>
                    <List>
                      <List.Item>
                        <a href='mail:dh2coach@gmail.com'>
                          Email: dh2coach@gmail.com
                        </a>
                      </List.Item>
                      <List.Item>
                        <a href='tel:0939203204'>Phone: 0939 203 204</a>
                      </List.Item>
                      <List.Item>
                        <p className='address-footer'>
                          Address: Số 5 Nguyễn Tri Phương, Phường 3, Quận 5,
                          TP.HCM
                        </p>
                      </List.Item>
                    </List>
                  </List>
                </Col>
                <Col lg={7} md={20} className='col-footer'>
                  <h3>Danh mục</h3>
                  <List mode='horizontal' className='menu-footer'>
                    {publicMenu.map(item => (
                      <List.Item
                        onClick={() => {
                          history.push(item.to)
                        }}
                        key={item.key}
                        className='menu-item'
                      >
                        <span className='footer-link'>{item.title}</span>
                      </List.Item>
                    ))}
                  </List>
                </Col>
              </Row>
            </div>
          </div>
        </Footer>
      </Layout>
      <ThongTinCaNhanForm
        me={data && data.me}
        isMobile={isMobile}
        visibleForm={visibleForm}
        refetchData={() => refetch()}
        closeForm={() => setVisibleForm(false)}
      />
      <DoiMatKhau visiblePassForm={visiblePassForm} closePassForm={() => setVisiblePassForm(false)} />
    </Layout>
  ) : (
    <Suspense fallback={null}>{children}</Suspense>
  )
}

export default ClientLayout
