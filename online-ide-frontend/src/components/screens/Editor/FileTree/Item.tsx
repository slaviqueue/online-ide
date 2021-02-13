/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'

import Directory, { DirectoryProps } from './Directory'
import File, { FileProps } from './File'
import { ItemType } from '../../../../models/Editor/Files'

export type ItemProps = FileProps | DirectoryProps

const TypeToComponent: Record<ItemType, typeof Directory | typeof File> = {
  DIRECTORY: Directory,
  FILE: File
}

function Item (props: ItemProps) {
  const Component = TypeToComponent[props.type]

  return (
    <Component {...props} />
  )
}

export default Item
