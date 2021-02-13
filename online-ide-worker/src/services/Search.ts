import exec from '../utils/exec'

type SearchResults = Record<string, string[]>

function parseSearchResults (results: string): SearchResults {
  const result: SearchResults = {}
  const lines = results.split('\n')

  for (const line of lines) {
    const indexOfDivider = line.indexOf(':')
    const path = line.substring(0, indexOfDivider)
    const value = line.substring(indexOfDivider + 1)

    if (result[path]) {
      result[path].push(value)
    } else {
      result[path] = [value]
    }
  }

  return result
}

// TODO improve security; interpolating unescaped users input to bash is not really ok
async function search (path: string, value: string): Promise<SearchResults> {
  const { stdout, stderr } = await exec(`find "${path}" -type f -print | xargs grep "${value}" || true`)

  if (stderr) {
    throw new Error(stderr)
  }

  const trimmedOutput = stdout.trim()

  if (!trimmedOutput) {
    return {}
  }

  const result = parseSearchResults(trimmedOutput)

  return result
}

export default { search }
