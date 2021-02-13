import styled from 'styled-components'

const RenameInput = styled.input`
  margin-left: 8px;
  background-color: rgba(0, 0, 0, .1);
  border: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .3) inset;
  color: ${(props) => props.theme.mainFontColor};
  font-size: 12px;
  width: 100%;
`

export default RenameInput
