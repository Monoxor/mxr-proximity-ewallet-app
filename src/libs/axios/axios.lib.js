import axios from 'axios'
import loginStore from '../../stores/Login.store'
import proximityStore from '../../stores/Proximity.store'

const axiosRestInstance = axios.create({
  baseURL:
    'https://dev.monoxor.com/data-services/crud/rsga/ewallet'
})

const proximityAxiosInstance = axios.create()
// Add a response interceptor

proximityAxiosInstance.interceptors.request.use(
  function (request) {
    proximityStore.setIsUnauthorized(false)
    const access_token = loginStore.getUserAccessToken()
    if (access_token) {
      request.headers['access_token'] = access_token,
      request.headers['auth_key'] = '2f6c42bb8dd4452ab6eb61b65b59a741',
      request.headers['Content-Type'] = 'application/json'
    }
    return request
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error)
  }
)

proximityAxiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      proximityStore.setIsUnauthorized(true)
    }
    return Promise.reject(error)
  }
)
export { axiosRestInstance, proximityAxiosInstance }
