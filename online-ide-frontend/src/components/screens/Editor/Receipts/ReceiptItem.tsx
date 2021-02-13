import React from 'react'
import styled from 'styled-components'
import { MdDelete } from 'react-icons/md'

import { Emoji } from '../../../shared/Emoji'
import Margin from '../../../shared/Margin'
import ButtonWrapper from '../../../shared/ButtonrWapper'
import Receipts from '../../../../models/Editor/Receipts'

const DeleteReceiptButtonWrapper = styled(ButtonWrapper)`
  margin-left: 8px;
  color: ${(props) => props.theme.mainFontColor};
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${DeleteReceiptButtonWrapper} {
    display: none;
  }

  &:hover ${DeleteReceiptButtonWrapper} {
    display: block;
  }
`

const EmojiWithCommand = styled.div`
  display: flex;
  align-items: center;
`

const Command = styled.code`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.darkBorderColor};
`

interface ReceiptItemProps {
  id: number
  emoji: string
  command: string
}

function ReceiptItem ({ id, emoji, command }: ReceiptItemProps) {
  return (
    <Container>
      <EmojiWithCommand>
        <Emoji emoji={emoji} />

        <Margin left={16} />

        <Command>
          {command}
        </Command>
      </EmojiWithCommand>

      <DeleteReceiptButtonWrapper onClick={() => Receipts.deleteReceipt(id)}>
        <MdDelete size={20} />
      </DeleteReceiptButtonWrapper>
    </Container>
  )
}

export default ReceiptItem
