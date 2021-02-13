import { makeAutoObservable, observable, action } from 'mobx'
import { orderBy } from 'lodash'
import { Path } from '../types/Path'
import { pathToString, pathToAbsoluteString, absoluteStringToPath } from '../../utils/Path/Path'
import Project from './Project'
import ProtectedApi from '../../utils/ProtectedApi'
import User from '../Common/User'

type FileTree = Record<string, Array<Item>>

export type ItemType = 'FILE' | 'DIRECTORY'

export type Item = File | Directory
export type Directory = { type: ItemType, name: string }
export type File = { type: ItemType, name: string }

type FileWatcherMessageType = 'update' | 'remove'
type FileWatcherMessage = { type: FileWatcherMessageType, fileName: string, path: string }

class Files {
  public directories: FileTree = {}
  private socket: WebSocket | null = null

  constructor () {
    makeAutoObservable(this, {
      directories: observable,
      init: action,
      open: action,
      rename: action,
      loadDirectoryContent: action
    })
  }

  public init (): Promise<void> {
    return new Promise((resolve) => {
      this.socket = new WebSocket(`ws://${Project.projectHost}/projects/${Project.project?.id}/directory-watcher?token=${User.jwt}`)

      this.socket.onmessage = (rawMessage) => {
        const message: FileWatcherMessage = JSON.parse(rawMessage.data)
        this.loadDirectoryContent(absoluteStringToPath(message.path))
      }

      this.socket.onopen = () => resolve()
    })
  }

  public async open (path: Path) {
    await this.loadDirectoryContent(path)
    this.socket?.send(JSON.stringify({ type: 'watch', path: pathToAbsoluteString(path) }))
  }

  public async rename (path: Path, name: string, newName: string) {
    await ProtectedApi.put(`${Project.workerPath}/item/name/${pathToString(path)}/${name}`, {
      data: newName
    })
  }

  public async create (path: Path, type: 'directory' | 'file'): Promise<void> {
    await ProtectedApi.post(`${Project.workerPath}/item/${pathToString(path)}`, { type })
  }

  public async delete (path: Path, name: string) {
    await ProtectedApi.delete(`${Project.workerPath}/item/${pathToString(path)}/${name}`)
  }

  public async loadDirectoryContent (path: Path) {
    const { data: content } = await ProtectedApi.get(`${Project.workerPath}/tree/${pathToString(path)}`)
    const orderedContent = orderBy(content, 'type')

    this.setDirectoryContent(path, orderedContent)
  }

  public close (path: Path) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket?.send(JSON.stringify({ type: 'unwatch', path: pathToAbsoluteString(path) }))
    }
  }

  public getDirectoryContent (path: Path): Array<Item> {
    return this.directories[pathToString(path)]
  }

  public exit (): void {
    this.socket?.close()
  }

  private setDirectoryContent (path: Path, items: Array<Item>): void {
    this.directories[pathToString(path)] = items
  }
}

export default new Files()
