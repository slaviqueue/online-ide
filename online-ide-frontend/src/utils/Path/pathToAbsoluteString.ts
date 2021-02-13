import { Path } from '../../models/types/Path'

function pathToAbsoluteString (path: Path): string {
  return ['', ...path].join('/')
}

export default pathToAbsoluteString
