import styled from 'styled-components'

interface FullSizeContainerProps {
  withPadding?: boolean
}

const FullSizeContainer = styled.div<FullSizeContainerProps>`
  width: 100%;
  height: 100%;

  ${(props) => props.withPadding && 'padding: 16px'}
`

export default FullSizeContainer
