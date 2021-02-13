import { Request, Response } from 'express'

function handle (Controller: any, methodName: string) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      await new Controller(req, res)[methodName]()
    } catch (err) {
      res.status(err.status || 500).send(err)
    }
  }
}

export default handle
