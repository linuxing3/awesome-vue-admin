import axios from 'axios'

const axService = axios.create({
  baseURL: '/api', // api base_url
  timeout: 6000 // 请求超时时间
})

export default axService
