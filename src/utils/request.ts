import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { fetchAccessToken } from '~/api/auth'

export const BASE_URL = '/api'

export const ALIYUN_BASE_URL = 'https://openapi.alipan.com'

let isRefreshing = false
let retryRequests: any[] = []

function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    (config) => {
      const token = ''
      if (token && config.headers.Authorization)
        config.headers.Authorization = token

      return config
    },
    error => Promise.reject(error),
  )

  service.interceptors.response.use(
    (response) => {
      const res = response.data
      return res
    },
    async (error: AxiosError<any>) => {
      const response = error.response
      const config = response?.config as AxiosRequestConfig
      if (response?.status === 401) {
        if (!isRefreshing) {
          try {
            isRefreshing = true
            // TODO: 获取refresh_token，若refresh_token失效需跳转重登录
            const res = await fetchAccessToken({
              grant_type: 'refresh_token',
              refresh_token: '',
            })
            for (let i = 0; i < retryRequests.length; i++)
              retryRequests[i](res.access_token)
            retryRequests = []
            config.headers = { ...config.headers, Authorization: res.access_token }
            return await request(config)
          }
          catch (error) {
            return Promise.reject(error)
          }
          finally {
            isRefreshing = false
          }
        }
        else {
          return new Promise((resolve) => {
            retryRequests.push((token: string) => {
              config.headers = { ...config.headers, Authorization: token }
              resolve(request(config))
            })
          })
        }
      }
      return Promise.reject(error)
    },
  )

  return service
}

export async function request<T>(config?: AxiosRequestConfig): Promise<T> {
  const defaultConfig = {
    timeout: 10000,
  } as AxiosRequestConfig
  const service = createService()
  const res = await service({ ...defaultConfig, ...config })
  return res as unknown as Promise<T>
}

export default request
