/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import {
  Button,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Steps,
  Table,
} from 'antd'
import React, { useState } from 'react'

const { Step } = Steps
const { Option } = Select

function index(props) {
  const { form, isMobile, history, location } = props
  console.log(location)
  //const { getFieldDecorator, validateFields } = form
  const [current, setCurrent] = useState(0)
  const columns = [
    {
      title: 'Điểm đi',
      dataIndex: 'diemDi',
      key: 'diemDi'
    },
    {
      title: 'Điểm đến',
      dataIndex: 'diemDen',
      key: 'diemDen'
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'thoiGianKhoiHanh',
      key: 'thoiGianKhoiHanh'
    },
    {
      title: 'Loại xe',
      dataIndex: 'loaiXe',
      key: 'loaiXe'
    },
    {
      title: 'Quãng đường (km)',
      dataIndex: 'quangDuong',
      key: 'quangDuong'
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian'
    },
    {
      title: 'Giá vé (đ/vé)',
      dataIndex: 'giaVe',
      key: 'giaVe'
    },
    {
      title: 'Đặt Vé',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Button type='danger' onClick={next}>
          Đặt
        </Button>
      )
    }
  ]

  const tuyen = {
    title: 'TPHCM',
    data: [
      {
        id: 0,
        diemDi: 'TPHCM',
        diemDen: 'HN',
        thoiGianKhoiHanh: '7h30',
        loaiXe: 'Giường',
        quangDuong: '1030',
        thoiGian: '6h30',
        giaVe: '300000'
      },
      {
        id: 1,
        diemDi: 'TPHCM',
        diemDen: 'HN',
        thoiGianKhoiHanh: '8h30',
        loaiXe: 'Giường',
        quangDuong: '1030',
        thoiGian: '6h30',
        giaVe: '300000'
      }
    ]
  }
  const steps = [
    {
      title: 'Tìm Tuyến',
      content: (
        <div>
          <Row>
            <Col lg={7} md={7} sm={24} xs={24}>
              <h2 style={{ color: 'red', marginBottom: '2em' }}>
                Chọn Thông Tin
              </h2>
              <Row
                style={{ marginTop: '1em' }}
                type='flex'
                justify='space-between'
              >
                <Select style={{ width: '49%' }} placeholder='Điểm đi'>
                  <Option value='Phú Yên'>Phú Yên</Option>
                  <Option value='HCM'>HCM</Option>
                  <Option value='Hà Nội'>Hà Nội</Option>
                </Select>
                <Select style={{ width: '49%' }} placeholder='Điểm đến'>
                  <Option value='Phú Yên'>Phú Yên</Option>
                  <Option value='HCM'>HCM</Option>
                  <Option value='Hà Nội'>Hà Nội</Option>
                </Select>
              </Row>
              <Row
                style={{ marginTop: '1em' }}
                type='flex'
                justify='space-between'
              >
                <DatePicker
                  placeholder='Ngày khởi hành'
                  style={{ width: '49%' }}
                  format={'YYYY/MM/DD'}
                />
                <InputNumber placeholder='Số lượng' style={{ width: '49%' }} />
              </Row>
              <Row style={{ marginTop: '1em' }}>
                <Button type='danger' block>
                  Tìm
                </Button>
              </Row>
            </Col>
            <Col lg={1} md={1} sm={1} xs={1} />
            <Col lg={16} md={16} sm={24} xs={24}>
              {
                <Row key={tuyen.title}>
                  <h3
                    style={{
                      fontWeight: '700',
                      color: '#f00',
                      marginTop: '.5em'
                    }}
                  >
                    <Icon type='swap' /> {tuyen.title}
                  </h3>
                  <Table
                    style={{ width: '100%' }}
                    rowKey={r => r.id}
                    scroll={{ x: isMobile }}
                    columns={columns}
                    dataSource={tuyen.data}
                  />
                </Row>
              }
            </Col>
          </Row>
        </div>
      )
    },
    {
      title: 'Nhập Thông Tin',
      content: (
        <div>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h2 style={{ float: 'left', fontWeight: '700' }}>
                NHẬP THÔNG TIN KHÁCH HÀNG
              </h2>
            </Col>
            <Col lg={10} md={10} sm={24} xs={24}>
              <Row style={{ textAlign: 'left' }}>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col lg={5} md={5} sm={5} xs={5}>
                    <label>Họ tên (*): </label>
                  </Col>
                  <Col lg={19} md={19} sm={19} xs={19}>
                    <Input></Input>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col lg={5} md={5} sm={5} xs={5}>
                    <label>Số điện thoại (*): </label>
                  </Col>
                  <Col lg={19} md={19} sm={19} xs={19}>
                    <Input></Input>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col lg={5} md={5} sm={5} xs={5}>
                    <label>CMND: </label>
                  </Col>
                  <Col lg={19} md={19} sm={19} xs={19}>
                    <Input></Input>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col lg={5} md={5} sm={5} xs={5}>
                    <label>Địa chỉ: </label>
                  </Col>
                  <Col lg={19} md={19} sm={19} xs={19}>
                    <Input></Input>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col lg={5} md={5} sm={5} xs={5}>
                    <label>Email: </label>
                  </Col>
                  <Col lg={19} md={19} sm={19} xs={19}>
                    <Input></Input>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      )
    },
    {
      title: 'Thanh Toán',
      content: (
        <div>
          <Row>
            <Col>
              <Radio.Group style={{ width: '100%' }}>
                <Radio
                  value={1}
                  style={{ height: '30px', lineHeight: '30px', margin: '1em' }}
                >
                  <Icon type='dollar' style={{ fontSize: '32px' }} />
                  <h2>THANH TOÁN TRỰC TIẾP </h2>
                </Radio>
                <Radio
                  value={2}
                  style={{ height: '30px', lineHeight: '30px', margin: '1em' }}
                >
                  <Icon type='bank' style={{ fontSize: '32px' }} />
                  <h2>THANH TOÁN CHUYỂN KHOẢN </h2>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      )
    },
    {
      title: 'Đặt Vé Thành Công',
      content: (
        <div>
          <Icon
            type='check-circle'
            style={{ color: 'green', fontSize: '15em', marginTop: '10px' }}
          />
          <h2 style={{ margin: '2em' }}>Bạn đã đặt vé thành công !</h2>
        </div>
      )
    }
  ]

  function next() {
    const next = current + 1
    setCurrent(next)
  }
  function prev() {
    const prev = current - 1
    setCurrent(prev)
  }

  function findRoute(e) {
    e.preventDefault()
  }

  return (
    <div className='datVe'>
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
        <div className='steps-action'>
          {current < steps.length - 1 && current > 0 && (
            <Button type='primary' onClick={() => next()}>
              Tiếp theo
            </Button>
          )}
          {current > 0 && current < steps.length - 1 && (
            <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
              Lùi lại
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default index
