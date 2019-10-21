import React from 'react'
import { Col, Row, Card, Button, Icon } from 'antd'
import './index.scss'
import CountUp from 'react-countup';
import intro1 from '../../assets/hanoi.png'
import intro2 from '../../assets/vinmart.png'
import intro3 from '../../assets/tphcm.jpg'
import markicon from '../../assets/markicon.png'
import routeicon from '../../assets/route.jpg'
import customericon from '../../assets/customer.jpg'
const { Meta } = Card;



function Intruduce(props) {
    const { history } = props
    return (
        <div>
            <div>
                <h1 style={{ fontSize: '40px', color: '#fff', fontWeight: 700, textAlign: 'center' }}>
                    <span style={{ borderBottom: '1px solid blue' }}>ĐẶT VÉ ONLINE</span>
                </h1>
            </div>
            <div style={{ paddingTop: '100px', paddingBottom: '100px', margin: '0px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            onClick={() => { history.push('/datVe') }}
                            hoverable
                            style={{ width: 300, height: 600, margin: '0 auto' }}
                            cover={<img alt="" src={intro2} />}
                        >
                            <Meta title="THANH TOÁN TIỆN LỢI" description="Đặt vé trên https://vexeonline.ga – Thanh toán tại Bất kì cửa hàng Vinmart+ gần nhất. Tại sao không?" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            onClick={() => { history.push('/datVe') }}
                            hoverable
                            style={{ width: 300, height: 600, margin: '0 auto' }}
                            cover={<img alt="" src={intro1} />}
                        >
                            <Meta title="ĐẶT VÉ HÀ NỘI" description="DH2 Coach xe trắng chạy quốc lộ 5A - tần suất 20 phút/ chuyến. DH2 Coach khai thác trên cao tốc 5B - 'NÓI KHÔNG VỚI BẮT KHÁCH DỌC ĐƯỜNG'." />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            onClick={() => { history.push('/datVe') }}
                            hoverable
                            style={{ width: 300, height: 600, margin: '0 auto' }}
                            cover={<img alt="" src={intro3} height="298" />}
                        >
                            <Meta title="ĐẶT VÉ TPHCM" description="Hình thức Liên vận Ôtô - Tàu cao tốc. Tần suất 4 chuyến/ngày (ngày Lễ - Tết có lịch trình cụ thể riêng)." />
                        </Card>
                    </Col>
                </Row>
            </div>
            <hr />
            <div style={{ textAlign: 'center' }} className="text-slogan">
                <h4>DH2 Coach</h4>
                <h3>NÓI KHÔNG VỚI KHÁCH DỌC ĐƯỜNG</h3>
                <h4 style={{ color: 'yellow' }}>&#9733; &#9733; &#9733; &#9733; &#9733;</h4>
                <h4>Lộ trình chỉ 1 giờ 30 phút</h4>
            </div>
            <hr />
            <div className="countup">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 300, height: 300, margin: '0 auto' }}
                            cover={<img alt="" src={markicon} height="298" />}
                        >
                            <CountUp
                                className="account-balance"
                                start={0}
                                end={39}
                                duration={30}
                                useEasing={true}
                                useGrouping={true}
                                separator=" "
                                decimals={0}
                                decimal=","
                                prefix="ĐIỂM ĐẾN: "
                                suffix=""
                                style={{ color: 'yellow' }}
                            // onComplete={onComplete}
                            // onStart={onStart}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 300, height: 300, margin: '0 auto' }}
                            cover={<img alt="" src={routeicon} height="298" />}
                        >
                            <CountUp
                                className="account-balance"
                                start={0}
                                end={2059}
                                duration={100}
                                useEasing={true}
                                useGrouping={true}
                                separator=" "
                                decimals={0}
                                decimal=","
                                prefix="SỐ CHUYẾN: "
                                suffix=""
                                style={{ color: 'yellow' }}
                            // onComplete={onComplete}
                            // onStart={onStart}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 300, height: 300, margin: '0 auto' }}
                            cover={<img alt="" src={customericon} height="298" />}
                        >
                            <CountUp
                                className="account-balance"
                                start={0}
                                end={1324}
                                duration={150}
                                useEasing={true}
                                useGrouping={true}
                                separator=" "
                                decimals={0}
                                decimal=","
                                prefix="KHÁCH HÀNG: "
                                suffix=""
                                style={{ color: 'yellow' }}
                            // onComplete={onComplete}
                            // onStart={onStart}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Intruduce