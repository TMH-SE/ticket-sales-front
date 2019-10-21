import React from 'react'
import {
    Layout,
    Menu,
    Icon,
    Button,
    Row,
    Dropdown,
    Avatar,
    Col,
    List,
    Typography,
    Select,
    DatePicker
} from 'antd'
import './index.scss'


function SearchRoute() {
    const { Optiopn } = Select
    return (
        <div className="searchRoute">
            <Row>
                <Col lg={4} md={4} className="text-searchRoute">
                    <h1 className="text-h1">ĐẶT VÉ</h1>
                    <div class="line-vertical"></div>
                </Col>
                <Col lg={1} md={1}>
                    <div class="line"></div>
                </Col>
                <Col lg={4} md={4} className="input-SearchRoute">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Chọn điểm đi"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <Row style={{ marginTop: '40px' }}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn số lượng"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Row>
                </Col>
                <Col lg={4} md={4} className="input-SearchRoute">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Chọn điểm đến"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Col>
                <Col lg={4} md={4} className="input-SearchRoute">
                    <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY"/>
                </Col>
                <Col lg={2} md={2} className="input-SearchRoute">
                    <Button type="danger" size="30" style={{width:130, fontSize: 18, fontWeight:600}} onClick={() => history.push('/datVe')}>Tìm chuyến</Button>
                </Col>
            </Row>
        </div>
    )
}

export default SearchRoute