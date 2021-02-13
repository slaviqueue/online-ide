import { getRepository } from 'typeorm'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import User from '../entity/User'
import GithubAuth, { AccessTokenRequestData } from './auth/GithubAuth'
import { Secret } from '../config'

const sign = promisify(jwt.sign)

class UserService {
  public async authenticate (accessTokenRequestData: AccessTokenRequestData): Promise<User> {
    const UserRepository = getRepository(User)

    const githubUser = await GithubAuth.authenticate(accessTokenRequestData)

    const existingUser = await UserRepository.findOne({ email: githubUser.email })

    if (existingUser) {
      return existingUser
    }

    const user = new User()
    user.email = githubUser.email
    user.avatarUrl = githubUser.avatar_url
    user.username = githubUser.login

    await UserRepository.save(user)

    return user
  }

  public makeJwt (user: User): Promise<string> {
    return sign({ userId: user.id }, Secret) as Promise<string>
  }
}

export default new UserService()
