import React from 'react'
import { observer } from 'mobx-react'
import { MdAdd } from 'react-icons/md'
import styled, { useTheme } from 'styled-components'

import FullSizeContainer from '../../../shared/FullSizeContainer'
import Typography from '../../../shared/Typography'
import Margin from '../../../shared/Margin'
// import { EmojiPicker } from '../../../shared/Emoji'
// import Terminal from '../../../../models/Editor/Terminal'
import ReceiptItem from './ReceiptItem'
import ReceiptsModel from '../../../../models/Editor/Receipts'
import Popup from '../../../shared/Popup'
import CreateReceiptForm from './CreateReceiptForm'
import ButtonWrapper from '../../../shared/ButtonrWapper'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Receipts = observer(function () {
  const theme = useTheme() as any
  const receipts = ReceiptsModel.getReceipts()

  const createReceiptButton = (
    <ButtonWrapper>
      <MdAdd size={24} color={theme.mainFontColor} />
    </ButtonWrapper>
  )

  return (
    <FullSizeContainer withPadding>
      <Header>
        <Typography size='regular' weight='bolder' uppercase>Receipts</Typography>

        <Popup trigger={createReceiptButton} modal>
          <CreateReceiptForm />
        </Popup>
      </Header>

      <Margin top={16} />

      {!receipts?.length && (
        <Typography>
          There is no receiptes yet
        </Typography>
      )}

      {receipts?.map((receipt, i) => (
        <Margin bottom={8} key={i}>
          <ReceiptItem id={receipt.id} emoji={receipt.emoji} command={receipt.command} />
        </Margin>
      ))}
    </FullSizeContainer>
  )
})

export default Receipts
