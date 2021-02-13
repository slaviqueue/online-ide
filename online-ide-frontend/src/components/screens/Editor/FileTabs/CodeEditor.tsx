import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { ControlledEditor } from '@monaco-editor/react'

import CodeEditorModel from '../../../../models/Editor/CodeEditor'
import getLanguageNameFromFilePath from '../../../../utils/getLanguageNameFromFilePath'
import FullSizeContainer from '../../../shared/FullSizeContainer'

const Container = styled(FullSizeContainer)`
  overflow: hidden;
`

const CodeEditor = observer(function () {
  const language = getLanguageNameFromFilePath(CodeEditorModel.currentFileName as string)

  return (
    <Container>
      <ControlledEditor
        value={CodeEditorModel.code}
        onChange={(_, code) => CodeEditorModel.setCode(code!)}
        theme='dark'
        editorDidMount={(...editor) => console.log(editor[1].getModel())}
        {...(language && { language })}
      />
    </Container>
  )
})

export default CodeEditor
