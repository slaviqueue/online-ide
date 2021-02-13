import { join } from 'path'
import WorkerImage from '../WorkerImage/WorkerImage'
import { LanguagesConfig } from '../types/LanguagesConfig'

class WorkerImagesBuilder {
  public async buildImages (path: string, languages: LanguagesConfig): Promise<void> {
    console.log(languages)
    for (const language of languages) {
      const dockerfilePath = join(path, language.dockerfile)
      await new WorkerImage(dockerfilePath, language.name).build()
    }
  }
}

export default WorkerImagesBuilder
