import React from 'react'
import styled from 'styled-components'
import LogoWithTitle from '../../shared/LogoWithTitle'

const Container = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: ${(props) => props.theme.buttonBackground};
`

const Content = styled.div`
  max-width: 922px;
  width: 100%;
`

function Header () {
  return (
    <Container>
      <Content>
        <LogoWithTitle />
      </Content>
    </Container>
  )
}

export default Header
