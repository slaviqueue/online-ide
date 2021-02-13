import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import User from '../../../models/Common/User'
import Loader from '../../shared/Loader'

function Logout () {
  const [isLoggingOut, setIsLoggingOut] = useState(true)

  useEffect(() => {
    User.logout()
    setIsLoggingOut(false)
  }, [])

  if (isLoggingOut) {
    return <Loader />
  }

  return (
    <Redirect to="/" />
  )
}

export default Logout
