import { getCustomRepository, getRepository } from 'typeorm'

import Controller from './Controller'
import WorkerContainer from '../services/WorkerContainer/WorkerContainer'
import { Language } from '../services/types/Language'
import ProjectRepo from '../repos/ProjectRepo'
import Project from '../entity/Project'

class ContainerController extends Controller {
  public async create (): Promise<void> {
    const CustomProjectRepo = getCustomRepository(ProjectRepo)

    const project = await CustomProjectRepo.getForContainerCreation(Number(this.req.params.id)) as Project
    const minPort = await CustomProjectRepo.getMaxBindedPortForMachine(project.machine.host)

    const container = await WorkerContainer.create(project.language as Language, minPort)

    project.containerId = container.getId()
    project.containerPort = await container.getPort()

    await CustomProjectRepo.save(project)

    this.res.send(project)
  }

  public async delete (): Promise<void> {
    const container = new WorkerContainer(this.req.params.containerId)

    await container.stop()
    await container.remove()

    this.res.status(200).send()
  }

  public async startContainer (): Promise<void> {
    const container = await WorkerContainer.make(Number(this.req.params.id))
    await container.start()

    this.res.status(200).send()
  }

  public async stopContainer (): Promise<void> {
    const container = await WorkerContainer.make(Number(this.req.params.id))
    await container.stop()

    this.res.status(200).send()
  }

  public async pingContainer (): Promise<void> {
    const ProjectRepo = getRepository(Project)

    const project = await ProjectRepo.findOneOrFail(this.req.params.id)
    project.lastVisited = new Date()

    await ProjectRepo.save(project)

    this.res.json(project)
  }
}

export default ContainerController
