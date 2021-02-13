import Axios from 'axios'
import { MainBackendUrl } from '../config'

const defaultOptions = {
  baseURL: MainBackendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
}

const ProtectedApi = Axios.create(defaultOptions)

ProtectedApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwt')
  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
})

export default ProtectedApi
