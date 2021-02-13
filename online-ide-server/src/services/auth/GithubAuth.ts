/* eslint-disable camelcase */
import Axios from 'axios'
import FormData from 'form-data'

import { IAuth } from './IAuth'
import { URLSearchParams } from 'url'

export type AccessTokenRequestData = {
  client_id: string,
  redirect_uri?: string,
  client_secret: string,
  code: string
}

type GithubUser = {
  email: string,
  login: string,
  avatar_url: string,
}

type GithubApiCredentials = {
  access_token: string,
  scope: string,
  token_type: string
}

class GithubAuth implements IAuth {
  public async authenticate (accessTokenRequestData: AccessTokenRequestData): Promise<GithubUser> {
    const apiCredentials = await this.requestAccessToken(accessTokenRequestData)
    const githubUser = await this.requestGithubUser(apiCredentials)

    return githubUser
  }

  private async requestAccessToken (accessTokenRequestData: AccessTokenRequestData): Promise<GithubApiCredentials> {
    const form = new FormData()

    form.append('client_id', accessTokenRequestData.client_id)
    form.append('client_secret', accessTokenRequestData.client_secret)
    form.append('code', accessTokenRequestData.code)
    form.append('redirect_uri', accessTokenRequestData.redirect_uri)

    const { data: paramsString } = await Axios.post('https://github.com/login/oauth/access_token', form, {
      headers: form.getHeaders()
    })

    const params = new URLSearchParams(paramsString)

    const apiCredentials = {
      access_token: params.get('access_token') as string,
      scope: params.get('scope') as string,
      token_type: params.get('token_type') as string
    }

    return apiCredentials
  }

  private async requestGithubUser (apiCredentials: GithubApiCredentials): Promise<GithubUser> {
    const { access_token, scope, token_type } = apiCredentials
    const { data: githubUser } = await Axios.get(
      `https://api.github.com/user?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    return githubUser
  }
}

export default new GithubAuth()
