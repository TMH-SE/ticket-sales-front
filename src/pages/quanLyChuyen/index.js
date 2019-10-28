/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Row, Button, Table, Col } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import './index.scss'
import ActionComponent from '../../components/actionComponent'
import { minutesToHours, convertTimeStamp } from '../../utils/convertTime'
import QuanLyChuyenForm from './quanLyChuyenForm'

const GET_ALL_CHUYEN = gql`
  query getAllChuyen {
    getAllChuyen {
      id
      tuyenXeId
      xeId
      diemDi
      diemDen
      thoiGianKhoiHanh
      soGheTrong
      dsGheTrong
      loaiXe
      quangDuong
      thoiGian
      giaVe
    }
  }
`

function index() {
  const [updatedData, setUpdatedData] = useState({})
  const [visible, setVisible] = useState(false)
  const { data, refetch } = useQuery(GET_ALL_CHUYEN)

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
      key: 'thoiGianKhoiHanh',
      render: t => <span>{convertTimeStamp(t)}</span>
    },
    {
      title: 'Số ghế trống',
      dataIndex: 'soGheTrong',
      key: 'soGheTrong'
    },
    {
      title: 'Loại xe',
      dataIndex: 'loaiXe',
      key: 'loaiXe'
    },
    {
      title: 'Quãng đường',
      dataIndex: 'quangDuong',
      key: 'quangDuong'
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      render: t => {
        const time = minutesToHours(t)
        return <span>{`${time.hour}h${time.minute}'`}</span>
      }
    },
    {
      title: 'Giá vé',
      dataIndex: 'giaVe',
      key: 'giaVe',
      render: t => (
        <span>
          {new Intl.NumberFormat('vn-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(t)}
        </span>
      )
    },
    {
      title: 'Hành động',
      dataIndex: 'id',
      key: 'id',
      render: (t, r) => (
        <ActionComponent
          updateData={() => {
            setVisible(true)
            setUpdatedData(r)
          }}
        />
      )
    }
  ]

  const closeForm = () => {
    setVisible(false)
    setUpdatedData({})
    refetch()
  }

  return (
    <div>
      <Row type='flex' align='middle'>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h1>Quản Lý Chuyến Xe</h1>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Row type='flex' justify='end' align='middle'>
            <Button onClick={() => setVisible(true)} className='btnAction' type='primary' icon='plus'>
              Thêm chuyến xe mới
            </Button>
          </Row>
        </Col>
      </Row>
      <div style={{ backgroundColor: '#fff' }}>
        <Table
          dataSource={data && data.getAllChuyen}
          columns={columns}
          rowKey={r => r.id}
        />
      </div>
      <QuanLyChuyenForm visible={visible} closeForm={closeForm} updatedData={updatedData} />
    </div>
  )
}

export default index
