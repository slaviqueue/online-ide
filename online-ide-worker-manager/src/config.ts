export const Secret: string = process.env.SECRET as string
export const WorkerDeployPrivateKey: string = process.env.WORKER_REPO_DEPLOY_PRIVATE_KEY as string
export const StaleContainerWatcherIntervalInSeconds: number = Number(process.env.STALE_CONTAINER_WATCHER_INTERVAL_IN_SECONDS as string)
export const Hostname: string = process.env.HOSTNAME as string
export const WorkerExposedPort: number = Number(process.env.WORKER_EXPOSED_PORT)
