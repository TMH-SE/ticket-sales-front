import { Form, Input, InputNumber, Modal } from 'antd'
import { hourToMinute, minutesToHours } from '../../utils/convertTime'

import React from 'react'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const THEM_TUYEN = gql`
  mutation themTuyen($input: TuyenXeInput!) {
    themTuyen(input: $input)
  }
`

const CAP_NHAT_TUYEN = gql`
  mutation capNhatTuyen($id: ID!, $input: TuyenXeInput!) {
    capNhatTuyen(id: $id, input: $input)
  }
`

function QuanLyTuyenForm(props) {
  const { visible, closeForm, form, updatedData } = props
  const { getFieldDecorator, validateFields, getFieldValue } = form

  const [themTuyen] = useMutation(THEM_TUYEN)
  const [capNhatTuyen] = useMutation(CAP_NHAT_TUYEN)

  const { id, diemDi, diemDen, quangDuong, thoiGian, giaVe } = updatedData
  const { hour, minute } = minutesToHours(thoiGian)

  const submitForm = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { diemDi, diemDen, quangDuong, hours, minutes, giaVe } = values
        const thoiGian = hourToMinute(hours, minutes)
        if (id) {
          const { data } = await capNhatTuyen({
            variables: {
              id: id,
              input: {
                diemDi,
                diemDen,
                quangDuong,
                thoiGian,
                giaVe
              }
            }
          })
          if (data && data.capNhatTuyen) {
            openNotificationWithIcon('success', 'Cập nhật thành công')
            closeForm()
            form.resetFields()
          } else {
            openNotificationWithIcon('error', 'Cập nhật thất bại')
          }
        } else {
          const { data } = await themTuyen({
            variables: {
              input: {
                diemDi,
                diemDen,
                quangDuong,
                thoiGian,
                giaVe
              }
            }
          })
          if (data && data.themTuyen) {
            openNotificationWithIcon('success', 'Thêm tuyến xe mới thành công')
            closeForm()
            form.resetFields()
          } else {
            openNotificationWithIcon('error', 'Tuyến xe này đã tồn tại')
          }
        }
      }
    })
  }

  const kiemTraTrungDiaDiem = (rule, value, callback) => {
    if (value === getFieldValue('diemDi')) {
      callback('Điểm đến không được trùng với điểm đi')
    } else {
      callback()
    }
  }
  return (
    <Modal
      title={id ? 'Chỉnh sửa thông tin tuyến xe' : 'Thêm tuyến xe mới'}
      visible={visible}
      onCancel={() => closeForm()}
      onOk={submitForm}
      okText={id ? 'Lưu thay đổi' : 'Thêm mới'}
      cancelText='Hủy'
    >
      <Form colon={false} hideRequiredMark>
        <Form.Item label='Điểm đi'>
          {getFieldDecorator('diemDi', {
            initialValue: diemDi || '',
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập điểm đi'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Điểm đến'>
          {getFieldDecorator('diemDen', {
            initialValue: diemDen || '',
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập điểm đến'
              },
              {
                validator: kiemTraTrungDiaDiem
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Quãng đường (KM)'>
          {getFieldDecorator('quangDuong', {
            initialValue: quangDuong || undefined,
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập độ dài quãng đường'
              }
            ]
          })(
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              parser={value => value.replace(/[^\d]?|(,*)/g, '')}
            />
          )}
        </Form.Item>
        <Form.Item label='Thời gian di chuyển' style={{ marginBottom: 0 }}>
          <span style={{ marginRight: '10px' }}>Số giờ</span>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 65px)' }}
          >
            {getFieldDecorator('hours', {
              initialValue: hour || 0
            })(
              <InputNumber
                min={0}
                parser={value => value.replace(/[^\d]?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
          <span style={{ margin: '0 10px' }}>Số phút</span>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 55px)' }}
          >
            {getFieldDecorator('minutes', {
              initialValue: minute || 0
            })(
              <InputNumber
                min={0}
                parser={value => value.replace(/[^\d]?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
        </Form.Item>
        <Form.Item label='Giá vé (VND)'>
          {getFieldDecorator('giaVe', {
            initialValue: giaVe || 0
          })(
            <InputNumber
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/[^\d]?|(,*)/g, '')}
              min={0}
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(QuanLyTuyenForm)
