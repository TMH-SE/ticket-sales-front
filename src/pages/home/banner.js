import React from 'react'
import { Carousel, Button } from 'antd'

import banner1 from "../../assets/banner1.jpg"
import banner2 from "../../assets/banner2.jpg"
import banner3 from "../../assets/banner3.jpg"

function Banner(props) {
    const state = {
        size: 'large'
    }
    const { history} = props

    return (
        <Carousel autoplay>
            <div className="banner">
                <img src={banner1} />
                <h2 className="text-banner-left text-banner">ĐI BẤT CỨ ĐÂU <br />BẤT CỨ KHI NÀO<br />
                    <Button type="danger" size={state.size} onClick={() => history.push('/datVe')}>Đặt Vé</Button>
                </h2>
            </div>
            <div className="banner">
                <img src={banner2} />
                <h2 className="text-banner-right text-banner">ĐỒNG HÀNH CÙNG BẠN <br /> QUA MỖI CHẶNG ĐƯỜNG <br />
                    <Button type="danger" size={state.size} onClick={() =>  history.push('/datVe')}>Đặt Vé</Button>
                </h2>
            </div>
            <div className="banner">
                <img src={banner2} />
                <h2 className="text-banner-center text-banner">CHẤT LƯỢNG <br /> PHỤC VỤ <br />TIÊU CHUẨN  <br />
                    <Button type="danger" size={state.size} onClick={() =>  history.push('/datVe')}>Đặt Vé</Button>
                </h2>
            </div>
        </Carousel>
    )
}

export default Banner