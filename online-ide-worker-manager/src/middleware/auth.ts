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

export async function getUserByToken (token?: string): Promise<User | undefined> {
  const UserRepo = getRepository(User)
  const pureToken = token?.replace('Bearer ', '')

  if (!pureToken) {
    throw new Error()
  }

  const { userId } = verify(pureToken, Secret) as { userId: number }
  const user = await UserRepo.findOne(userId)

  return user
}

async function auth (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserByToken(req.headers.authorization)

    ;(req as RequestWithUser).user = user as User

    next()
  } catch (err) {
    sendError(res)
  }
}

export default auth
