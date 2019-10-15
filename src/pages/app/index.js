import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { privateRouters } from '../../routers'

function index(props) {
  const { store } = props
  const { isAdmin } = store

  return (
    <Switch>
      {privateRouters.map((router, index) => (
        <Route
          key={index}
          exact={router.exact}
          path={router.path}
          render={() => {
            const Component = lazy(() => import(`../${router.component}`))
            return isAdmin ? <Component {...props} /> : <Redirect to='/login' />
          }}
        />
      ))}
      <Redirect to='/dashboard' />
    </Switch>
  )
}

export default index
