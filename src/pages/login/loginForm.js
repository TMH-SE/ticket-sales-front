import React from 'react'
import { Form, Input, Icon, Button } from 'antd'

function LoginForm(props) {
  const { form, switchRegisterForm } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  }
  return (
    <Form {...formItemLayout} className='loginForm'>
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
        <Button type='primary' block>
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
