function getPathFromUrl (url: string, subroute: string = ''): string {
  return url.replace(new RegExp(`/projects/.*?/${subroute}`), '')
}

function makePathParser (subroute: string) {
  return (url: string): string => {
    return getPathFromUrl(url, subroute)
  }
}

export { getPathFromUrl, makePathParser }
