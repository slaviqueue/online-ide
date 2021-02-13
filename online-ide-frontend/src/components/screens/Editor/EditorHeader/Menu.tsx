import React, { PropsWithChildren, useState, useRef, MouseEventHandler } from 'react'
import styled from 'styled-components'

import Button from './Button'
import useOnClickOutside from '../../../../lib/useClickOutside'

interface MenuProps {
  title: string
}

interface ListProps {
  top?: number
}

const List = styled.ul<ListProps>`
  position: absolute;
  padding: 0;
  margin: 0;
  min-width: 100px;
  background-color: ${(props) => props.theme.mainBackground};
  z-index: 1;
  left: 0;
  box-shadow: 1px 1px 13px 1px rgba(0,0,0,.5);
`

const Container = styled.div`
  position: relative;
  width: fit-content;
`

function Menu ({ title, children }: PropsWithChildren<MenuProps>) {
  const [isOpened, setIsOpened] = useState(false)
  const buttonElement = useRef<HTMLButtonElement>(null)
  const containerElement = useRef<HTMLDivElement>(null)

  function toggleOpened () {
    setIsOpened(!isOpened)
  }

  useOnClickOutside(containerElement, () => setIsOpened(false))

  return (
    <Container ref={containerElement}>
      <Button onClick={toggleOpened} ref={buttonElement}>
        {title}
      </Button>

      {isOpened && (
        <List top={buttonElement.current?.offsetHeight}>
          {children}
        </List>
      )}
    </Container>
  )
}

interface MenuItemProps {
  onClick?: MouseEventHandler,
}

const ItemContainer = styled.li`
  list-style: none;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, .2);
  }
`

function Item ({ children, onClick }: PropsWithChildren<MenuItemProps>) {
  return (
    <ItemContainer onClick={onClick}>
      {children}
    </ItemContainer>
  )
}

Menu.Item = Item

export default Menu
