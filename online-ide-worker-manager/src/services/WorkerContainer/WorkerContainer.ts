import { getRepository } from 'typeorm'

import Project from '../../entity/Project'
import Container from '../Container/Container'
import Healthchecker from '../Healthchecker/Healthchecker'

class WorkerContainer extends Container {
  private static readonly MaxHealcheckAttempts = 10
  private static readonly HealthcheckIntervalInMillis = 1000

  public static async make (projectId: number): Promise<WorkerContainer> {
    const ProjectRepo = getRepository(Project)
    const project = await ProjectRepo.findOneOrFail(projectId)

    return new WorkerContainer(project.containerId)
  }

  private getHealthcheckUrl (port: number): string {
    return `http://localhost:${port}/healthcheck`
  }

  public async start (): Promise<void> {
    const ProjectRepo = getRepository(Project)

    const project = await ProjectRepo.findOneOrFail({ containerId: this.id })
    project.isActive = true

    await ProjectRepo.save(project)

    await super.start()

    await new Healthchecker(
      this.getHealthcheckUrl(project.containerPort),
      WorkerContainer.MaxHealcheckAttempts,
      WorkerContainer.HealthcheckIntervalInMillis
    ).waitForResponse()
  }

  public async ping (): Promise<void> {
    const ProjectRepo = getRepository(Project)

    const project = await ProjectRepo.findOneOrFail({ containerId: this.id })
    project.lastVisited = new Date()

    await ProjectRepo.save(project)
  }
}

export default WorkerContainer
