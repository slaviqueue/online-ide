/* eslint-disable camelcase */

import Controller from './Controller'
import UserService from '../services/UserService'
import { GithubClientSecret, GithubClientId, GithubRedirectUri, FrontendJwtAuthUri } from '../config'
import { RequestWithUser } from '../middleware/auth'

class UserController extends Controller {
  public async authenticateWithGithub (): Promise<void> {
    const user = await UserService.authenticate({
      code: this.req.query.code as string,
      client_secret: GithubClientSecret,
      client_id: GithubClientId,
      redirect_uri: GithubRedirectUri
    })

    const jwt = await UserService.makeJwt(user)

    this.res.redirect(`${FrontendJwtAuthUri}?jwt=${jwt}`)
  }

  public getMe (): void {
    this.res.json((this.req as RequestWithUser).user)
  }
}

export default UserController
