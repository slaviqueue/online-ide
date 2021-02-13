import cp from 'child_process'
import { promisify } from 'util'

const exec = promisify(cp.exec)

export default exec
