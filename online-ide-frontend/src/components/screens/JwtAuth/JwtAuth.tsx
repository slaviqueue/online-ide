import React from 'react'
import { Redirect } from 'react-router-dom'
import User from '../../../models/Common/User'

function JwtAuth () {
  const jwt = new URLSearchParams(location.search).get('jwt') as string
  User.authenticate(jwt)

  return <Redirect to="/app" />
}

export default JwtAuth
