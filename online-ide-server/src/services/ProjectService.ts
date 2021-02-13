import { getRepository, getCustomRepository } from 'typeorm'
import Project from '../entity/Project'
import MachineRepo from '../repos/MachineRepo'
import Machine from '../entity/Machine'
import Receipt from '../entity/Receipt'

type ProjectDetails = {
  name: string,
  language: string,
  ownerId: number
}

type ProjectUpdatePatch = {
  name: string
}

class ProjectService {
  public async createProject (details: ProjectDetails): Promise<Project> {
    const ProjectRepository = getRepository(Project)
    const MachineRepository = getCustomRepository(MachineRepo)

    const machine = await MachineRepository.getRandom() as Machine

    const project = new Project()
    project.machine = machine
    project.name = details.name
    project.language = details.language
    project.ownerId = details.ownerId

    await ProjectRepository.save(project)

    return project
  }

  public async getForUser (ownerId: number): Promise<Array<Project>> {
    const ProjectRepository = getRepository(Project)

    return ProjectRepository.find({ ownerId: ownerId })
  }

  public async getById (id: number): Promise<Project> {
    const ProjectRepository = getRepository(Project)

    return ProjectRepository.findOneOrFail(id, { relations: ['machine'] })
  }

  public async update (id: number, patch: ProjectUpdatePatch): Promise<Project> {
    const ProjectRepository = getRepository(Project)

    const project = await this.getById(id)
    Object.assign(project, patch)

    await ProjectRepository.save(project)
    return project
  }

  public async delete (id: number): Promise<void> {
    await getRepository(Project).delete(id)
  }

  public async createReceipt (projectId: number, details: Pick<Receipt, 'emoji' | 'command'>): Promise<Receipt> {
    const ReceiptRepo = getRepository(Receipt)

    const receipt = new Receipt()
    receipt.command = details.command
    receipt.emoji = details.emoji
    receipt.projectId = projectId

    await ReceiptRepo.save(receipt)

    return receipt
  }

  public async getReceipts (projectId: number): Promise<Receipt[]> {
    return getRepository(Receipt).find({ projectId })
  }

  public async deleteReceipt (receiptId: number): Promise<void> {
    await getRepository(Receipt).delete(receiptId)
  }
}

export default new ProjectService()
