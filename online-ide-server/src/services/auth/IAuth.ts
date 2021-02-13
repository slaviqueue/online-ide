export interface IAuth {
  authenticate (data: unknown): Promise<unknown>
}
