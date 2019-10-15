import React, { lazy } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

function Admin(props) {
  const { store } = props
  const { isAdmin } = store
  return (
    <BrowserRouter basename='admin/'>
      <Switch>
        <Route
          path='/login'
          exact={true}
          render={() => {
            const Component = lazy(() => import('../loginAdmin'))
            return isAdmin ? <Redirect to='/' /> : <Component {...props} />
          }}
        />
        <Route
          path='/'
          render={() => {
            const Component = lazy(() => import('../app'))
            return isAdmin ? <Component {...props} /> : <Redirect to='/login' />
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Admin
