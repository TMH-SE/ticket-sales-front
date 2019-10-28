import React from 'react'
import { Form, Modal, Select, DatePicker, TimePicker } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { covertTimeStamp, convertTimeStamp } from '../../utils/convertTime'

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

function QuanLyChuyenForm(props) {
  const { visible, closeForm, form, updatedData } = props
  const { getFieldDecorator, validateFields } = form

  const { data: dataTuyen } = useQuery(GET_ALL_TUYEN)
  const { data: dataXe } = useQuery(GET_ALL_XE)

  const { id, xeId, tuyenXeId, thoiGianKhoiHanh } = updatedData

  const submitForm = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
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
                ? moment(new Date(thoiGianKhoiHanh).toLocaleString())
                : null
            })(<DatePicker style={{ width: '90%' }} placeholder='Chọn ngày khởi hành' />)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: '45%' }}>
            {getFieldDecorator('gioKhoiHanh', {
              initialValue: thoiGianKhoiHanh
                ? moment(new Date(thoiGianKhoiHanh).toLocaleString())
                : null
            })(
              <TimePicker
                style={{ width: '100%' }}
                placeholder='Chọn giờ khởi hành'
              />
            )}
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(QuanLyChuyenForm)
