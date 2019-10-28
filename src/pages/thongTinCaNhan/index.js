import { Avatar, Button, Col, Drawer, Form, Input, Row } from 'antd'

import React from 'react'
import avt from '../../assets/avatar.png'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const CAP_NHAT_THONG_TIN = gql`
  mutation capNhatThongTin($input: NguoiDungInput!) {
    capNhatThongTin(input: $input)
  }
`

function ThongTinCaNhanForm(props) {
  const { visibleForm, closeForm, isMobile, refetchData, me, form } = props
  const { getFieldDecorator, validateFields } = form

  const [capNhatThongTin] = useMutation(CAP_NHAT_THONG_TIN)

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
        const { hoTen, email, soCMND, soDienThoai, diaChi } = values

        const { errors } = await capNhatThongTin({
          variables: {
            input: {
              hoTen,
              email,
              soDienThoai,
              soCMND,
              diaChi
            }
          }
        })
        if (errors) {
          openNotificationWithIcon('error', errors.message)
        } else {
          openNotificationWithIcon('success', 'Cập nhật thông tin thành công')
          refetchData()
          closeForm()
        }
      }
    })
  }

  return (
    <Drawer
      width={isMobile ? '100%' : '50%'}
      title={
        <>
          <Avatar src={avt} />
          <span
            style={{ color: '#000', fontWeight: 'bold', marginLeft: '1em' }}
          >
            {me && me.hoTen}
          </span>
        </>
      }
      placement='right'
      visible={visibleForm}
      onClose={() => closeForm()}
    >
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        colon={false}
        hideRequiredMark
        className='registerForm'
      >
        <Form.Item className='form-item' label='Họ tên' hasFeedback>
          {getFieldDecorator('hoTen', {
            initialValue: me && me.hoTen,
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
            initialValue: me && me.soCMND,
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
            initialValue: me && me.diaChi,
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
            initialValue: me && me.soDienThoai,
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
            initialValue: me && me.email,
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
        <Form.Item className='form-item' label='Tên đăng nhập'>
          {getFieldDecorator('tenDangNhap', {
            initialValue: me && me.tenDangNhap
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item>
          <Row type='flex' justify='space-around'>
            <Col span={10}>
              <Button onClick={() => closeForm()} block type='danger'>
                Hủy
              </Button>
            </Col>
            <Col span={10}>
              <Button block htmlType='submit' type='primary'>
                Cập nhật thông tin
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default Form.create()(ThongTinCaNhanForm)
