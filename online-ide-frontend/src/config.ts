export const GithubClientId: string = process.env.REACT_APP_GITHUB_CLIENT_ID as string
export const GithubRedirectUri: string = process.env.REACT_APP_GITHUB_REDIRECT_URI as string
export const MainBackendUrl: string = process.env.REACT_APP_MAIN_BACKEND_URL as string
export const WorkerManagerPort: string = process.env.REACT_APP_WORKER_MANAGER_PORT as string
export const WorkerPingIntervalInSeconds: number = Number(process.env.REACT_APP_WORKER_PING_INTERVAL_IN_SECONDS || 10)
