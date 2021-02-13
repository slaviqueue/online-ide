import { Project } from '../models/types/Project'
import { WorkerManagerPort } from '../config'

function projectToWorkerUrl (project: Project) {
  const { machine: { host } } = project
  const hostWithoutProtocol = host.replace(/((http|https):\/\/)/, '')

  return `${hostWithoutProtocol}:${WorkerManagerPort}`
}

export default projectToWorkerUrl
