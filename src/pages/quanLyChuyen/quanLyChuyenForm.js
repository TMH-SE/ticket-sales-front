import { DatePicker, Form, Modal, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'

import React from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { openNotificationWithIcon } from '../../components/notification'
import { timeToStart } from '../../utils/constTime'

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

const THEM_CHUYEN = gql`
  mutation themChuyen($input: ChuyenXeInput!) {
    themChuyen(input: $input)
  }
`

const CAP_NHAT_CHUYEN = gql`
  mutation capNhatTuyen($id: ID!, $input: ChuyenXeInput!) {
    capNhatChuyen(id: $id, input: $input)
  }
`

function QuanLyChuyenForm(props) {
  const { visible, closeForm, form, updatedData } = props
  const { getFieldDecorator, validateFields } = form

  const { data: dataTuyen } = useQuery(GET_ALL_TUYEN)
  const { data: dataXe } = useQuery(GET_ALL_XE)
  const [themChuyen] = useMutation(THEM_CHUYEN)
  const [capNhatChuyen] = useMutation(CAP_NHAT_CHUYEN)

  const { id, xeId, tuyenXeId, thoiGianKhoiHanh } = updatedData

  const submitForm = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { xeId, tuyenXeId, gioKhoiHanh, ngayKhoiHanh } = values
        if (id) {
          const data = await capNhatChuyen({
            variables: {
              id,
              input: {
                tuyenXeId,
                xeId,
                thoiGianKhoiHanh: new Date(
                  `${ngayKhoiHanh.format('YYYY-MM-DD')} ${gioKhoiHanh}`
                ).getTime()
              }
            }
          })
          if (data) {
            openNotificationWithIcon('success', 'Cập nhật thành công')
            closeForm()
          } else {
            openNotificationWithIcon('error', 'Cập nhật thất bại')
          }
        } else {
          const data = await themChuyen({
            variables: {
              input: {
                tuyenXeId,
                xeId,
                thoiGianKhoiHanh: new Date(
                  `${ngayKhoiHanh.format('YYYY-MM-DD')} ${gioKhoiHanh}`
                ).getTime()
              }
            }
          })
          if (data) {
            openNotificationWithIcon('success', 'Thêm chuyến xe mới thành công')
            closeForm()
          } else {
            openNotificationWithIcon('error', 'Thêm chuyến xe thất bại')
          }
        }
        form.resetFields()
      }
    })
  }
  return (
    <Modal
      title={id ? 'Chỉnh sửa thông tin chuyến xe' : 'Thêm chuyến xe mới'}
      visible={visible}
      onCancel={() => {
        closeForm()
        form.resetFields()
      }}
      onOk={submitForm}
      okText={id ? 'Lưu thay đổi' : 'Thêm mới'}
      cancelText='Hủy'
    >
      <Form colon={false} hideRequiredMark>
        <Form.Item label='Tuyến xe'>
          {getFieldDecorator('tuyenXeId', {
            initialValue: tuyenXeId || undefined
          })(
            <Select placeholder='Chọn tuyến xe'>
              {dataTuyen &&
                dataTuyen.getAllTuyen.map(tuyen => (
                  <Select.Option
                    key={tuyen.id}
                    value={tuyen.id}
                  >{`${tuyen.diemDi} - ${tuyen.diemDen}`}</Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Xe'>
          {getFieldDecorator('xeId', {
            initialValue: xeId || undefined
          })(
            <Select placeholder='Chọn xe'>
              {dataXe &&
                dataXe.getAllXe.map(xe => (
                  <Select.Option
                    key={xe.id}
                    value={xe.id}
                  >{`${xe.bienSoXe} - ${xe.loaiXe}`}</Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Thời gian khởi hành' style={{ marginBottom: 0 }}>
          <Form.Item style={{ display: 'inline-block', width: '55%' }}>
            {getFieldDecorator('ngayKhoiHanh', {
              initialValue: thoiGianKhoiHanh
                ? moment(new Date(thoiGianKhoiHanh).toJSON().split('T')[0])
                : null
            })(
              <DatePicker
                style={{ width: '90%' }}
                placeholder='Chọn ngày khởi hành'
              />
            )}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: '45%' }}>
            {getFieldDecorator('gioKhoiHanh', {
              initialValue: thoiGianKhoiHanh
                ? new Date(thoiGianKhoiHanh).toTimeString().split(' ')[0]
                : undefined
            })(
              <Select placeholder='Chọn giờ khởi hành'>
                {timeToStart.map(time => (
                  <Select.Option key={time.label} value={time.value}>
                    {time.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(QuanLyChuyenForm)
