import { Request, Response, NextFunction } from 'express'

type PathParser = (path: string) => string

export type RequestWithParsedPath = Request & { parsedPath: string }

function parsePath (parser: PathParser) {
  return (req: Request, res: Response, next: NextFunction): void => {
    (req as RequestWithParsedPath).parsedPath = parser(decodeURIComponent(req.path))
    next()
  }
}

export default parsePath
