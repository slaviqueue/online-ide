/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { PropsWithChildren, ReactEventHandler, forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, .2);
  border-radius: 4px;
  color: ${(props) => props.theme.mainFontColor};
  padding: 8px 18px;
  font-size: 12px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Roboto;
`

interface ButtonProps {
  onClick?: ReactEventHandler
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({ onClick, children }, ref) => {
  return (
    <Container ref={ref} onClick={onClick}>
      {children}
    </Container>
  )
})

export default Button
