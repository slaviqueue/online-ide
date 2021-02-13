import React from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react'
import User from '../../models/Common/User'

interface PublicRouteProps extends RouteProps {
  forceTo: string,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const PublicRoute = observer(function ({ component: Component, forceTo, ...rest }: PublicRouteProps) {
  return (
    <Route {...rest} render={(props) => (
      !User.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={forceTo} />
    )} />
  )
})

export default PublicRoute
