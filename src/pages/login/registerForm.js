import { Button, Form, Input } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const DANG_KY_TAI_KHOAN = gql`
  mutation dangKyTaiKhoan($input: NguoiDungInput!) {
    dangKyTaiKhoan(input: $input)
  }
`

function RegisterForm(props) {
  const { form, switchLoginForm } = props
  const { getFieldDecorator, validateFields, getFieldValue } = form
  const [dangKyTaiKhoan] = useMutation(DANG_KY_TAI_KHOAN)
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { errors } = await dangKyTaiKhoan({
          variables: {
            input: {
              hoTen: values.hoTen,
              email: values.email,
              soCMND: values.soCMND,
              soDienThoai: values.soDienThoai,
              diaChi: values.diaChi,
              tenDangNhap: values.tenDangNhap,
              matKhau: values.matKhau
            }
          }
        })
        if (!errors) {
          openNotificationWithIcon('success', 'Đăng ký tài khoản thành công')
          switchLoginForm()
        } else {
          openNotificationWithIcon('error', errors.message)
        }
      }
    })
  }

  const checkConfirmPassword = (rule, value, callback) => {
    if (value !== getFieldValue('matKhau')) {
      callback('Mật khẩu không trùng khớp')
    } else {
      callback()
    }
  }
  return (
    <Form
      onSubmit={handleSubmit}
      {...formItemLayout}
      colon={false}
      hideRequiredMark
      className='registerForm'
    >
      <h1 className='formTitle'>đăng ký ngay!</h1>
      <Form.Item className='form-item' label='Họ tên' hasFeedback>
        {getFieldDecorator('hoTen', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập họ tên của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Số CMND' hasFeedback>
        {getFieldDecorator('soCMND', {
          rules: [
            {
              pattern: /^\d{9,12}$/,
              message: 'Số CMND không đúng định dạng'
            },
            {
              required: true,
              message: 'Vui lòng nhập số CMND của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Địa chỉ' hasFeedback>
        {getFieldDecorator('diaChi', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Số điện thoại' hasFeedback>
        {getFieldDecorator('soDienThoai', {
          rules: [
            {
              pattern: /^0[1-9]\d{8,9}$/,
              message: 'Số điện thoại không đúng định dạng'
            },
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
              type: 'email',
              message: 'Email không đúng định dạng'
            },
            {
              required: true,
              message: 'Vui lòng nhập email của bạn!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Tên đăng nhập' hasFeedback>
        {getFieldDecorator('tenDangNhap', {
          rules: [
            {
              pattern: /^[a-z]\w{3,}$/,
              message:
                'Tên đăng nhập bắt đầu bằng chữ, chỉ chứa chữ thường, số, kí tự (_) và có độ dài tối thiểu 4 kí tự'
            },
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item className='form-item' label='Mật khẩu' hasFeedback>
        {getFieldDecorator('matKhau', {
          rules: [
            {
              min: 8,
              message: 'Mật khẩu có độ dài tối thiểu 8 kí tự'
            },
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
            },
            {
              validator: checkConfirmPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type='primary' block>
          Đăng ký
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
