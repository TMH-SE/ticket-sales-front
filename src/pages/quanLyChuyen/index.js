import React from 'react'
import { Row, Button, Table, Col } from 'antd'
import './index.scss'
import ActionComponent from '../../components/actionComponent'

function index() {
  const columns = [
    {
      title: 'Biển số xe',
      dataIndex: 'bienSoXe',
      key: 'bienSoXe',
      width: '30%'
    },
    {
      title: 'Loại xe',
      dataIndex: 'loaiXe',
      key: 'loaiXe',
      width: '20%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'soGhe',
      key: 'soGhe',
      width: '20%'
    },
    {
      title: 'Hành động',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      render: (t, r) => <ActionComponent />
    }
  ]

  const data = [
    {
      id: 1,
      bienSoXe: '72A12345',
      loaiXe: 'Giường nằm',
      soGhe: 40
    }
  ]
  return (
    <div>
      <Row type='flex' align='middle'>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h1>Quản Lý Chuyến Xe</h1>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Row type='flex' justify='end' align='middle'>
            <Button className='btnAction' type='primary' icon='plus'>
              Thêm xe
            </Button>
          </Row>
        </Col>
      </Row>
      <div style={{ backgroundColor: '#fff', height: '70vh', position: 'relative' }}>
        <Table dataSource={data} columns={columns}  rowKey={r => r.id} />
      </div>
    </div>
  )
}

export default index
