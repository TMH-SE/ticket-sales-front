/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Row, Col } from 'antd'
import background from '../../assets/background_login1.jpg'
import './index.scss'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

function index(props) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Row
      style={{
        background: `url(${background}) no-repeat center`,
        backgroundSize: 'cover',
        height: '100vh'
      }}
    >
      <Col
        xs={{ span: 0 }}
        md={{ span: 12 }}
        lg={{ span: 14 }}
        style={{
          height: '100vh'
        }}
      />
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 10 }}>
        <Row
          type='flex'
          style={{ height: '100vh', overflow: 'auto', backgroundColor: 'rgba(145, 145, 145, .3)' }}
          justify='center'
          align='middle'
        >
          <Col span={20}>
            {isLogin ? (
              <LoginForm switchRegisterForm={() => setIsLogin(false)} />
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
