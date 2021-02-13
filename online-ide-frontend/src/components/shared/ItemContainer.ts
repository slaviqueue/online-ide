import styled from 'styled-components'

interface ContainerProps {
  depth?: number,
  isSelected?: boolean
}

const ItemContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  padding-left: ${({ depth = 0 }) => (depth + 1) * 16}px;
  cursor: pointer;
  user-select: none;

  ${({ isSelected }) => isSelected ? 'background-color: rgba(0, 0, 0, .25);' : ''}

  &:hover {
    background-color: rgba(0, 0, 0, .2);
  }
`

export default ItemContainer
