import styled from 'styled-components'
import FullSizeContainer from './FullSizeContainer'

const Backdrop = styled(FullSizeContainer)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
`

export default Backdrop
