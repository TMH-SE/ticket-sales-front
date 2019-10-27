import React from 'react'
import { Form, Row, Col, Select, InputNumber, DatePicker, Button } from 'antd'

import './index.scss'

const { Option } = Select

function SearchRouteForm(props) {
    const { form, history } = props
    const { getFieldDecorator, validateFields } = form

    function searchRoute(e) {
        e.preventDefault()
        validateFields(async (err, values) => {
            if (!err) {
                try {
                    const { diemdi, diemden, ngaykhoihanh, soluong } = values
                    history.push({
                        pathname: '/datVe',
                        data: {
                            diemdi: diemdi,
                            diemden: diemden,
                            ngaykhoihanh: ngaykhoihanh,
                            soluong: soluong
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <Form className='formSearchRouteHome' onSubmit={searchRoute}>
            <Form.Item>
                <Row style={{ marginTop: '1em' }} type='flex' justify='space-between'>
                    {getFieldDecorator('diemdi', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn điểm đi !'
                            }
                        ]
                    })(<Select style={{ width: '49%' }} placeholder='Điểm đi'>
                        <Option value='Phú Yên'>Phú Yên</Option>
                        <Option value='HCM'>HCM</Option>
                        <Option value='Hà Nội'>Hà Nội</Option>
                    </Select>)}
                    {getFieldDecorator('diemden', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn điểm đến !'
                            }
                        ]
                    })(<Select style={{ width: '49%' }} placeholder='Điểm đến'>
                        <Option value='Phú Yên'>Phú Yên</Option>
                        <Option value='HCM'>HCM</Option>
                        <Option value='Hà Nội'>Hà Nội</Option>
                    </Select>)}
                </Row>
            </Form.Item>
            <Form.Item>
                <Row style={{ marginTop: '1em' }} type='flex' justify='space-between'>
                    {getFieldDecorator('ngaykhoihanh', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày khởi hành'
                            }
                        ]
                    })(<DatePicker placeholder='Ngày khởi hành' style={{ width: '49%' }} />)}
                    {getFieldDecorator('soluong', {
                        rules: [
                            {
                                required: true,
                                message: 'Vui lòng chọn số lượng!'
                            }
                        ]
                    })(<InputNumber placeholder='Số lượng' style={{ width: '49%' }} />)}
                </Row>
                <Row style={{ marginTop: '1em' }}>
                    <Button htmlType='submit' type='danger' block>Đặt vé</Button>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default Form.create('SearchRoute')(SearchRouteForm)