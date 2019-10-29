import './index.scss'

import { Col, Row } from 'antd'

import React from 'react'
import SearchRouteForm from './formSearchRoute'

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
