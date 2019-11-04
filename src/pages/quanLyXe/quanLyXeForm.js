import { Form, Input, InputNumber, Modal, Select } from 'antd'

import React from 'react'
import gql from 'graphql-tag'
import { openNotificationWithIcon } from '../../components/notification'
import { useMutation } from '@apollo/react-hooks'

const THEM_XE = gql`
  mutation themXe($input: XeInput!) {
    themXe(input: $input)
  }
`

const CAP_NHAT_XE = gql`
  mutation capNhatXe($id: ID!, $input: XeInput!) {
    capNhatXe(id: $id, input: $input)
  }
`

function QuanLyXeForm(props) {
  const { visible, closeForm, form, updatedData } = props
  const { getFieldDecorator, validateFields } = form
  const [themXe] = useMutation(THEM_XE)
  const [capNhatXe] = useMutation(CAP_NHAT_XE)
  const { id, bienSoXe, loaiXe, soGhe } = updatedData
  const isUpdate = id
  const submitForm = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        const { bienSoXe, loaiXe, soGhe } = values
        if (isUpdate) {
          const { data } = await capNhatXe({
            variables: {
              id: updatedData.id,
              input: {
                bienSoXe,
                loaiXe,
                soGhe
              }
            }
          })
          if (data && data.capNhatXe) {
            openNotificationWithIcon('success', 'Cập nhật thành công')
            closeForm()
          } else {
            openNotificationWithIcon('error', 'Cập nhật thất bại')
          }
        } else {
          const { data } = await themXe({
            variables: {
              input: {
                bienSoXe,
                loaiXe,
                soGhe
              }
            }
          })
          if (data && data.themXe) {
            openNotificationWithIcon('success', 'Thêm xe mới thành công')
            closeForm()
          } else {
            openNotificationWithIcon('error', 'Thêm xe thất bại')
          }
        }
        form.resetFields()
      }
    })
  }
  return (
    <Modal
      title={isUpdate ? 'Chỉnh sửa thông tin xe' : 'Thêm xe mới'}
      visible={visible}
      onCancel={() => closeForm()}
      onOk={submitForm}
      okText={isUpdate ? 'Lưu thay đổi' : 'Thêm mới'}
      cancelText='Hủy'
    >
      <Form colon={false} hideRequiredMark>
        <Form.Item label='Biển số xe'>
          {getFieldDecorator('bienSoXe', {
            initialValue: bienSoXe || '',
            rules: [
              {
                pattern: /^[1-9]\d[A-Z]-\d{3}.\d{2}$/,
                message: 'Biển số xe có định dạng như sau: 72A-222.22'
              },
              {
                required: true,
                message: 'Vui lòng nhập biển số xe'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Loại xe'>
          {getFieldDecorator('loaiXe', {
            initialValue: loaiXe || 'Giường nằm'
          })(
            <Select>
              <Select.Option value='Giường nằm'>Giường nằm</Select.Option>
              <Select.Option value='Thường'>Thường</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Số ghế'>
          {getFieldDecorator('soGhe', {
            initialValue: soGhe || 1,
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập số ghế'
              }
            ]
          })(
            <InputNumber
              min={1}
              max={99}
              style={{ width: '100%' }}
              parser={value => value.replace(/[^\d]?|(,*)/g, '')}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(QuanLyXeForm)
