/* eslint-disable node/no-deprecated-api */
import WebSocket from 'ws'
import { Server } from 'http'
import { parse } from 'url'

type Handler = (ws: WebSocket) => void

class WebsocketRouter {
  private server: Server
  private websocketServers: Record<string, WebSocket.Server> = {}
  private handlers: Record<string, Handler> = {}

  public constructor (server: Server) {
    this.server = server
  }

  public route (path: string, handler: Handler): void {
    const server = new WebSocket.Server({ noServer: true })

    this.websocketServers[path] = server
    this.handlers[path] = handler
  }

  public init (): void {
    this.server.on('upgrade', (request, socket, head) => {
      const pathname = parse(request.url).pathname

      if (!pathname) {
        return
      }

      const server = this.websocketServers[pathname]
      const handler = this.handlers[pathname]

      if (!server) {
        socket.destroy()
      }

      server.handleUpgrade(request, socket, head, (ws) => {
        server.emit('connection', ws)
        handler?.(ws)
      })
    })
  }
}

export default WebsocketRouter
