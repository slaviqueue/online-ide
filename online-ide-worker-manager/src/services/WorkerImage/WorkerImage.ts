import { promises } from 'fs'
import exec from '../../utils/exec'
import { WorkerDeployPrivateKey } from '../../config'
import makeDockerfile from '../../utils/makeDockerfile'

class WorkerImage {
  private path: string
  private imageName: string

  public constructor (path: string, imageName: string) {
    this.imageName = imageName
    this.path = path
  }

  public async build (): Promise<void> {
    console.log('building', this.imageName)
    const unsubstitutedDockerfile = await promises.readFile(this.path, 'utf-8')
    const substitutedDockerfile = await makeDockerfile(unsubstitutedDockerfile)

    await exec(`echo '${substitutedDockerfile}' | docker build -t ${this.imageName}-worker-image --build-arg SSH_PRIVATE_KEY='${WorkerDeployPrivateKey}' -`)
      .then(console.log)
      .catch(console.log)
    console.log('built')
  }
}

export default WorkerImage
