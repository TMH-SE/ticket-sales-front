/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Row, Col, Button, Form, Input, Icon } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { openNotificationWithIcon } from '../../components/notification'
import './index.scss'

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      token
      isAdmin
    }
  }
`

function index(props) {
  const { form, store, history } = props
  const { onLogin } = store
  const { getFieldDecorator, validateFields } = form
  const [login] = useMutation(LOGIN)

  function loginAdmin(e) {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        try {
          const { username, password } = values
          const { data } = await login({
            variables: {
              username,
              password
            }
          })
          const { token, isAdmin } = data.login
          if (isAdmin) {
            onLogin(token, isAdmin)
            openNotificationWithIcon('success', 'Đăng nhập thành công', '')
            history.push('/admin/dashboard')
          } else {
            openNotificationWithIcon(
              'error',
              'Đăng nhập thất bại',
              ''
            )
          }
        } catch (error) {
          openNotificationWithIcon(
            'error',
            'Đăng nhập thất bại',
            'Tên đăng nhập hoặc mật khẩu không đúng'
          )
        }
      }
    })
  }

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  }
  return (
    <Row
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Col
        xs={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 8 }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, .2)',
          borderRadius: '.5em',
          padding: '1em'
        }}
      >
        <Form {...formItemLayout} onSubmit={loginAdmin} className='loginForm'>
          <h1 className='formTitle'>đăng nhập</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!'
                }
              ]
            })(
              <Input
                prefix={<Icon type='user' />}
                placeholder='Tên đăng nhập'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!'
                }
              ]
            })(
              <Input.Password
                prefix={<Icon type='lock' />}
                placeholder='Mật khẩu'
              />
            )}
          </Form.Item>
          <Form.Item>
            <span className='form-forgot'>
              <a href='/'>
                <u>Quên mật khẩu?</u>{' '}
              </a>
            </span>
            <Button htmlType='submit' type='primary' block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Form.create('Login Admin')(index)
