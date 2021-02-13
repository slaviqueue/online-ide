import styled from 'styled-components'
import borderDivider from '../../styles/mixins/borderDivider'

const Header = styled.div`
  display: flex;
  padding: 4px 16px;
  background-color: ${(props) => props.theme.mainBackground};

  ${borderDivider('bottom')}
`

export default Header
