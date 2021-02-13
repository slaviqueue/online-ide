import { makeAutoObservable, action, observable } from 'mobx'
import ProtectedApi from '../../utils/ProtectedApi'
import Project from './Project'
import { Receipt } from '../types/Receipt'

class Receipts {
  private receipts: Receipt[] = []

  constructor () {
    makeAutoObservable<Receipts, 'receipts'>(this, {
      loadReceipts: action,
      receipts: observable
    })
  }

  public getReceipts (): Receipt[] {
    return this.receipts
  }

  public async loadReceipts (): Promise<void> {
    const projectId = Project.project!.id
    const { data: receipts } = await ProtectedApi.get(`projects/${projectId}/receipts`)

    this.receipts = receipts
  }

  public async makeReceipt (emoji: string, command: string): Promise<void> {
    const projectId = Project.project!.id

    await ProtectedApi.post(`projects/${projectId}/receipts`, { emoji, command })
    await this.loadReceipts()
  }

  public async deleteReceipt (receiptId: number): Promise<void> {
    await ProtectedApi.delete(`projects/receipts/${receiptId}`)
    await this.loadReceipts()
  }
}

export default new Receipts()
