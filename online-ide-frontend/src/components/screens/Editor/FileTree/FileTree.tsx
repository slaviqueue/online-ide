import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import customScrollMixin from '../../../../styles/mixins/customScroll'
import Files from '../../../../models/Editor/Files'
import ProjectName from './ProjectName'
import { absoluteStringToPath } from '../../../../utils/Path/Path'
import Project from '../../../../models/Editor/Project'
import Items from './Items'

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mainBackground};
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TreeList = styled.div`
  flex: 1;
  overflow-y: auto;

  ${customScrollMixin}
`

const FileTree = observer(function () {
  const [isLoaded, setIsLoaded] = useState(false)

  async function init () {
    await Files.init()
    setIsLoaded(true)
  }

  useEffect(() => {
    init()

    return () => Files.exit()
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <Sidebar>
      <ProjectName>{Project.project?.name}</ProjectName>
      <TreeList>
        <Items path={absoluteStringToPath('/home/user')} />
      </TreeList>
    </Sidebar>
  )
})

export default FileTree
