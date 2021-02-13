import React from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react'
import User from '../../models/Common/User'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const PrivateRoute = observer(function ({ component: Component, ...rest }: PrivateRouteProps) {
  return (
    <Route {...rest} render={(props) => (
      User.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
})

export default PrivateRoute
