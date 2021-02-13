import { pick } from 'lodash'
import ProjectService from '../services/ProjectService'
import Controller from './Controller'
import { RequestWithUser } from '../middleware/auth'

class ProjectController extends Controller {
  public async create (): Promise<void> {
    const details = {
      name: this.req.body.name,
      language: this.req.body.language,
      ownerId: (this.req as RequestWithUser).user.id
    }

    const project = await ProjectService.createProject(details)

    this.res.json(project)
  }

  public async get (): Promise<void> {
    const { user } = (this.req as RequestWithUser)

    const projects = await ProjectService.getForUser(user.id)

    this.res.json(projects)
  }

  public async getById (): Promise<void> {
    const project = await ProjectService.getById(Number(this.req.params.id))

    this.res.json(project)
  }

  public async update (): Promise<void> {
    const projectPatch = pick(this.req.body, 'name')
    const updatedProject = await ProjectService.update(Number(this.req.params.id), projectPatch)

    this.res.json(updatedProject)
  }

  public async delete (): Promise<void> {
    await ProjectService.delete(Number(this.req.params.id))

    this.res.status(200).send()
  }

  public async getReceipts (): Promise<void> {
    const receipts = await ProjectService.getReceipts(Number(this.req.params.projectId))

    this.res.json(receipts)
  }

  public async createReceipt (): Promise<void> {
    const projectId = Number(this.req.params.projectId)
    const details = {
      emoji: this.req.body.emoji,
      command: this.req.body.command
    }

    const receipt = await ProjectService.createReceipt(projectId, details)

    this.res.json(receipt)
  }

  public async deleteReceipt (): Promise<void> {
    const receiptId = Number(this.req.params.receiptId)

    await ProjectService.deleteReceipt(receiptId)

    this.res.status(200).send()
  }
}

export default ProjectController
