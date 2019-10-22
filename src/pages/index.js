import React, { lazy } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import AdminLayout from './adminLayout'
import ClientLayout from './layout'
import { publicRouters } from '../routers'

function Root(props) {
  return (
    <Switch>
      {publicRouters.map((router, index) => (
        <Route
          key={index}
          exact={router.exact}
          path={router.path}
          render={() => {
            const Component = lazy(() => import(`./${router.component}`))
            return (
              <ClientLayout key={index} menuKey={router.key} {...props}>
                <Component {...props} />
              </ClientLayout>
            )
          }}
        />
      ))}
      <Route
        path='/admin'
        render={() => {
          const Component = lazy(() => import(`./admin`))
          return (
            <AdminLayout {...props}>
              <Component {...props} />
            </AdminLayout>
          )
        }}
      />
      <Redirect to='/home' />
    </Switch>
  )
}

export default inject('store')(observer(withRouter(Root)))
