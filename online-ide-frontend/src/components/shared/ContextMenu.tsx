import React, { PropsWithChildren, useRef } from 'react'
import { ContextMenuTrigger, ContextMenu as ReactContextMenu, MenuItem } from 'react-contextmenu'
import styled from 'styled-components'

type ItemType = 'MenuItem' | 'Divider'

interface MenuItemType {
  type: ItemType,
  title: string,
  onClick: (props: ContextMenuProps) => void
}

interface DividerType {
  type: ItemType
}

interface ContextMenuProps {
  items: Array<MenuItemType | DividerType>
}

const ContextMenuWrapper = styled(ReactContextMenu)`
  min-width: 150px;
  background-color: ${(props) => props.theme.mainBackground};
  box-shadow: 1px 1px 12px 0px rgba(0, 0, 0, .3);
`

const ContextMenuItem = styled(MenuItem)`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .2);
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(100, 100, 100, .5);
`

function ContextMenu ({ children, items }: PropsWithChildren<ContextMenuProps>) {
  const id = useRef(String(Math.random()))

  return (
    <React.Fragment>
      <ContextMenuTrigger id={id.current}>
        {children}
      </ContextMenuTrigger>

      <ContextMenuWrapper id={id.current}>
        {items.map((item, i) => {
          switch (item.type) {
            case 'Divider': {
              return (
                <Divider key={i} />
              )
            }

            case 'MenuItem': {
              const menuItem = item as MenuItemType

              return (
                <ContextMenuItem key={i} onClick={menuItem.onClick} data={item}>
                  {menuItem.title}
                </ContextMenuItem>
              )
            }

            default: return null
          }
        })}
      </ContextMenuWrapper>
    </React.Fragment>
  )
}

export default ContextMenu
