import { makeAutoObservable, observable, action } from 'mobx'
import ProtectedApi from '../../utils/ProtectedApi'
import { Project } from '../types/Project'
import { WorkerManagerPort } from '../../config'

export type NewProject = Pick<Project, 'name' | 'language'>

class Main {
  public projects: Array<Project> = []

  constructor () {
    makeAutoObservable(this, {
      projects: observable,
      loadProjects: action
    })
  }

  public async loadProjects (): Promise<void> {
    const { data } = await ProtectedApi.get('projects')
    this.projects = data
  }

  public async createProject (newProject: NewProject): Promise<Project> {
    const { data } = await ProtectedApi.post('projects', newProject)
    const projectMachineHost = data.machine.host
    const projectId = data.id

    const { data: project } = await ProtectedApi.post(`http://${projectMachineHost}:${WorkerManagerPort}/projects/${projectId}/container`)

    return project
  }
}

export default new Main()
