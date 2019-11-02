import { Button, Col, Icon, Radio, Row } from 'antd'

import React from 'react'

function ThanhToanStep(props) {
  const { datVe, prev } = props
  return (
    <div>
      <Row>
        <Col>
          <Radio.Group defaultValue={1} style={{ width: '100%' }}>
            <Radio
              value={1}
              style={{ margin: '1em' }}
            >
              <Icon
                type='dollar'
                style={{ fontSize: '20px', marginRight: '6px' }}
              />
              <span>THANH TOÁN TRỰC TIẾP </span>
            </Radio>
            <Radio value={2} style={{ margin: '1em' }}>
              <Icon
                type='bank'
                style={{ fontSize: '20px', marginRight: '6px' }}
              />
              <span>THANH TOÁN CHUYỂN KHOẢN </span>
            </Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Button
        style={{ marginRight: '1em', width: '100px' }}
        onClick={() => prev()}
      >
        Trở lại
      </Button>
      <Button onClick={datVe} style={{ width: '100px', marginTop: '1em' }} type='primary'>
        Thanh toán
      </Button>
    </div>
  )
}

export default ThanhToanStep
