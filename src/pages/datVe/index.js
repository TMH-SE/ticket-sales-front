import React from 'react'
import { Button } from 'antd'

function index(props) {
  const { data } = props.location
  const { diemdi, diemden, ngaykhoihanh, soluong } = data
  return (
    <div>
      Dat ve
      {console.log(data)}
    </div>
  )
}

export default index
