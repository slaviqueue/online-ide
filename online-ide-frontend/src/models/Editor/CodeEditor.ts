import { makeAutoObservable, observable, action } from 'mobx'
import { pathToString } from '../../utils/Path/Path'
import { Path } from '../types/Path'
import projectToWorkerUrl from '../../utils/projectToWorkerUrl'
import Project from './Project'
import { Project as ProjectType } from '../types/Project'
import ProtectedApi from '../../utils/ProtectedApi'

class CodeEditor {
  public code: string = ''
  public currentFilePath: string | null = null
  public currentFileName: string | null = null
  public wasFileModified: boolean = false

  constructor () {
    makeAutoObservable(this, {
      code: observable,
      currentFileName: observable,
      currentFilePath: observable,
      wasFileModified: observable,
      setCode: action,
      saveCurrentFile: action
    })
  }

  public async openFile (path: Path, name: string) {
    const joinedPath = pathToString(path)

    const { data } = await ProtectedApi.get(`http://${this.projectWorkerUrl}/projects/${Project.project?.id}/worker/file/content/${joinedPath}/${name}`, {
      transformResponse: (res) => res
    })

    action(() => {
      this.code = data
      this.currentFilePath = joinedPath
      this.currentFileName = name
      this.wasFileModified = false
    })()
  }

  public async saveCurrentFile (): Promise<void> {
    if (!this.currentFileName) {
      return
    }

    await ProtectedApi.put(`http://${this.projectWorkerUrl}/projects/${Project.project?.id}/worker/file/content/${this.currentFilePath}/${this.currentFileName}`, {
      data: this.code
    })

    action(() => {
      this.wasFileModified = false
    })()
  }

  public setCode (code: string): void {
    this.code = code
    this.wasFileModified = true
  }

  public isOpened (path: Path, name: string): boolean {
    return this.currentFilePath === pathToString(path) && this.currentFileName === name
  }

  public reset (): void {
    this.code = ''
    this.currentFilePath = null
    this.currentFileName = null
    this.wasFileModified = false
  }

  private get projectWorkerUrl () {
    return projectToWorkerUrl(Project.project as ProjectType)
  }
}

export default new CodeEditor()
