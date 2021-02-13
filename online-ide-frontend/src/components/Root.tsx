import React, { useEffect, PropsWithChildren } from 'react'
import { useHistory } from 'react-router-dom'

import User from '../models/Common/User'

function Root ({ children }: PropsWithChildren<{}>) {
  const history = useHistory()

  useEffect(() => {
    if (User.jwt) {
      User.loadUser().catch(() => {
        User.logout()
        history.push('/')
      })
    }
  }, [])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Root
