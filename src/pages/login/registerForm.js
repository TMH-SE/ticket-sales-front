import React from 'react'
import { Form, Input, Button } from 'antd'

function RegisterForm(props) {
  const { form, switchLoginForm } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  }
  return (
    <Form {...formItemLayout} className='registerForm'>
      <h1 className='formTitle'>đăng ký ngay!</h1>
      <Form.Item className='form-item' label='Họ tên' hasFeedback>
        {getFieldDecorator('fullName', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập họ tên của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Số CMND' hasFeedback>
        {getFieldDecorator('idNumber', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số CMND của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Địa chỉ' hasFeedback>
        {getFieldDecorator('address', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Số điện thoại' hasFeedback>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Email' hasFeedback>
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập email của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Tên đăng nhập' hasFeedback>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Mật khẩu' hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!'
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label='Xác nhận mật khẩu' hasFeedback>
        {getFieldDecorator('confirmedPassword', {
          rules: [
            {
              required: true,
              message: 'Vui lòng xác nhận lại mật khẩu!'
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item>
        <Button type='primary' block>
          Đăng nhập
        </Button>
        <span>
          Bạn đã có tài khoản?
          <Button
            className='btnLink'
            type='link'
            onClick={() => switchLoginForm()}
          >
            <u>Đăng nhập ngay</u>
          </Button>
        </span>
      </Form.Item>
    </Form>
  )
}

export default Form.create('Register')(RegisterForm)
