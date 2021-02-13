import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import SplitterLayout from 'react-splitter-layout'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import 'react-splitter-layout/lib/index.css'

import FileTabs from './FileTabs/FileTabs'
import Header from './EditorHeader/EditorHeader'
import Terminal, { TerminalHandle } from './Terminal/Terminal'
import FullSizeContainer from '../../shared/FullSizeContainer'
import borderDivider from '../../../styles/mixins/borderDivider'
import Project from '../../../models/Editor/Project'
import Toolbar from './Toolbar/Toolbar'
import useToolbarState from './Toolbar/useToolbarState'
import Drawer from './Drawer/Drawer'

import Loader from '../../shared/Loader'
import CodeEditor from '../../../models/Editor/CodeEditor'
import Search from '../../../models/Editor/Search'
import TerminalModel from '../../../models/Editor/Terminal'

import './styles/splitter.css'
import useHotkey from '../../../hooks/useHotkey'
import Receipts from '../../../models/Editor/Receipts'

const Container = styled(FullSizeContainer)`
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`

const DrawerContainer = styled.div`
  min-width: 300px;
  height: 100%;
`

const FileTabsContainer = styled(FullSizeContainer)`
  ${borderDivider('left')}
`

const TerminalContainer = styled(FullSizeContainer)`
  ${borderDivider('left')}
`

const SplittableLayoutContainer = styled(FullSizeContainer)`
  position: relative;
`

const ToolbarContainer = styled.div`
  height: 100%;
  width: 50px;
  ${borderDivider('right')}
`

interface EditorParams {
  projectId: string
}

const Editor = observer(function () {
  const terminal = useRef<TerminalHandle | null>()
  const { projectId } = useParams<EditorParams>()
  const [currentToolbarState, setToolbarState] = useToolbarState()

  useHotkey('control+shift+f', () => setToolbarState('Search'))
  useHotkey('control+s', () => CodeEditor.saveCurrentFile())

  async function load () {
    await Project.loadProject(Number(projectId))
    await Receipts.loadReceipts()
  }

  useEffect(() => {
    load()

    return () => {
      Project.reset()
      CodeEditor.reset()
      Search.reset()
      TerminalModel.exit()
    }
  }, [])

  if (Project.isLoading) {
    return <Loader />
  }

  function fitTerminal () {
    terminal.current?.fit()
  }

  return (
    <Container>
      <Header />
      <Main>
        <ToolbarContainer>
          <Toolbar currentState={currentToolbarState} />
        </ToolbarContainer>
        <SplittableLayoutContainer>
          <SplitterLayout primaryIndex={1} secondaryInitialSize={300}>
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>

            <SplitterLayout secondaryMinSize={200} secondaryInitialSize={500} onDragEnd={() => fitTerminal()}>
              <FileTabsContainer>
                <FileTabs />
              </FileTabsContainer>

              <TerminalContainer>
                <Terminal
                  getInstance={(term) => {
                    terminal.current = term
                  }}
                />
              </TerminalContainer>
            </SplitterLayout>
          </SplitterLayout>
        </SplittableLayoutContainer>
      </Main>
    </Container>
  )
})

export default Editor
