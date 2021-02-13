import React from 'react'
import styled from 'styled-components'
import FullSizeContainer from './FullSizeContainer'
import Logo from './Logo'

const Container = styled(FullSizeContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BigLogo = styled(Logo)`
  width: 72px;
  height: 72px;
`

const Rotatable = styled.div`
  animation: spin 1.5s ease-in-out infinite;

  @keyframes spin {
    40% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`

function Loader () {
  return (
    <Container>
      <Rotatable>
        <BigLogo />
      </Rotatable>
    </Container>
  )
}

export default Loader
