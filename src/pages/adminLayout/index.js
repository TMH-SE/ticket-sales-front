import React, { Suspense } from 'react'
import AdminPageHeader from '../adminPageHeader'

function AdminLayout(props) {
  const { children, store, history } = props
  const { onLogout, isAuth } = store
  return (
    <div
      style={{
        background: 'linear-gradient(#9198e5, #e66465)',
        height: '100vh'
      }}
    >
      <Suspense fallback={null}>
      {isAuth ? <AdminPageHeader onLogout={onLogout} history={history} /> : null}
      <div style={{ padding: '0 24px' }}>{children}</div>
      </Suspense>
    </div>
  )
}

export default AdminLayout
