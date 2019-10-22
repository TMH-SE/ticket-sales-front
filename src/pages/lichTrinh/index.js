import React from 'react'
import { Row, Table, Button } from 'antd';
import './index.scss'

const columns = [
  {
    title: 'Điểm đi',
    dataIndex: 'diemdi'
  },
  {
    title: 'Điểm đến',
    dataIndex: 'diemden'
  },
  {
    title: 'Loại xe',
    dataIndex: 'loaixe'
  },
  {
    title: 'Quãng đường (km)',
    dataIndex: 'quanduong'
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian'
  },
  {
    title: 'Số chuyến/Ngày',
    dataIndex: 'sochuyen'
  },
  {
    title: 'Giá vé (đ/vé)',
    dataIndex: 'giave'
  },
  {
    title: 'Giờ chạy',
    dataIndex: 'giochay'
  },
  {
    title: 'Đặt Vé',
    dataIndex: '',
    key: 'x',
    render: () => <Button type="danger">Đặt Vé</Button>
  }
]


const tuyen = [
  {
    title: 'TPHCM',
    data: [
      {
        diemdi: 'TPHCM',
        diemden: 'HN',
        loaixe: 'Giường',
        quanduong: '1030',
        thoigian: '6h30',
        sochuyen: '6',
        giave: '300000',
        giochay: '7h30'
      },
      {
        diemdi: 'TPHCM',
        diemden: 'HN',
        loaixe: 'Giường',
        quanduong: '1030',
        thoigian: '6h30',
        sochuyen: '6',
        giave: '300000',
        giochay: '7h30'
      }
    ]
  },
  {
    title: 'Hà Nội',
    data: [
      {
        diemdi: 'Hà Nội',
        diemden: 'HN',
        loaixe: 'Giường',
        quanduong: '1030',
        thoigian: '6h30',
        sochuyen: '6',
        giave: '300000',
        giochay: '7h30'
      },
      {
        diemdi: 'Hà Nội',
        diemden: 'HN',
        loaixe: 'Giường',
        quanduong: '1030',
        thoigian: '6h30',
        sochuyen: '6',
        giave: '300000',
        giochay: '7h30'
      }
    ]
  }
]

function index() {
  return (
    <div className="lichtrinh">
      {tuyen.map(item => (
        <Row>
          <br />
          <h3 style={{ fontWeight: '700' }}>{item.title}</h3>
          <Table columns={columns} dataSource={item.data} />
          <hr />
        </Row>
      ))}
    </div>
  )
}
export default index
