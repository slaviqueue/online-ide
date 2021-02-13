import { makeAutoObservable } from 'mobx'
import projectToWorkerUrl from '../../utils/projectToWorkerUrl'
import Project from './Project'
import { Project as ProjectType } from '../types/Project'
import User from '../Common/User'

type MessageType = 'init' | 'size' | 'data'
type OnMessageHandler = (message: { data: object }) => void

class Terminal {
  private socket: WebSocket | null = null

  constructor () {
    makeAutoObservable(this)
  }

  public init (): void {
    this.socket = new WebSocket(`ws://${this.projectWorkerUrl}/projects/${Project.project!.id}/tty?token=${User.jwt}`)
    this.socket.onopen = () => this.open()
  }

  public resize (cols: number, rows: number): void {
    this.send('size', { cols, rows })
  }

  public data (data: string): void {
    this.send('data', data)
  }

  public onMessage (handler: OnMessageHandler): void {
    if (this.socket) {
      this.socket.onmessage = handler
    }
  }

  private open (): void {
    this.send('init')
  }

  private send (type: MessageType, data?: object | string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, data }))
    }
  }

  public exit (): void {
    this.socket?.close()
  }

  private get projectWorkerUrl () {
    return projectToWorkerUrl(Project.project as ProjectType)
  }
}

export default new Terminal()
