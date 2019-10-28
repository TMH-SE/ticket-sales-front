import { Button, Form, Input, Modal } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const DOI_MAT_KHAU = gql`
  mutation doiMatKhau($oldPassword: String!, $newPassword: String!) {
    thayDoiMatKhau(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`

function DoiMatKhauForm(props) {
  const { visiblePassForm, closePassForm, form } = props
  const { getFieldDecorator, validateFields, getFieldValue } = form

  const [thayDoiMatKhau] = useMutation(DOI_MAT_KHAU)

  const changePassword = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { oldPassword, newPassword } = values
        const { errors } = await thayDoiMatKhau({
          variables: {
            oldPassword,
            newPassword
          }
        })
        if (!errors) {
          openNotificationWithIcon('success', 'Đổi mật khẩu thành công')
          closePassForm()
        } else {
          openNotificationWithIcon('error', errors.message)
        }
      }
    })
  }

  const checkConfirmPassword = (rule, value, callback) => {
    if (value !== getFieldValue('newPassword')) {
      callback('Mật khẩu không trùng khớp')
    } else {
      callback()
    }
  }

  return (
    <Modal
      title='Đổi mật khẩu'
      okText='Đổi mật khẩu'
      cancelText='Hủy'
      visible={visiblePassForm}
      onCancel={closePassForm}
      onOk={changePassword}
    >
      <Form colon={false} hideRequiredMark>
        <Form.Item className='form-item' label='Mật khẩu cũ' hasFeedback>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item className='form-item' label='Mật khẩu mới' hasFeedback>
          {getFieldDecorator('newPassword', {
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
      </Form>
    </Modal>
  )
}

export default Form.create()(DoiMatKhauForm)
