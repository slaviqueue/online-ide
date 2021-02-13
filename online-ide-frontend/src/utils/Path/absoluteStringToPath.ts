import { Path } from '../../models/types/Path'

function absoluteStringToPath (path: string): Path {
  const splitted = path.split('/')
  return splitted.slice(1, splitted.length)
}

export default absoluteStringToPath
