/* eslint-disable no-undef */

import React, { PropsWithChildren, useRef } from 'react'
import styled from 'styled-components'
import { PopupActions } from 'reactjs-popup/dist/types'
import Popup, { PopupContent } from './Popup'
import Margin from './Margin'
import Button from './Button'
import Typography from './Typography'

interface ButtonWithConfirmProps {
  message: string
  onConfirm: () => void
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function ButtonWithConfirm (props: PropsWithChildren<ButtonWithConfirmProps>) {
  const popupRef = useRef<PopupActions>(null)

  return (
    <Popup trigger={props.children as JSX.Element} modal ref={popupRef}>
      <PopupContent>
        <Typography size='regular'>{props.message}</Typography>

        <Margin top={32} />

        <ButtonContainer>
          <Button onClick={props.onConfirm}>yes</Button>
          <Margin left={12} />
          <Button onClick={() => popupRef.current?.close()}>no</Button>
        </ButtonContainer>
      </PopupContent>
    </Popup>
  )
}

export default ButtonWithConfirm
