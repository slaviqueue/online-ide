import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { PopupContent } from '../../../shared/Popup'
import Typography from '../../../shared/Typography'
import Margin from '../../../shared/Margin'
import EmojiInput from '../../../shared/EmojiInput'
import TextInputElement from '../../../shared/TextInput'
import LabelWrapper from '../../../shared/LabelWrapper'
import Button from '../../../shared/Button'
import Receipts from '../../../../models/Editor/Receipts'

const Form = styled.form`
  min-height: 300px;
  min-width: 350px;
`

const CommandInput = styled(TextInputElement)`
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  resize: none;
`

type NewReceipt = {
  emoji: string
  command: string
}

function CreateReceiptForm () {
  const { handleSubmit, register, setValue } = useForm()

  useEffect(() => {
    register('emoji')
  }, [register])

  function handleReceiptCreate (data: NewReceipt) {
    Receipts.makeReceipt(data.emoji, data.command)
  }

  return (
    <PopupContent>
      <Form onSubmit={handleSubmit(handleReceiptCreate)}>
        <Typography size='big' weight='bold'>
          Create new receipt
        </Typography>

        <Margin top={32} />

        <LabelWrapper label='Emoji'>
          <EmojiInput
            placeholder='Select an emoji'
            onChange={(emoji) => setValue('emoji', emoji)}
          />
        </LabelWrapper>

        <Margin top={16} />

        <LabelWrapper label='Command'>
          <CommandInput
            name='command'
            as='textarea'
            placeholder='Type your command here'
            ref={register}
          />
        </LabelWrapper>

        <Margin top={64} />
        <Button type="submit">create</Button>
      </Form>
    </PopupContent>
  )
}

export default CreateReceiptForm
