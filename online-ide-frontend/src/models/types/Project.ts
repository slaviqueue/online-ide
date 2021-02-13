export type Project = {
  id: number,
  name: string,
  language: string,
  containerPort?: number,
  containerId?: string,
  machineId: number,
  machine: {
    id: number,
    host: string
  }
}
