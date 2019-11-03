/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import { Button, Col, Row, Table } from 'antd'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import ActionComponent from '../../components/actionComponent'
import QuanLyXeForm from './quanLyXeForm'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'

const GET_ALL_XE = gql`
  query getXes {
    getAllXe {
      id
      bienSoXe
      loaiXe
      soGhe
      trangThai
    }
  }
`

const XOA_XE = gql`
  mutation xoaXe($id: ID!) {
    xoaXe(id: $id)
  }
`

function index() {
  const [visibleForm, setVisibleForm] = useState(false)
  const [updatedData, setUpdatedData] = useState({})

  const { data, refetch } = useQuery(GET_ALL_XE)
  const [xoaXe] = useMutation(XOA_XE)
  const confirmDelete = async id => {
    const { data: dat } = await xoaXe({
      variables: {
        id
      }
    })
    if (dat) {
      openNotificationWithIcon('success', 'Xóa xe thành công')
      refetch()
    } else {
      openNotificationWithIcon('success', 'Xóa xe thất bại')
    }
  }
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
      render: (t, r) => (
        <ActionComponent
          updateData={() => {
            setVisibleForm(true)
            setUpdatedData(r)
          }}
          confirm={() => confirmDelete(t)}
        />
      )
    }
  ]
  const closeForm = () => {
    setVisibleForm(false)
    setUpdatedData({})
    refetch()
  }
  return (
    <div>
      <Row type='flex' align='middle'>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h1>Quản Lý Xe</h1>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Row type='flex' justify='end' align='middle'>
            <Button
              onClick={() => setVisibleForm(true)}
              className='btnAction'
              type='primary'
              icon='plus'
            >
              Thêm xe
            </Button>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: '#fff'
        }}
      >
        <Table
          dataSource={data && data.getAllXe}
          columns={columns}
          rowKey={r => r.id}
        />
      </div>
      <QuanLyXeForm
        updatedData={updatedData}
        closeForm={closeForm}
        visible={visibleForm}
      />
    </div>
  )
}

export default index
