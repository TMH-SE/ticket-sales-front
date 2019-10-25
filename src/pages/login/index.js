/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import background from '../../assets/background_login1.jpg'
import './index.scss'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

function index(props) {
  const { history, store } = props
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Row
      style={{
        background: `url(${background}) no-repeat center`,
        backgroundSize: 'cover',
        height: '100vh'
      }}
      type='flex'
      justify='end'
    >
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 10 }}
        style={{
          overflow: 'auto',
          backgroundColor: 'rgba(145, 145, 145, .3)'
        }}
      >
        <Button type='link' icon='arrow-left' onClick={() => history.push('/home')} style={{ fontWeight: 500 }}>
          Trang chủ
        </Button>
        <Row style={{ height: '90vh'}} type='flex' justify='center' align='middle'>
          <Col span={20}>
            {isLogin ? (
              <LoginForm history={history} store={store}  switchRegisterForm={() => setIsLogin(false)} />
            ) : (
              <RegisterForm switchLoginForm={() => setIsLogin(true)} />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default index
