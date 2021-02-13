import { Path } from '../../models/types/Path'

function pathToString (path: Path): string {
  return path.join('/')
}

export default pathToString
