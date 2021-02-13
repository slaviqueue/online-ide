import { makeAutoObservable, computed } from 'mobx'
import Project from './Project'
import { pathToString, absoluteStringToPath } from '../../utils/Path/Path'
import ProtectedApi from '../../utils/ProtectedApi'

type SearchResults = Record<string, string[]>

class Search {
  public searchResults: SearchResults = {}
  private searchQuery: string = ''

  constructor () {
    makeAutoObservable(this, {})
  }

  @computed public get query () {
    return this.searchQuery
  }

  public setSearchQuery (value: string): void {
    this.searchQuery = value
  }

  public async search (): Promise<void> {
    if (this.searchQuery === '') {
      this.searchResults = {}
      return
    }

    const path = pathToString(absoluteStringToPath('/home/slaventy/dev/things/polite'))
    const { data: result } = await ProtectedApi.get(`${Project.workerPath}/search/${path}/${name}?value=${encodeURIComponent(this.searchQuery)}`)

    this.searchResults = result
  }

  public reset (): void {
    this.searchResults = {}
    this.searchQuery = ''
  }
}

export default new Search()
