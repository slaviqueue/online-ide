import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 26px;
  height: 26px;
`

function Logo (props: HTMLAttributes<{}>) {
  return <LogoImg src="/img/logo.svg" {...props} />
}

export default Logo
