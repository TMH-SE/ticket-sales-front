import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Table
} from 'antd'
import { convertTimeStamp, minutesToHours } from '../../utils/convertTime'

import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'

const { Option } = Select

const TIM_CHUYEN = gql`
  query timChuyen($searchData: SearchData!) {
    timChuyen(searchData: $searchData) {
      id
      diemDi
      diemDen
      thoiGianKhoiHanh
      soGheTrong
      dsGheTrong
      soGhe
      loaiXe
      quangDuong
      thoiGian
      giaVe
    }
  }
`

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

function TimChuyenStep(props) {
  const { next, isMobile, searchData, form, setChuyenDat, setSearchData } = props
  const { getFieldDecorator, validateFields } = form
  const { data, loading } = useQuery(TIM_CHUYEN, {
    skip: !searchData,
    variables: {
      searchData
    }
  })

  const { data: dataTuyen, loading: loadTuyen } = useQuery(GET_ALL_TUYEN)
  if (loading || loadTuyen) return null
  const diemDis = []
  const diemDens = []
  dataTuyen.getAllTuyen &&
    // eslint-disable-next-line array-callback-return
    dataTuyen.getAllTuyen.map(tuyen => {
      if (diemDis.indexOf(tuyen.diemDi) === -1) {
        diemDis.push(tuyen.diemDi)
      }
      if (diemDens.indexOf(tuyen.diemDen) === -1) {
        diemDens.push(tuyen.diemDen)
      }
    })

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
        return <span>{`${time.hour}h${time.minute}p`}</span>
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
      title: '',
      dataIndex: '',
      key: 'x',
      render: (t, r) => (
        <Button type='danger' onClick={() => {
          setChuyenDat(r)
          next()
        }}>
          Đặt vé
        </Button>
      )
    }
  ]

  const submit = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const {diemDi, diemDen, thoiGianKhoiHanh, soLuong} = values
        let timestamp
        if (thoiGianKhoiHanh.format('YYYY-MM-DD') === new Date().toISOString().split('T')[0]) {
          timestamp = new Date().getTime()
        } else {
          timestamp = new Date(`${thoiGianKhoiHanh.format('YYYY-MM-DD')} 00:00:00`).getTime()
        }
        setSearchData({
          diemDi,
          diemDen,
          thoiGianKhoiHanh: timestamp,
          soLuong
        })
      }
    })
  }
  return (
    <div>
      <Row>
        <Col lg={7} md={7} sm={24} xs={24}>
          <h2 style={{ color: 'red', marginBottom: '2em' }}>Chọn Thông Tin</h2>
          <Form onSubmit={submit}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: '50%',
                  padding: '0 3px'
                }}
              >
                {getFieldDecorator('diemDi', {
                  initialValue: searchData ? searchData.diemDi : undefined,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng chọn điểm đi'
                    }
                  ]
                })(
                  <Select style={{ width: '100%' }} placeholder='Điểm đi'>
                    {diemDis.map(diem => (
                      <Option key={diem} value={diem}>
                        {diem}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: '50%',
                  padding: '0 3px'
                }}
              >
                {getFieldDecorator('diemDen', {
                  initialValue: searchData ? searchData.diemDen : undefined,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng chọn điểm đến'
                    }
                  ]
                })(
                  <Select style={{ width: '100%' }} placeholder='Điểm đến'>
                    {diemDens.map(diem => (
                      <Option key={diem} value={diem}>
                        {diem}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: '50%',
                  padding: '0 3px'
                }}
              >
                {getFieldDecorator('thoiGianKhoiHanh', {
                  initialValue: searchData ? moment(new Date(searchData.thoiGianKhoiHanh)) : null,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng chọn ngày khởi hành'
                    }
                  ]
                })(
                  <DatePicker
                    disabledDate={current => current.isBefore(new Date().setDate(new Date().getDate() - 1))}
                    placeholder='Ngày khởi hành'
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: '50%',
                  padding: '0 3px'
                }}
              >
                {getFieldDecorator('soLuong', {
                  initialValue: searchData ? searchData.soLuong : undefined,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng chọn số lượng!'
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (value && value < 1) {
                          callback('Số lượng cần tìm nhỏ nhất là 1')
                        } else {
                          callback()
                        }
                      }
                    }
                  ]
                })(
                  <InputNumber
                    min={1}
                    placeholder='Số lượng'
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='danger' block>
                Tìm chuyến
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={1} md={1} sm={1} xs={1} />
        <Col lg={16} md={16} sm={24} xs={24}>
          <Row>
            <Table
              style={{ width: '100%' }}
              rowKey={r => r.id}
              scroll={{ x: isMobile }}
              columns={columns}
              dataSource={data && data.timChuyen}
            />
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Form.create()(TimChuyenStep)
