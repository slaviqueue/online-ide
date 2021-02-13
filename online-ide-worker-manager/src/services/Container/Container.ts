import { getPortPromise } from 'portfinder'
import { Language } from '../types/Language'
import exec from '../../utils/exec'
import { WorkerExposedPort } from '../../config'

class Container {
  protected id: string

  public constructor (id: string) {
    this.id = id
  }

  public static async create (language: Language, minPort: number): Promise<Container> {
    const port = await getPortPromise({ port: minPort + 1 })

    const { stdout } = await exec(`docker create -p ${port}:3001 ${language}-worker-image`)
    const containerId = (stdout as string).replace('\n', '')

    return new Container(containerId)
  }

  public static async stopMany (ids: Array<string>): Promise<void> {
    await exec(`docker stop ${ids.join(' ')}`)
  }

  public getId (): string {
    return this.id
  }

  public async getPort (): Promise<number> {
    const { stdout } = await exec(`docker inspect -f '{{json (index (index (index .HostConfig.PortBindings "${WorkerExposedPort}/tcp") 0) "HostPort")}}' ${this.id}`)

    return Number(JSON.parse(stdout))
  }

  public async start (): Promise<void> {
    await exec(`docker start ${this.id}`)
  }

  public async stop (): Promise<void> {
    await exec(`docker stop ${this.id}`)
  }

  public async kill (): Promise<void> {
    await exec(`docker kill ${this.id}`)
  }

  public async remove (): Promise<void> {
    await exec(`docker rm ${this.id}`)
  }
}

export default Container
