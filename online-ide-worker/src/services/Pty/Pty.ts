import { spawn, IPty } from 'node-pty'
import os from 'os'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

type MessageType = 'init' | 'size' | 'data'
type Message = { type: MessageType, data: unknown }
type WsConnection = { send: (data: string) => void, on: (event: string, cb: (data: string) => void) => void }
type TerminalSize = { cols: number, rows: number }

class Pty {
  private ptyProcess: IPty | null = null
  private ws: WsConnection

  public constructor (ws: WsConnection) {
    this.ws = ws
  }

  public listen (): void {
    this.ws.on('open', () => {
      this.init()
    })

    this.ws.on('message', (data: string) => {
      this.handleMessage(data)
    })

    this.ws.on('close', () => {
      this.kill()
    })
  }

  private init (): void {
    this.ptyProcess = spawn(shell, [], {
      name: 'xterm-color',
      cwd: process.env.HOME,
      env: process.env as Record<string, string>
    })

    this.ptyProcess?.on('data', (data: string) => {
      this.ws.send(data)
    })
  }

  private handleMessage (rawMessage: any): void {
    const message: Message = JSON.parse(rawMessage.toString('utf-8'))

    switch (message.type) {
      case 'init': {
        this.init()
        break
      }

      case 'data': {
        this.ptyProcess?.write(message.data as string)
        break
      }

      case 'size': {
        const size = message.data as TerminalSize
        this.ptyProcess?.resize(size.cols, size.rows)
      }
    }
  }

  private kill (): void {
    this.ptyProcess?.kill()
    this.ptyProcess = null
  }
}

export default Pty
