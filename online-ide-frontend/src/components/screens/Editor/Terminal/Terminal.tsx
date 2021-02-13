/* eslint-disable react/display-name */
import React, { useRef, useEffect, useState } from 'react'
import { Terminal as Xterm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import styled from 'styled-components'
import 'xterm/css/xterm.css'

import TerminalModel from '../../../../models/Editor/Terminal'

import customScrollMixin from '../../../../styles/mixins/customScroll'
import FullSizeContainer from '../../../shared/FullSizeContainer'

const TerminalContainer = styled(FullSizeContainer)`
  & .terminal.xterm {
    height: 100%;

    .xterm-viewport {
      ${customScrollMixin}
    }
  }
`

function initializeTerminal (term: Xterm) {
  TerminalModel.init()

  term.onResize((size) => {
    TerminalModel.resize(size.cols, size.rows)
  })

  term.onData((data) => {
    TerminalModel.data(data)
  })

  TerminalModel.onMessage((event) => {
    const message = event.data.toString()
    term.write(message)
  })

  return term
}

export interface TerminalHandle {
  fit(): void
}

interface TerminalProps {
  getInstance?({ fit }: { fit: () => void }): void
}

function Terminal (props: TerminalProps) {
  const id = useRef(String(Math.random()))
  const fitAddon = useRef<FitAddon>()

  const terminalContainer = useRef(null)
  const [, setTerminal] = useState<Xterm>()

  useEffect(() => {
    const term = new Xterm()

    term.setOption('fontSize', 12)

    fitAddon.current = new FitAddon()
    term.loadAddon(fitAddon.current)

    term.open(terminalContainer.current as unknown as HTMLElement)
    initializeTerminal(term)

    setTimeout(() => {
      fitAddon.current?.fit()
    })

    setTerminal(term)
  }, [])

  if (props.getInstance) {
    props.getInstance({
      fit () {
        fitAddon.current?.fit()
      }
    })
  }

  return (
    <TerminalContainer id={id.current} ref={terminalContainer}></TerminalContainer>
  )
}

export default Terminal
