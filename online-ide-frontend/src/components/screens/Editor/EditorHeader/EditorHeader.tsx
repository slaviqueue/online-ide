import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import Menu from './Menu'
import CodeEditor from '../../../../models/Editor/CodeEditor'
import Logo from '../../../shared/Logo'
import Header from '../../../shared/Header'
import ButtonWrapper from '../../../shared/ButtonrWapper'
import Receipts from './Receipts'
import ReceiptsModel from '../../../../models/Editor/Receipts'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const LeftSection = styled.div`
  display: flex;
  width: 33%;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

const MiddleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
`

const RightSection = styled.div`
  width: 33%;
`

const EditorHeader = observer(function () {
  return (
    <Header>
      <Container>
        <LeftSection>
          <Link to="/app">
            <ButtonWrapper>
              <Logo />
            </ButtonWrapper>
          </Link>

          <Menu title="File">
            <Menu.Item onClick={() => CodeEditor.saveCurrentFile()}>Save</Menu.Item>
          </Menu>
        </LeftSection>

        <MiddleSection>
          <Receipts receipts={ReceiptsModel.getReceipts()} />
        </MiddleSection>

        <RightSection></RightSection>
      </Container>
    </Header>
  )
})

export default EditorHeader
