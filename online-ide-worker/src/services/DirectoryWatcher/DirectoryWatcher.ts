import watch from 'node-watch'

type WatchDirectoryMessage = { type: 'watch', path: string }
type UnwatchDirectoryMessage = { type: 'unwatch', path: string }
type DirectoryWatcherMessage = WatchDirectoryMessage | UnwatchDirectoryMessage

type WsConnection = { send: (data: string) => void, on: (event: string, cb: (data: string) => void) => void }

class DirectoryWatcher {
  private ws: WsConnection
  private pathToWatcher: Record<string, ReturnType<typeof watch> | null> = {}

  public constructor (ws: WsConnection) {
    this.ws = ws
  }

  public listen (): void {
    this.ws.on('message', (rawMessage: string) => {
      this.handleMessage(JSON.parse(rawMessage))
    })

    this.ws.on('close', () => {
      this.kill()
    })
  }

  private handleMessage (message: DirectoryWatcherMessage): void {
    switch (message.type) {
      case 'watch': {
        this.watch(message.path)
        break
      }

      case 'unwatch': {
        this.unwatch(message.path)
        break
      }
    }
  }

  private watch (path: string): void {
    this.pathToWatcher[path] = watch(path, (type, fileName) => {
      this.ws.send(JSON.stringify({ type, fileName, path }))
    })
  }

  private unwatch (path: string): void {
    if (this.pathToWatcher[path]) {
      this.pathToWatcher[path]?.close()
      this.pathToWatcher[path] = null
    }
  }

  private kill (): void {
    for (const path in this.pathToWatcher) {
      this.unwatch(path)
    }
  }
}

export default DirectoryWatcher
