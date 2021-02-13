import { Repository, EntityRepository } from 'typeorm'
import Project from '../entity/Project'
import { StaleContainerWatcherIntervalInSeconds } from '../config'
import secondsToMilliseconds from '../utils/secondsToMilliseconds'

@EntityRepository(Project)
class ProjectRepo extends Repository<Project> {
  public async getForContainerCreation (id: number): Promise<Project> {
    return this.findOneOrFail(id, {
      relations: ['machine'],
      where: { containerPort: null, containerId: null }
    })
  }

  public async getMaxBindedPortForMachine (host: string): Promise<number> {
    return this.createQueryBuilder('project')
      .select('MAX("containerPort")', 'minPort')
      .leftJoin('project.machine', 'machine')
      .where('machine.host = :projectHost', { projectHost: host })
      .getRawOne()
      .then(({ minPort }) => minPort)
  }

  public async getWithStaleContainers (host: string): Promise<Array<Project>> {
    const checkIntervalInMillis = secondsToMilliseconds(StaleContainerWatcherIntervalInSeconds)
    const bottomDateBoundary = new Date(Date.now() - checkIntervalInMillis)

    return this.createQueryBuilder('project')
      .leftJoinAndSelect('project.machine', 'machine')
      .where({ isActive: true })
      .andWhere('machine.host = :host', { host })
      .andWhere('project.lastVisited < :bottomDateBoundary', { bottomDateBoundary })
      .getMany()
  }
}

export default ProjectRepo
