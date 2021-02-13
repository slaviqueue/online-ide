import React from 'react'
import { NimbleEmoji, EmojiProps, NimblePicker, PickerProps } from 'emoji-mart'
import emojiData from 'emoji-mart/data/apple.json'
import 'emoji-mart/css/emoji-mart.css'

function Emoji (props: Omit<EmojiProps, 'size'>) {
  return (
    <NimbleEmoji
      {...props}
      data={emojiData as any}
      set='apple'
      sheetSize={32}
      size={20}
    />
  )
}

function EmojiPicker (props: Omit<PickerProps, 'data'>) {
  return (
    <NimblePicker
      {...props}
      theme='dark'
      data={emojiData as any}
      style={{ width: 'auto' }}
      sheetSize={32}
      emojiSize={24}
    />
  )
}

export { Emoji, EmojiPicker }
