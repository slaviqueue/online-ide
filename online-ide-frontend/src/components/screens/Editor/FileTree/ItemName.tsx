/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle, useRef, useLayoutEffect, useEffect } from 'react'
import styled from 'styled-components'
import waitForClickOutside from '../../../../utils/waitForClickOutside'
import waitForPressEnter from '../../../../utils/waitForPressEnter'

const RenameInput = styled.input`
  margin-left: 8px;
  background-color: rgba(0, 0, 0, .1);
  border: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .3) inset;
  color: ${(props) => props.theme.mainFontColor};
  font-size: 12px;
  width: 100%;
`

const ItemNameContainer = styled.span`
  margin-left: 8px;
`

interface ItemNameProps {
  name: string,
  onRename: (newName: string) => void
}

export interface ItemNameImperativeHandle {
  rename: () => void
}

const ItemName = forwardRef<ItemNameImperativeHandle, ItemNameProps>(({ name, onRename }: ItemNameProps, ref) => {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(name)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function finishRenaming () {
    setIsRenaming(false)
    setIsSubmitting(true)
  }

  function startRenaming () {
    setIsRenaming(true)
  }

  useEffect(() => {
    setNewName(name)
  }, [name])

  useEffect(() => {
    if (isSubmitting) {
      onRename(newName)
      setIsSubmitting(false)
    }
  }, [isSubmitting])

  useLayoutEffect(() => {
    if (isRenaming) {
      waitForClickOutside(inputRef, finishRenaming)
      waitForPressEnter(inputRef, finishRenaming)
    }
  }, [isRenaming])

  useImperativeHandle(ref, () => ({
    rename () {
      startRenaming()
    }
  }))

  if (!isRenaming) {
    return (
      <ItemNameContainer>
        {name}
      </ItemNameContainer>
    )
  }

  return (
    <RenameInput
      autoFocus
      value={newName}
      onChange={({ target: { value } }) => setNewName(value)}
      ref={inputRef}
    />
  )
})

export default ItemName
