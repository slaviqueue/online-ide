import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'

import FilesModel, { ItemType } from '../../../../models/Editor/Files'
import { Path } from '../../../../models/types/Path'
import ItemContainer from '../../../shared/ItemContainer'
import ItemName, { ItemNameImperativeHandle } from './ItemName'
import Items from './Items'
import ContextMenu from '../../../shared/ContextMenu'

export interface DirectoryProps {
  type: ItemType,
  name: string,
  depth?: number,
  path?: Path
  isExpandedByDefault?: boolean
}

interface DirectoryContentProps {
  isExpanded: boolean,
}

const DirectoryContent = styled.div<DirectoryContentProps>`
  display: flex;
  flex-direction: column;
  height: ${({ isExpanded }) => isExpanded ? 'auto' : 0};
  overflow: hidden;
`

function Directory ({ name, depth = 0, path = [], isExpandedByDefault = false }: DirectoryProps) {
  const isExpandedRefForUnmountHook = useRef(false)
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault)
  const itemName = useRef<ItemNameImperativeHandle>(null)

  async function toggleExpanded () {
    const newState = !isExpanded

    if (!newState) {
      FilesModel.close([...path, name])
    }

    setIsExpanded(newState)
  }

  useEffect(() => {
    isExpandedRefForUnmountHook.current = isExpanded
  }, [isExpanded])

  useEffect(() => {
    return () => {
      if (isExpandedRefForUnmountHook.current) {
        FilesModel.close([...path, name])
      }
    }
  }, [])

  function rename (newName: string) {
    FilesModel.rename(path, name, newName)
    FilesModel.close([...path, name])
    setIsExpanded(false)
  }

  const contextMenuItems = [
    { type: 'MenuItem' as const, title: 'Create new file', onClick: () => FilesModel.create([...path, name], 'file') },
    { type: 'MenuItem' as const, title: 'Create new folder', onClick: () => FilesModel.create([...path, name], 'directory') },
    { type: 'Divider' as const },
    { type: 'MenuItem' as const, title: 'Rename', onClick: () => itemName.current?.rename() },
    { type: 'MenuItem' as const, title: 'Delete', onClick: () => FilesModel.delete(path, name) }
  ]

  return (
    <React.Fragment>
      <ContextMenu items={contextMenuItems}>
        <ItemContainer depth={depth} onClick={toggleExpanded}>
          {isExpanded && <MdKeyboardArrowDown style={{ fontSize: 20 }} />}
          {!isExpanded && <MdKeyboardArrowRight style={{ fontSize: 20 }} />}

          <ItemName
            name={name}
            ref={itemName}
            onRename={rename}
          />
        </ItemContainer>
      </ContextMenu>

      <DirectoryContent isExpanded={isExpanded}>
        {isExpanded && <Items depth={depth + 1} path={[...path, name]} />}
      </DirectoryContent>
    </React.Fragment>
  )
}

export default Directory
