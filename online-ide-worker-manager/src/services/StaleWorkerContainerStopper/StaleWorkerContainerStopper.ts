import { map } from 'lodash'
import { getConnection } from 'typeorm'

import secondsToMilliseconds from '../../utils/secondsToMilliseconds'
import { StaleContainerWatcherIntervalInSeconds, Hostname } from '../../config'
import ProjectRepo from '../../repos/ProjectRepo'
import WorkerContainer from '../WorkerContainer/WorkerContainer'

type IntervalType = ReturnType<typeof setInterval>

class StaleWorkerContainerStopper {
  private killer: IntervalType | null = null

  public watch (): void {
    const interval = secondsToMilliseconds(StaleContainerWatcherIntervalInSeconds)

    this.killer = setInterval(() => {
      this.stopStaleContainers()
    }, interval)
  }

  private async stopStaleContainers (): Promise<void> {
    getConnection().transaction(async (entityManager) => {
      const projectRepo = entityManager.getCustomRepository(ProjectRepo)
      const staleContainerIds = await this.setStaleProjectStatusesAndReturnContainerIds(projectRepo)

      if (staleContainerIds.length) {
        await WorkerContainer.stopMany(staleContainerIds)
      }
    })
  }

  private async setStaleProjectStatusesAndReturnContainerIds (projectRepo: ProjectRepo): Promise<string[]> {
    const staleProjects = await projectRepo.getWithStaleContainers(Hostname)

    if (!staleProjects.length) {
      return []
    }

    const deactivatedProjects = staleProjects.map((project) => ({
      ...project,
      isActive: false
    }))

    await projectRepo.save(deactivatedProjects)

    const staleContainerIds = map(staleProjects, 'containerId')
    return staleContainerIds
  }

  public stop (): void {
    clearInterval(this.killer as IntervalType)
  }
}

export default StaleWorkerContainerStopper
