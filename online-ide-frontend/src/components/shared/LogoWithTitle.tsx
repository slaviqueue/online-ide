import React from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 100px;
  height: 64px;
`

function LogoWithTitle () {
  return <LogoImg src="/img/logo-with-title.svg" />
}

export default LogoWithTitle
