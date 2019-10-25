import React, { useState } from 'react'
import { Drawer, Button, Form, Input, Avatar, Row, Col } from 'antd'
import avt from '../../assets/avatar.png'

function ThongTinCaNhanForm(props) {
  const { visibleForm, closeForm, isMobile, me, form } = props
  const { getFieldDecorator } = form
  const [changed, setChanged] = useState(true)
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
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
        // onSubmit={handleSubmit}
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
          })(<Input disabled={changed} />)}
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
          })(<Input disabled={changed} />)}
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
          })(<Input disabled={changed} />)}
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
          })(<Input disabled={changed} />)}
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
          })(<Input disabled={changed} />)}
        </Form.Item>
        <Form.Item className='form-item' label='Tên đăng nhập' hasFeedback>
          {getFieldDecorator('tenDangNhap', {
            initialValue: me && me.tenDangNhap,
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
          })(<Input disabled={changed} />)}
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
          })(<Input.Password disabled={changed} />)}
        </Form.Item>
        <Form.Item>
          <Row type='flex' justify='space-around'>
            <Col span={10}>
              <Button block type='danger'>
                Hủy
              </Button>
            </Col>
            <Col span={10}>
              <Button onClick={() => setChanged(!changed)} block htmlType='submit' type='primary'>
                {changed ? 'Sửa thông tin' : 'Lưu thay đổi'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default Form.create()(ThongTinCaNhanForm)
