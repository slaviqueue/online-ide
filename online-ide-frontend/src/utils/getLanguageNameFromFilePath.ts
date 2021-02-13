import { last } from 'lodash'
import extensions from '../resources/language-extensions.json'

const LanguageExtensions = extensions as Record<string, string>

function getLanguageNameFromFilePath (path: string): string | null {
  if (!path) {
    return null
  }

  const extensionName = last(path.split('.'))
  const extension = `.${extensionName}`
  const name = LanguageExtensions[extension]

  if (!name) {
    return extensionName || null
  }

  return name
}

export default getLanguageNameFromFilePath
