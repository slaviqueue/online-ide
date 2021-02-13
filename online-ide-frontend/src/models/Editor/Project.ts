import { makeAutoObservable, observable, action } from 'mobx'

import { Project as ProjectType } from '../types/Project'
import ProtectedApi from '../../utils/ProtectedApi'
import { WorkerManagerPort, WorkerPingIntervalInSeconds } from '../../config'
import { Nullable } from '../../utils/Nullable'
import secondsToMilliseconds from '../../utils/secondsToMilliseconds'
import projectToWorkerUrl from '../../utils/projectToWorkerUrl'

type IntervalType = ReturnType<typeof setInterval>

class Project {
  public project: Nullable<ProjectType> = null
  public isLoading: boolean = true
  public beacon: Nullable<IntervalType> = null

  constructor () {
    makeAutoObservable(this, {
      project: observable,
      loadProject: action
    })
  }

  public async loadProject (id: number): Promise<void> {
    this.reset()

    const { data: project } = await ProtectedApi.get(`/projects/${id}`)

    this.project = project
    await this.startContainer()

    this.beacon = setInterval(() => this.ping(), secondsToMilliseconds(WorkerPingIntervalInSeconds))

    this.isLoading = false
  }

  public async changeProjectName (name: string): Promise<void> {
    const { data: project } = await ProtectedApi.patch(`/projects/${this.project!.id}`, {
      name
    })

    this.project = project
  }

  public async removeProject (): Promise<void> {
    if (!this.project) {
      throw new Error('There is no project, but someone is trying to remove it')
    }

    const projectId = this.project.id
    const host = this.project.machine.host
    const containerId = this.project.containerId

    this.reset()

    await ProtectedApi.delete(`/projects/${projectId}`)
    await ProtectedApi.delete(`http://${host}:${WorkerManagerPort}/projects/container/${containerId}`)
  }

  public async startContainer (): Promise<void> {
    await ProtectedApi.post(`${this.baseContainerPath}/start`)
  }

  public async ping (): Promise<void> {
    await ProtectedApi.post(`${this.baseContainerPath}/ping`)
  }

  public reset (): void {
    this.project = null
    this.isLoading = true

    if (this.beacon) {
      clearInterval(this.beacon)
      this.beacon = null
    }
  }

  public get baseContainerPath (): string {
    return `http://${this.projectHost}/projects/${this.project!.id}/container`
  }

  public get workerPath (): string {
    return `http://${this.projectHost}/projects/${this.project!.id}/worker`
  }

  public get projectHost (): string {
    return projectToWorkerUrl(this.project!)
  }
}

export default new Project()
