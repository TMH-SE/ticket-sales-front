import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { openNotificationWithIcon } from '../../components/notification'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      token
      isAdmin
    }
  }
`

function LoginForm(props) {
  const { form, switchRegisterForm, history, store } = props
  const { onLogin } = store
  const { getFieldDecorator, validateFields } = form
  const [login] = useMutation(LOGIN)
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  }

  function loginClient(e) {
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
          onLogin(token, isAdmin)
          openNotificationWithIcon('success', 'Đăng nhập thành công', '')
          history.push('/home')
        } catch (error) {
          console.log(error)
          openNotificationWithIcon(
            'error',
            'Đăng nhập thất bại',
            'Tên đăng nhập hoặc mật khẩu không đúng'
          )
        }
      }
    })
  }
  
  return (
    <Form {...formItemLayout} onSubmit={loginClient} className='loginForm'>
      <h1 className='formTitle'>đăng nhập</h1>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!'
            }
          ]
        })(<Input prefix={<Icon type='user' />} placeholder='Tên đăng nhập' />)}
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
          <Button type='link' className='btnLink'>
            <u>Quên mật khẩu?</u>
          </Button>
        </span>
        <Button htmlType='submit' type='primary' block>
          Đăng nhập
        </Button>
        <span>
          Bạn vẫn chưa có tài khoản?
          <Button
            className='btnLink'
            type='link'
            onClick={() => switchRegisterForm()}
          >
            <u>Đăng ký ngay</u>
          </Button>
        </span>
      </Form.Item>
    </Form>
  )
}

export default Form.create('Login')(LoginForm)
