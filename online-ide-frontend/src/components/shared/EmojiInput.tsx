import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { EmojiData } from 'emoji-mart'
import baseFormElement from '../../styles/mixins/baseFormElement'
import { Emoji, EmojiPicker } from './Emoji'
import Typography from './Typography'
import hoverable from '../../styles/mixins/hoverable'

const Container = styled.div`
  position: relative;
`

const Input = styled.div`
  cursor: pointer;
  ${baseFormElement}
  ${hoverable}
`

interface EmojiInputProps {
  placeholder?: string
  value?: string
  onChange?: (emoji: string) => void
}

const Placeholder = styled(Typography)`
  opacity: .5;
`

const EmojiPickerContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`

export default function EmojiInput (props: EmojiInputProps) {
  const inputRef = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false)
  const [value, setValue] = useState(props.value)

  function toggleOpened () {
    console.log('toggle')
    setIsOpened(!isOpened)
  }

  function onSelect (emojiData: EmojiData) {
    setValue(emojiData.id)
    props.onChange?.(emojiData.id as any)
  }

  const emojiPickerContainerTop = Number(inputRef.current?.offsetHeight) + 8

  return (
    <Container>
      <Input ref={inputRef} onClick={toggleOpened}>
        {value && <Emoji emoji={value} />}
        {!value && <Placeholder>{props.placeholder}</Placeholder>}
      </Input>

      {isOpened && (
        <EmojiPickerContainer style={{ top: emojiPickerContainerTop }}>
          <EmojiPicker onSelect={onSelect} />
        </EmojiPickerContainer>
      )}
    </Container>
  )
}
