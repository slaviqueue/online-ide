import Axios from 'axios'
import HealthcheckTimeoutError from './HealthcheckTimeoutError'
import wait from '../../utils/wait'

class Healthchecker {
  private readonly url: string
  private readonly maxAttempts: number
  private readonly interval: number

  public constructor (url: string, maxAttempts: number, interval: number) {
    this.url = url
    this.maxAttempts = maxAttempts
    this.interval = interval
  }

  public async waitForResponse (): Promise<void> {
    for (let i = 0; i < this.maxAttempts; i++) {
      try {
        await Axios.get(this.url)
        return
      } catch {}

      await wait(this.interval)
    }

    throw new HealthcheckTimeoutError()
  }
}

export default Healthchecker
