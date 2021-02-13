/* eslint-disable react/display-name */
import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, Ref } from 'react'
import styled from 'styled-components'
import ReactPopup from 'reactjs-popup'
import { PopupProps, PopupActions } from 'reactjs-popup/dist/types'

import 'reactjs-popup/dist/index.css'
import FullSizeContainer from './FullSizeContainer'

const PopupContainer = styled(FullSizeContainer)`
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 12px 2px rgba(0, 0, 0, .8);
  background-color: ${(props) => props.theme.mainBackground};
  width: 100%;
`

const PopupContent = styled(FullSizeContainer)`
  padding: 32px;
`

const MaxPopupWidth = 600

const popupContentStyle = {
  padding: 0,
  border: 'none',
  maxWidth: MaxPopupWidth,
  width: 'auto'
}

type PopupType = ForwardRefExoticComponent<PopupProps & RefAttributes<PopupActions>>

const Popup = forwardRef(function (props: PopupProps, ref: Ref<PopupActions>) {
  return (
    <ReactPopup { ...props } contentStyle={popupContentStyle} ref={ref}>
      <PopupContainer>
        {props.children}
      </PopupContainer>
    </ReactPopup>
  )
})

export { PopupContent }

export default Popup as PopupType
