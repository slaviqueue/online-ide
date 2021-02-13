import express, { Response, Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import Directory from './services/Directory'
import File from './services/File'
import Item from './services/Item'
import Search from './services/Search'
import WebsocketRouter from './services/WebsocketRouter/WebsocketRouter'
import DirectoryWatcher from './services/DirectoryWatcher/DirectoryWatcher'
import Pty from './services/Pty/Pty'
import parsePath, { RequestWithParsedPath } from './services/middleware/parsePath'
import { makePathParser } from './utils/getPathFromUrl'

const app = express()

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/projects/:id/tree/*', [parsePath(makePathParser('tree'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const files = await Directory.openDirectory((<RequestWithParsedPath>req).parsedPath)
      res.json(files)
    })
    .catch((err) => res.status(500).send(err))
})

app.post('/projects/:id/item/*', [parsePath(makePathParser('item'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      await Item.createItem(path, req.body.type)
      res.status(200).end()
    })
    .catch((err) => res.status(500).send(err))
})

app.put('/projects/:id/item/name/*', [parsePath(makePathParser('item/name'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      const newName = await Item.renameItem(path, req.body.data)
      res.json(newName)
    })
    .catch((err) => res.status(500).send(err))
})

app.delete('/projects/:id/item/*', [parsePath(makePathParser('item'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      const files = await Item.deleteItem(path)
      res.json(files)
    })
    .catch((err) => res.status(500).send(err))
})

app.put('/projects/:id/file/content/*', [parsePath(makePathParser('file/content'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      await File.editFile(path, req.body.data)
      res.status(200).end()
    })
    .catch((err) => res.status(500).send(err))
})

app.get('/projects/:id/file/content/*', [parsePath(makePathParser('file/content'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      const file = await File.viewFile(path)
      res.type('text').send(file)
    })
    .catch((err) => res.status(500).send(err))
})

app.get('/projects/:id/search/*', [parsePath(makePathParser('search'))], async (req: Request, res: Response) => {
  Promise.resolve()
    .then(async () => {
      const path = (<RequestWithParsedPath>req).parsedPath
      const value = String(req.query.value)
      const file = await Search.search(path, value)

      res.json(file)
    })
    .catch((err) => res.status(500).send(err))
})

app.get('/healthcheck', (req, res) => {
  res.send(200)
})

const server = app.listen(3001, () => {
  console.log('app listening on :3001')
})

const websocketRouter = new WebsocketRouter(server)

websocketRouter.route('/tty', (ws) => new Pty(ws).listen())
websocketRouter.route('/directory-watcher', (ws) => new DirectoryWatcher(ws).listen())

websocketRouter.init()
