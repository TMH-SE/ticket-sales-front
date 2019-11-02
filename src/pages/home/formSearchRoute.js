/* eslint-disable array-callback-return */

import './index.scss'

import { Button, DatePicker, Form, InputNumber, Select } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const { Option } = Select

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

function SearchRouteForm(props) {
  const { form, history } = props
  const { getFieldDecorator, validateFields } = form
  const { data, loading } = useQuery(GET_ALL_TUYEN)

  if (loading) {
    return null
  }
  const diemDis = []
  const diemDens = []
  data &&
    data.getAllTuyen &&
    data.getAllTuyen.map(tuyen => {
      if (diemDis.indexOf(tuyen.diemDi) === -1) {
        diemDis.push(tuyen.diemDi)
      }
      if (diemDens.indexOf(tuyen.diemDen) === -1) {
        diemDens.push(tuyen.diemDen)
      }
    })

  function searchRoute(e) {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { diemDi, diemDen, thoiGianKhoiHanh, soLuong } = values
        let timestamp
        if (
          thoiGianKhoiHanh.format('YYYY-MM-DD') ===
          new Date().toISOString().split('T')[0]
        ) {
          timestamp = new Date(
            thoiGianKhoiHanh.format('YYYY-MM-DD HH:mm:ss')
          ).getTime()
        } else {
          timestamp = new Date(
            `${thoiGianKhoiHanh.format('YYYY-MM-DD')} 00:01:00`
          ).getTime()
        }
        history.push({
          pathname: '/datVe',
          searchData: {
            diemDi,
            diemDen,
            thoiGianKhoiHanh: timestamp,
            soLuong
          }
        })
      }
    })
  }

  return (
    <Form className='formSearchRouteHome' onSubmit={searchRoute}>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          style={{ display: 'inline-block', width: '50%', padding: '0 3px' }}
        >
          {getFieldDecorator('diemDi', {
            rules: [
              {
                required: true,
                message: 'Vui lòng chọn điểm đi !'
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
          style={{ display: 'inline-block', width: '50%', padding: '0 3px' }}
        >
          {getFieldDecorator('diemDen', {
            rules: [
              {
                required: true,
                message: 'Vui lòng chọn điểm đến !'
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
          style={{ display: 'inline-block', width: '50%', padding: '0 3px' }}
        >
          {getFieldDecorator('thoiGianKhoiHanh', {
            rules: [
              {
                required: true,
                message: 'Vui lòng chọn ngày khởi hành'
              }
            ]
          })(
            <DatePicker
              disabledDate={current =>
                current.isBefore(new Date().setDate(new Date().getDate() - 1))
              }
              placeholder='Ngày khởi hành'
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block', width: '50%', padding: '0 3px' }}
        >
          {getFieldDecorator('soLuong', {
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
          Đặt vé
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create('SearchRoute')(SearchRouteForm)
