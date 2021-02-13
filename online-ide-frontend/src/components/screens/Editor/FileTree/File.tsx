import React, { useRef } from 'react'
import { observer } from 'mobx-react'

import Files, { ItemType } from '../../../../models/Editor/Files'
import { Path } from '../../../../models/types/Path'
import CodeEditorModel from '../../../../models/Editor/CodeEditor'
import ItemContainer from '../../../shared/ItemContainer'
import LanguageIcon from '../LanguageIcon'
import ItemName, { ItemNameImperativeHandle } from './ItemName'
import ContextMenu from '../../../shared/ContextMenu'

export interface FileProps {
  type: ItemType,
  name: string,
  depth?: number,
  path?: Path
}

const File = observer(function ({ name, depth, path = [] }: FileProps) {
  const isFileOpened = CodeEditorModel.isOpened(path, name)
  const itemName = useRef<ItemNameImperativeHandle>(null)

  async function viewFile () {
    CodeEditorModel.openFile(path, name)
  }

  const contextMenuItems = [
    { type: 'MenuItem' as const, title: 'Rename', onClick: () => itemName.current?.rename() },
    { type: 'MenuItem' as const, title: 'Delete', onClick: () => Files.delete(path, name) }
  ]

  return (
    <ContextMenu items={contextMenuItems}>
      <ItemContainer depth={depth} onClick={viewFile} isSelected={isFileOpened}>
        <LanguageIcon name={name} />
        <ItemName
          name={name}
          ref={itemName}
          onRename={(newName) => Files.rename(path, name, newName)}
        />
      </ItemContainer>
    </ContextMenu>
  )
})

export default File
