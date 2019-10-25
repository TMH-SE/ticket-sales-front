import React from 'react'
import './index.scss'

function index() {
  return (
    <div className='contact'>
      <div className='text-contact'>
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <h3>Điện Thoại</h3>
        <h4>0939 203 204</h4>
        <h3>Email</h3>
        <h4>dh2coach@gmail.com</h4>
        <h3>Địa Chỉ</h3>
        <h4>Số 5 Nguyễn Tri Phương, Phường 5, Quận 3, TPHCM</h4>
      </div>
      <div className='mapouter'>
        <div className='gmap_canvas'>
          <iframe
            title='map'
            id='gmap_canvas'
            src='https://maps.google.com/maps?q=nguy%E1%BB%85n%20tri%20ph%C6%B0%C6%A1ng%2C%20ph%C6%B0%E1%BB%9Dng%205%2C%20qu%E1%BA%ADn%203&t=&z=13&ie=UTF8&iwloc=&output=embed'
            width='100%'
            height='100%'
            frameBorder='0'
            scrolling='no'
            marginHeight='0'
            marginWidth='0'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default index
