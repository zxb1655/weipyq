import Fly from 'flyio/dist/npm/wx'
import httpConfig from '../config/index.config'
const http = new Fly()

http.config = {
  baseURL: httpConfig.baseUrl,
  timeout: 10000,
  parseJson: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    uni.showToast({
      title: error.response.data.msg,
      icon: 'none',
    })
  }
)
export default http
