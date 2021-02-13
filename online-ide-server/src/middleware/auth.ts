import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { Secret } from '../config'
import User from '../entity/User'

function sendError (res: Response): void {
  res.status(401).json({ error: 'Unauthorized' })
}

export type RequestWithUser = Request & {
  user: User
}

async function auth (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const UserRepo = getRepository(User)
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new Error()
    }

    const { userId } = verify(token, Secret) as { userId: number }
    const user = await UserRepo.findOne(userId)

    if (!user) {
      throw new Error()
    }

    (req as RequestWithUser).user = user as User

    next()
  } catch (err) {
    sendError(res)
  }
}

export default auth
