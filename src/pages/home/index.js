import React from 'react'
import { Form, Row, Col, Select, InputNumber, DatePicker, Button } from 'antd'
import SearchRouteForm from './formSearchRoute'


import './index.scss'

function index(props) {
  const { history, store } = props
  return (
    <Row type='flex' align='middle' className='home-container'>
      <Col
        className='home-form'
        xs={{ span: 22, offset: 1 }}
        md={{ span: 8, offset: 2 }}
      >
        <h2 className='form-title'>Chọn tuyến</h2>
        <Row type='flex' justify='space-between'>
          <SearchRouteForm history={history} store={store} />
        </Row>
      </Col>
    </Row>
  )
}

export default index
