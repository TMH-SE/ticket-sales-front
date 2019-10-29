/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import { Button, Icon, Row, Table } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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

function index(props) {
  const { isMobile, history } = props
  const { data, loading } = useQuery(GET_ALL_TUYEN)
  console.log(data)
  let obj = {}
  if (loading) {
    return null
  }
  data.getAllTuyen &&
    data.getAllTuyen.map(tuyen => {
      if (obj.hasOwnProperty(tuyen.diemDi)) {
          obj[tuyen.diemDi] = [...obj[tuyen.diemDi], tuyen]
      } else {
        obj[tuyen.diemDi] = [tuyen]
      }
    })

  const columns = [
    {
      title: 'Điểm đi',
      dataIndex: 'diemDi',
      key: 'diemDi',
      width: '20%'
    },
    {
      title: 'Điểm đến',
      dataIndex: 'diemDen',
      key: 'diemDen',
      width: '20%'
    },
    {
      title: 'Quãng đường (km)',
      dataIndex: 'quangDuong',
      key: 'quangDuong',
      width: '15%'
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      width: '15%'
    },
    {
      title: 'Giá vé (đ/vé)',
      dataIndex: 'giaVe',
      key: 'giaVe',
      width: '15%'
    },
    {
      title: 'Đặt Vé',
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (t, r) => {
        const { diemDi, diemDen } = r
        const location = {
          pathname: "/datVe",
          searchData: {
            diemDi: diemDi,
            diemDen: diemDen,
            thoiGianKhoiHanh: new Date().getTime(),
            soLuong: 1
          }
        }
        return (
          <Button type='danger' onClick={() => history.push(location)}>Đặt vé</Button>
        )
      }
    }
  ]

  return (
    <div className='lichtrinh'>
      {Object.keys(obj).map((item, index) => (
        <Row key={index}>
          <h3 style={{ fontWeight: '700', color: '#f00', marginTop: '.5em' }}>
            <Icon type='swap' /> {item}
          </h3>
          <Table
            rowKey={r => r.id}
            scroll={{ x: isMobile }}
            columns={columns}
            dataSource={obj[item]}
          />
          <hr />
        </Row>
      ))}
    </div>
  )
}
export default index
