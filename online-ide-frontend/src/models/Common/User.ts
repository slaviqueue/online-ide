import { makeAutoObservable, observable, action, computed } from 'mobx'
import ProtectedApi from '../../utils/ProtectedApi'

export type UserType = {
  id: number,
  username: string,
  email: string,
  avatarUrl: string
}

class User {
  public user: UserType | null = null
  public jwt: string | null = localStorage.getItem('jwt')
  public isLoading: boolean = true

  constructor () {
    makeAutoObservable(this, {
      user: observable,
      isLoading: observable,
      jwt: observable,
      authenticate: action,
      logout: action,
      loadUser: action
    })
  }

  @computed
  public get isAuthenticated (): boolean {
    return Boolean(this.jwt)
  }

  public authenticate (jwt: string): void {
    localStorage.setItem('jwt', jwt)
    this.jwt = jwt
    this.isLoading = false
  }

  public logout (): void {
    localStorage.removeItem('jwt')
    this.jwt = null
    this.isLoading = false
  }

  public async loadUser (): Promise<void> {
    this.isLoading = true

    const { data: user } = await ProtectedApi.get('users/me')

    this.user = user
  }
}

export default new User()
