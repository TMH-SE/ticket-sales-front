import { Button, Popconfirm } from 'antd'

import React from 'react'

function ActionComponent(props) {
  const { updateData, confirm } = props
  return (
    <div>
      <Button onClick={() => updateData()} icon='edit' style={{ marginRight: '5px' }} type='primary'>
        Sửa
      </Button>
      <Popconfirm
        placement='topLeft'
        title='Bạn có chắc chắn?'
        onConfirm={confirm}
        okText='Có'
        cancelText='Không'
      >
        <Button icon='delete' type='danger'>
          Xóa
        </Button>
      </Popconfirm>
    </div>
  )
}

export default ActionComponent
