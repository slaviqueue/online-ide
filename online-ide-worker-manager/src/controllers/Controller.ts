import { Request, Response } from 'express'

class Controller {
  protected req: Request
  protected res: Response

  public constructor (req: Request, res: Response) {
    this.req = req
    this.res = res
  }
}

export default Controller
