import React from 'react'
import { Row, Col, Select, InputNumber, DatePicker, Button } from 'antd'

import './index.scss'

const { Option } = Select

function index() {
  return (
    <Row type='flex' align='middle' className='home-container'>
      <Col
        className='home-form'
        xs={{ span: 22, offset: 1 }}
        md={{ span: 8, offset: 2 }}
      >
        <h2 className='form-title'>Chọn tuyến</h2>
        <Row type='flex' justify='space-between'>
          <Select style={{ width: '49%' }} placeholder='Điểm đi'>
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
            <Option value='disabled' disabled>
              Disabled
            </Option>
            <Option value='Yiminghe'>yiminghe</Option>
          </Select>
          <Select style={{ width: '49%' }} placeholder='Điểm đến'>
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
            <Option value='disabled' disabled>
              Disabled
            </Option>
            <Option value='Yiminghe'>yiminghe</Option>
          </Select>
        </Row>
        <Row style={{ marginTop: '1em' }} type='flex' justify='space-between'>
          <DatePicker placeholder='Ngày khởi hành' style={{ width: '49%' }} />
          <InputNumber placeholder='Số lượng' style={{ width: '49%' }} />
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <Button type='danger' block>Đặt vé</Button>
        </Row>
      </Col>
    </Row>
  )
}

export default index
