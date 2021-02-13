import { promises as fs } from 'fs'

async function renameItem (path: string, newName: string): Promise<string> {
  const splittedPath = path.split('/')
  const oldPathWithoutName = splittedPath.slice(0, splittedPath.length - 1).join('/')

  await fs.rename(path, `${oldPathWithoutName}/${newName}`)

  return newName
}

async function deleteItem (path: string): Promise<void> {
  const item = await fs.lstat(path)

  if (item.isDirectory()) {
    await fs.rmdir(path, { recursive: true })
  } else {
    await fs.unlink(path)
  }
}

async function createItem (path: string, type: 'directory' | 'file'): Promise<void> {
  const name = `new-${type}-${Date.now()}`
  const newItemPath = `${path}/${name}`

  if (type === 'directory') {
    await fs.mkdir(newItemPath)
  } else if (type === 'file') {
    await fs.writeFile(`${path}/${name}`, '')
  }
}

export default {
  renameItem,
  deleteItem,
  createItem
}
