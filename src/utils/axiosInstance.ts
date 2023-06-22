import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './user-storage'

const baseUrl = import.meta.env.VITE_API_URL
console.log(baseUrl)

export function getJWTHeader(): string | undefined {
  const token = getToken()
  if (token) {
    return `Bearer ${token}`
  }
  return undefined
}

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
}
const instance = axios.create(config)

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getJWTHeader()
  if (token && config.headers) {
    config.headers.Authorization = token
  }
  return config
})

export function getAxiosInstance() {
  return instance
}
