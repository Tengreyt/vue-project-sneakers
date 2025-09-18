import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://997ffc736e7023e4.mokky.dev',
  timeout: 10000
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export default http

