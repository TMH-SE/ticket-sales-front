import React from 'react'
import {
  Layout,
  Menu,
  Icon,
  Button,
  Row,
  Dropdown,
  Avatar,
  Col,
  List,
  Typography
} from 'antd'
import './index.scss'
import './footer.scss'
import { publicMenu } from '../../routers'
import avt from '../../assets/avatar.png'

const { Header, Content, Footer } = Layout



function ClientLayout(props) {
  const { children, history, store, menuKey } = props
  const { onLogout, isAuth } = store
  const info = (
    <Menu>
      <Menu.Item disabled key={1}>
        <Avatar src={avt} />
        <span style={{ color: '#000', fontWeight: 'bold', marginLeft: '1em' }}>
          User
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={2}>
        <Icon type='user' />
        <span>Thông tin cá nhân</span>
      </Menu.Item>
      <Menu.Item onClick={onLogout} key={3}>
        <Icon type='logout' />
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  )
  return menuKey !== 'login' ? (
    <Layout>
      <Header className='header'>
        <Row>
          <Col md={{ span: 6 }} lg={{ span: 4 }}>
            <h1 id='app-name'>
              <span id='app-brand'>DH2</span> Coach
            </h1>
          </Col>
          <Col md={{ span: 18 }} lg={{ span: 20 }}>
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
              <div style={{ marginLeft: '5em' }}>
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
                    <Button type='primary' onClick={() => history.push('/login')}>Đăng nhập</Button>
                  )}
              </div>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content className='main-content'>{children}</Content>
      <Footer>
        <div className="footer" id="footer">
          <div className="container">
            <Row>
              <Col lg={7} md={7} className="col-footer">
                <h4 className="footer-title">DH2 Coach</h4>
              </Col>
              <Col lg={7} md={7} className="col-footer">
                <h3>Liên hệ</h3>
                <List>
                  <List>
                    <List.Item>
                      <a href="mail:dh2coach@gmail.com">Email: dh2coach@gmail.com</a>
                    </List.Item>
                    <List.Item>
                      <a href='tel:0939203204'>Phone: 0939 203 204</a>
                    </List.Item>
                    <List.Item>
                      <p className="address-footer">Address: Số 5 Nguyễn Tri Phương, Phường 3, Quận 5, TP.HCM</p>
                    </List.Item>
                  </List>
                </List>
              </Col>

              <Col lg={7} md={7} className="col-footer">
                <h3>Danh mục</h3>
                <List
                  mode='horizontal'
                  className='menu-footer'
                >
                  {publicMenu.map(item => (
                    <List.Item
                      onClick={() => {
                        history.push(item.to)
                      }}
                      key={item.key}
                      className='menu-item'
                    >
                      <a>{item.title}</a>
                    </List.Item>
                  ))}
                </List>
              </Col>
            </Row>
          </div>
        </div>
      </Footer>
    </Layout>
  ) : (
      <>{children}</>
    )
}

export default ClientLayout
