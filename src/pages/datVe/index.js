/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import { Button, Icon, Row, Steps } from 'antd'
import React, { useState } from 'react'

import ChonGhe from './chonGhe'
import NhapThongTinStep from './nhapThongTinStep'
import ThanhToanStep from './thanhToanStep'
import TimChuyenStep from './timChuyenStep'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const { Step } = Steps

const THEM_VE = gql`
  mutation themVe($input: VeInput) {
    themVe(input: $input)
  }
`

function index(props) {
  const { isMobile, location, me, history } = props

  const [current, setCurrent] = useState(0)
  const [searchData, setSearchData] = useState(location.searchData)
  const [chuyenDat, setChuyenDat] = useState({})
  const [viTriGhe, setViTriGhe] = useState([])
  const [khachHang, setKhachHang] = useState({})

  const [themVe] = useMutation(THEM_VE)

  const datVe = async () => {
    const input = {
      chuyenXeId: chuyenDat.id,
      khachHangInfo: khachHang,
      viTriGhe
    }
    const dat = await themVe({
      variables: {
        input
      }
    })

    if (dat) {
      next()
    } else {
      openNotificationWithIcon('error', 'Đặt vé thất bại')
    }
  }

  const steps = [
    {
      title: 'Tìm Tuyến',
      content: (
        <TimChuyenStep
          isMobile={isMobile}
          setChuyenDat={setChuyenDat}
          next={next}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      )
    },
    {
      title: 'Chọn Ghế',
      content: (
        <ChonGhe
          soGhe={chuyenDat.soGhe}
          dsGheTrong={chuyenDat.dsGheTrong}
          next={next}
          prev={prev}
          chuyen={chuyenDat}
          viTriGhe={viTriGhe}
          setViTriGhe={setViTriGhe}
        />
      )
    },
    {
      title: 'Nhập Thông Tin',
      content: (
        <NhapThongTinStep
          khachHang={khachHang}
          setKhachHang={setKhachHang}
          next={next}
          prev={prev}
          me={me}
        />
      )
    },
    {
      title: 'Thanh Toán',
      content: <ThanhToanStep datVe={datVe} prev={prev} />
    },
    {
      title: 'Đặt Vé Thành Công',
      content: (
        <div>
          <Row type='flex' align='middle' justify='center'>
            <Icon
              type='check-circle'
              style={{ color: 'green', fontSize: '15em', marginTop: '10px' }}
            />
            <h2 style={{ margin: '2em', textTransform: 'uppercase' }}>
              Bạn đã đặt vé thành công!
            </h2>
          </Row>
          <Button
            type='primary'
            onClick={() => {
              history.push('/datVe')
            }}
          >
            Hoàn tất
          </Button>
        </div>
      )
    }
  ]

  function next() {
    const next = current + 1
    setCurrent(next)
  }
  function prev() {
    if (current === 1) {
      setViTriGhe([])
    }
    const prev = current - 1
    setCurrent(prev)
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
      </div>
    </div>
  )
}

export default index
