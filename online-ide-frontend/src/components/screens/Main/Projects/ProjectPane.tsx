import styled from 'styled-components'

const ProjectPane = styled.div`
  padding: 24px;
  border: 1px solid ${(props) => props.theme.darkBorderColor};
  border-radius: 8px;
  min-width: 256px;
  height: 128px;
  cursor: pointer;
  transition: all .1s ease-in-out;
  user-select: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 8px 8px 1px rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 0, 0, .2);
  }
`

export default ProjectPane
