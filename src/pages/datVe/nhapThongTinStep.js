import { Button, Col, Form, Input, Row } from 'antd'

import React from 'react'

function NhapThongTinStep(props) {
  const { me, form, next, prev, setKhachHang } = props
  const { getFieldDecorator, validateFields } = form
  const submit = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        setKhachHang(values)
        next()
      }
    })
  }
  return (
    <div>
      <Row>
        <Col sm={{ span: 22 }} md={{ span: 8, offset: 8 }}>
          <h2 style={{ textTransform: 'uppercase' }}>Thông tin hành khách</h2>
          <Form>
            <Form.Item label='Họ tên' hasFeedback>
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
            <Form.Item label='Số CMND' hasFeedback>
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
            <Form.Item label='Địa chỉ' hasFeedback>
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
            <Form.Item label='Số điện thoại' hasFeedback>
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
            <Form.Item label='Email' hasFeedback>
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
          </Form>
        </Col>
      </Row>
      <Button
        style={{ marginRight: '1em', width: '100px' }}
        onClick={() => prev()}
      >
        Trở lại
      </Button>
      <Button style={{ width: '100px' }} type='primary' onClick={submit}>
        Tiếp theo
      </Button>
    </div>
  )
}

export default Form.create()(NhapThongTinStep)
