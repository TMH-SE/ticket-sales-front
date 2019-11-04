import { Button, Modal, Table } from 'antd'

import React from 'react'
import { convertTimeStamp } from '../../utils/convertTime'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_VE_XE = gql`
  query getVeXeByKhachHang {
    getVeXeByKhachHang {
      id
      diemDi
      diemDen
      thoiGianKhoiHanh
      viTriGhe
      giaVe
    }
  }
`
function ModalXemVe(props) {
  const { visibleModal, closeModal, isMobile } = props
  const { data } = useQuery(GET_VE_XE, {
    fetchPolicy: 'cache-and-network'
  })
  const columns = [
    {
      title: 'Mã vé',
      dataIndex: 'id',
      key: 'id'
    },
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
      title: 'Vị trí ghế',
      dataIndex: 'viTriGhe',
      key: 'viTriGhe'
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
    }
  ]
  return (
    <Modal
      width='90%'
      closable={false}
      visible={visibleModal}
      onCancel={closeModal}
      footer={<Button onClick={closeModal}>Đóng</Button>}
    >
      <Table
        dataSource={data && data.getVeXeByKhachHang}
        columns={columns}
        scroll={{ x: isMobile }}
        rowKey={r => r.id}
      />
    </Modal>
  )
}

export default ModalXemVe
