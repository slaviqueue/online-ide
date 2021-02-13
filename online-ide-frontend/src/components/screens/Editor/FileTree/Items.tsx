import React, { useEffect } from 'react'
import { observer } from 'mobx-react'

import { Path } from '../../../../models/types/Path'
import FilesModel from '../../../../models/Editor/Files'
import Item from './Item'

interface FilesProps {
  depth?: number,
  path?: Path
}

const Items = observer(function ({ path = [], depth }: FilesProps) {
  const files = FilesModel.getDirectoryContent(path)

  useEffect(() => {
    FilesModel.open(path)
  }, [])

  return (
    <React.Fragment>
      {files && files.map((file, i) => <Item {...file} depth={depth} path={path} key={i} />)}
    </React.Fragment>
  )
})

export default Items
