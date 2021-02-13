import { promises as fs } from 'fs'

async function editFile (path: string, data: string): Promise<void> {
  await fs.writeFile(path, data)
}

async function viewFile (path: string): Promise<string> {
  return fs.readFile(path, 'utf8')
}

export default {
  editFile,
  viewFile
}
