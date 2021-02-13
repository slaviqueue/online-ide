/* eslint-disable node/no-deprecated-api */
import { Application, Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { createProxyServer } from 'http-proxy'
import { Server } from 'http'
import { match } from 'node-match-path'
import { parse } from 'url'

import Project from '../../entity/Project'
import auth, { RequestWithUser, getUserByToken } from '../../middleware/auth'

class WorkerProxy {
  private app: Application
  private server: Server
  private proxy: ReturnType<typeof createProxyServer>

  public constructor (app: Application, server: Server) {
    this.app = app
    this.server = server

    this.proxy = createProxyServer({ ws: true })
  }

  public start (): void {
    this.listenWebsockets()
    this.listenHttp()
  }

  private listenWebsockets (): void {
    this.server.on('upgrade', async (req, socket, head) => {
      const matchResult = match('/projects/:projectId/*', req.url)

      await Promise.resolve(match('/projects/:projectId/*', req.url))
        .then(async () => {
          if (!matchResult.matches) {
            throw new Error()
          }

          const query = parse(req.url, true).query
          const projectId = Number(matchResult.params.projectId)
          const user = await getUserByToken(String(query.token))

          return { user, projectId }
        })
        .then(async ({ user, projectId }) => {
          const ProjectRepo = getRepository(Project)
          const project = await ProjectRepo.findOneOrFail(projectId)

          await this.requireProjectOwnership(Number(user?.id), project.ownerId)
          this.patchWorkerWebsocketUrl(req)

          this.proxy.ws(req, socket, head, {
            target: `ws://localhost:${project.containerPort}`
          })
        })
        .catch(() => {
          req.destroy()
        })
    })
  }

  private listenHttp (): void {
    this.app.all('/projects/:projectId/worker/*', [auth], async (req: Request, res: Response) => {
      const ProjectRepo = getRepository(Project)

      const projectId = Number(req.params.projectId)
      const project = await ProjectRepo.findOneOrFail(projectId)

      const user = (req as RequestWithUser).user

      this.requireProjectOwnership(user.id, project.ownerId)
        .then(() => {
          this.patchWorkerRestUri(req)
          this.proxy.web(req, res, { target: `http://localhost:${project.containerPort}` }, (err) => {
            console.log(err)
          })
        })
    })
  }

  private async requireProjectOwnership (userId: number, projectOwnerId: number): Promise<void> {
    if (userId !== projectOwnerId) {
      throw new Error('User must be a project owner to access this')
    }
  }

  private patchWorkerWebsocketUrl (req: Request): void {
    req.url = req.url.replace(/\/projects\/.+?\//, '/')
  }

  private patchWorkerRestUri (req: Request): void {
    req.url = req.url.replace('/worker', '/')
  }
}

export default WorkerProxy
