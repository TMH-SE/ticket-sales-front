import React from 'react'
import { Spin } from 'antd'

function Loading() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin size='large' />
    </div>
  )
}

export default Loading
