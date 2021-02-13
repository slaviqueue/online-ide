import React from 'react'
import styled from 'styled-components'
import { MdContentCopy, MdSettings, MdSearch, MdReceipt } from 'react-icons/md'
import Item from './Item'
import { ToolbarState } from './ToolbarState'

const ToolbarContainer = styled.div``

interface ToolbarProps {
  currentState: ToolbarState
}

function Toolbar ({ currentState }: ToolbarProps) {
  return (
    <ToolbarContainer>
      <Item
        icon={<MdContentCopy size={25} />}
        toolbarState='FileTree'
        isActive={currentState === 'FileTree'}
      />

      <Item
        icon={<MdSearch size={25} />}
        toolbarState='Search'
        isActive={currentState === 'Search'}
      />

      <Item
        icon={<MdSettings size={25} />}
        toolbarState='Settings'
        isActive={currentState === 'Settings'}
      />

      <Item
        icon={<MdReceipt size={25} />}
        toolbarState='Receipts'
        isActive={currentState === 'Receipts'}
      />
    </ToolbarContainer>
  )
}

export default Toolbar
