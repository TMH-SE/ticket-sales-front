/* eslint-disable react-hooks/rules-of-hooks */

import './index.scss'

import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { convertTimeStamp, minutesToHours } from '../../utils/convertTime'

import { openNotificationWithIcon } from '../../components/notification'

function ChonGhe(props) {
  const { chuyen, viTriGhe, setViTriGhe, next, prev, soGhe, dsGheTrong } = props

  const styleGheTrong = {
    textAlign: 'center',
    width: '48px',
    height: '48px',
    margin: '0.2em',
    backgroundColor: 'none',
    border: '2px solid black'
  }

  const styleGheDaDat = {
    textAlign: 'center',
    width: '48px',
    height: '48px',
    margin: '0.2em',
    backgroundColor: 'red',
    border: '2px solid black'
  }

  function DatGhe(item) {
    let ghe = document.getElementById(item)
    ghe.style.backgroundColor = ghe.style.backgroundColor === '' ? 'green' : ''
    if (ghe.style.backgroundColor === 'green') {
      setViTriGhe([...viTriGhe, item])
    } else {
      const index = viTriGhe.indexOf(item)
      setViTriGhe([...viTriGhe.slice(0, index), ...viTriGhe.slice(index + 1)])
    }
  }
  console.log(viTriGhe)
  return (
    <div>
      <Row>
        <Col md={10} sm={24} xs={24}>
          <Row>
            <Col span={24}>
              <h2
                style={{
                  float: 'left',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}
              >
                THÔNG TIN ChUYẾN XE
              </h2>
            </Col>
            <Col>
              <Row style={{ textAlign: 'left' }}>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Điểm đi: </label>
                  </Col>
                  <Col span={12}>
                    <h3>{chuyen.diemDi}</h3>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Điểm đến: </label>
                  </Col>
                  <Col span={12}>
                    <h3>{chuyen.diemDen}</h3>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Thời gian khởi hành: </label>
                  </Col>
                  <Col span={12}>
                    <h3>{convertTimeStamp(chuyen.thoiGianKhoiHanh)}</h3>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Quãng đường (km): </label>
                  </Col>
                  <Col span={12}>
                    <h3>{`${chuyen.quangDuong}km`}</h3>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Thời gian: </label>
                  </Col>
                  <Col span={12}>
                    <h3>
                      {`${minutesToHours(chuyen.thoiGian).hour}h${
                        minutesToHours(chuyen.thoiGian).minute
                      }p`}
                    </h3>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '0.5em' }}>
                  <Col span={12}>
                    <label>Giá vé: </label>
                  </Col>
                  <Col span={12}>
                    <h3>
                      {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(chuyen.giaVe)}
                    </h3>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={14} sm={22} xs={22}>
          <Row>
            <Col span={24}>
              <h3 style={{ textAlign: 'center' }}>
                Số lượng ghế đang chọn: {viTriGhe.length}
              </h3>
            </Col>
          </Row>
          <Row>
            {Array.from(Array(soGhe).keys()).map(item => {
              if (dsGheTrong.indexOf(item) === -1) {
                return (
                  <Col span={6} key={item}>
                    <div id={item} style={styleGheDaDat}>
                      {item}
                    </div>
                  </Col>
                )
              } else if(viTriGhe.indexOf(item) !== -1) {
                return (
                  <Col span={6} key={item}>
                    <div
                      id={item}
                      style={{...styleGheTrong, backgroundColor: 'green'}}
                      onClick={() => DatGhe(item)}
                    >
                      {item}
                    </div>
                  </Col>
                )
              } else {
                return (
                  <Col span={6} key={item}>
                    <div
                      id={item}
                      style={styleGheTrong}
                      onClick={() => DatGhe(item)}
                    >
                      {item}
                    </div>
                  </Col>
                )
              }
            })}
          </Row>
        </Col>
      </Row>
      <Button
        style={{ marginRight: '1em', width: '100px' }}
        onClick={() => prev()}
      >
        Trở lại
      </Button>
      <Button
        style={{ width: '100px' }}
        type='primary'
        onClick={() => {
          if (viTriGhe.length === 0) {
            openNotificationWithIcon('error', 'Bạn chưa chọn vị trí ghế')
          } else {
            next()
          }
        }}
      >
        Tiếp theo
      </Button>
    </div>
  )
}

export default ChonGhe
