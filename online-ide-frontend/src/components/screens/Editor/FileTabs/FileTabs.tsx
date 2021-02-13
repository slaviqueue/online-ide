import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import CodeEditor from './CodeEditor'
import FileTab from './FileTab'
import CodeEditorModel from '../../../../models/Editor/CodeEditor'
import FullSizeContainer from '../../../shared/FullSizeContainer'

const Container = styled(FullSizeContainer)`
  display: flex;
  flex-direction: column;
`

const TabsWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`

const EditorWrapper = styled(FullSizeContainer)`
  display: flex;
  overflow: hidden;
`

const FileTabs = observer(function () {
  return (
    <Container>
      <TabsWrapper>
        {CodeEditorModel.currentFileName && (
          <FileTab
            fileName={CodeEditorModel.currentFileName}
            wasModified={CodeEditorModel.wasFileModified}
            active
          />
        )}
      </TabsWrapper>
      <EditorWrapper>
        <CodeEditor />
      </EditorWrapper>
    </Container>
  )
})

export default FileTabs
