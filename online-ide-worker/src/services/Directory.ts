import { promises as fs } from 'fs'

type FileType = 'DIRECTORY' | 'FILE'
type FilesList = Array<{ name: string, type: FileType }>

async function openDirectory (path: string): Promise<FilesList> {
  const files = await fs.readdir(path, { withFileTypes: true })

  const filesWithPrimitiveTypes: FilesList = files.map((file) => ({
    name: file.name,
    type: file.isDirectory() ? 'DIRECTORY' : 'FILE'
  }))

  return filesWithPrimitiveTypes
}

export default {
  openDirectory
}
