import React from 'react'
import styled from 'styled-components'
import { Emoji } from '../../../shared/Emoji'
import Terminal from '../../../../models/Editor/Terminal'
import Button from '../../../shared/Button'

const Container = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

interface ReceiptsProps {
  receipts: { emoji: string; command: string }[]
}

export default function Receipts (props: ReceiptsProps) {
  function handleCommandRun (command: string): void {
    Terminal.data(`${command}\r`)
  }

  return (
    <Container>
      {props.receipts.map((receipt, i) => (
        <Button withIconInside key={i} onClick={() => handleCommandRun(receipt.command)}>
          <Emoji emoji={receipt.emoji} />
        </Button>
      ))}
    </Container>
  )
}
