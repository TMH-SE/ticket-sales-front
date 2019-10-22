import React from 'react'
import { Row, Table, Button, Icon } from 'antd'
import './index.scss'

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
    render: () => <Button type='danger'>Đặt Vé</Button>
  }
]

const tuyen = [
  {
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
  },
  {
    title: 'Hà Nội',
    data: [
      {
        id: 2,
        diemDi: 'Hà Nội',
        diemDen: 'TPHCM',
        thoiGianKhoiHanh: '7h30',
        loaiXe: 'Giường',
        quangDuong: '1030',
        thoiGian: '6h30',
        giaVe: '300000'
      },
      {
        id: 3,
        diemDi: 'Hà Nội',
        diemDen: 'TPHCM',
        thoiGianKhoiHanh: '8h30',
        loaiXe: 'Giường',
        quangDuong: '1030',
        thoiGian: '6h30',
        giaVe: '300000'
      }
    ]
  }
]

function index(props) {
  const { isMobile } = props
  return (
    <div className='lichtrinh'>
      {tuyen.map((item, index) => (
        <Row key={index}>
          <h3 style={{ fontWeight: '700', color: '#f00', marginTop: '.5em' }}>
            <Icon type='swap' /> {item.title}
          </h3>
          <Table
            rowKey={r => r.id}
            scroll={{ x: isMobile }}
            columns={columns}
            dataSource={item.data}
          />
          <hr />
        </Row>
      ))}
    </div>
  )
}
export default index
