/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import { Button, Col, Row, Table } from 'antd'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import ActionComponent from '../../components/actionComponent'
import QuanLyTuyenForm from './quanLyTuyenForm'
import gql from 'graphql-tag'
import { minutesToHours } from '../../utils/convertTime'
import { openNotificationWithIcon } from '../../components/notification'

const GET_ALL_TUYEN = gql`
  query getAllTuyen {
    getAllTuyen {
      id
      diemDi
      diemDen
      quangDuong
      thoiGian
      giaVe
      trangThai
    }
  }
`
const XOA_TUYEN = gql`
  mutation xoaTuyen($id: ID!) {
    xoaTuyen(id: $id)
  }
`

function index() {
  const [visible, setVisible] = useState(false)
  const [updatedData, setUpdatedData] = useState({})
  const { data, refetch } = useQuery(GET_ALL_TUYEN)
  const [xoaTuyen] = useMutation(XOA_TUYEN)
  const confirmDelete = async (id) => {
    const dat = await xoaTuyen({
      variables: {
        id
      }
    })
    if (dat.data.xoaTuyen) {
      openNotificationWithIcon('success', 'Xóa tuyến xe thành công')
      refetch()
    } else {
      openNotificationWithIcon('error', 'Tuyến xe đang có chuyến hoạt động không thể xóa')
    }
  }
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
      title: 'Quãng đường (km)',
      dataIndex: 'quangDuong',
      key: 'quangDuong'
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      render: t => {
        const time = minutesToHours(t)
        return <span>{`${time.hour}h${time.minute}p`}</span>
      }
    },
    {
      title: 'Giá vé (VND)',
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
          confirm={() => confirmDelete(t)}
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
          <h1>Quản Lý Tuyến Xe</h1>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Row type='flex' justify='end' align='middle'>
            <Button
              onClick={() => setVisible(true)}
              className='btnAction'
              type='primary'
              icon='plus'
            >
              Thêm tuyến xe
            </Button>
          </Row>
        </Col>
      </Row>
      <div style={{ backgroundColor: '#fff' }}>
        <Table
          dataSource={data && data.getAllTuyen}
          columns={columns}
          rowKey={r => r.id}
        />
      </div>
      <QuanLyTuyenForm
        updatedData={updatedData}
        visible={visible}
        closeForm={closeForm}
      />
    </div>
  )
}

export default index
