import React from 'react'
import styled from 'styled-components'

import hoverable from '../../../../styles/mixins/hoverable'
import { ToolbarState } from './ToolbarState'
import useToolbarState from './useToolbarState'

interface ItemProps {
  icon: React.ReactElement
  isActive?: boolean
  toolbarState: ToolbarState
}

interface ItemViewProps {
  isActive: boolean
}

const ItemView = styled.button<ItemViewProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.mainFontColor};
  cursor: pointer;
  transition: all .1s ease-in-out;
  outline: none;

  border-left: 0px solid ${(props) => props.theme.mainFontColor};

  ${hoverable}

  ${(props) => props.isActive && 'border-left-width: 3px;'}
`

function Item ({ icon, isActive = false, toolbarState }: ItemProps) {
  const [, setToolbarState] = useToolbarState()

  return (
    <ItemView isActive={isActive} onClick={() => setToolbarState(toolbarState)}>
      {icon}
    </ItemView>
  )
}

export default Item
