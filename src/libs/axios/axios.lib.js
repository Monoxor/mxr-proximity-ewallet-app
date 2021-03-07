import axios from 'axios'
import loginStore from '../../stores/Login.store'
import proximityStore from '../../stores/Proximity.store'

const REST_BASE_URL =
  'https://kushal.parikh.sb.intern.monoxor.com:8080/data-services/crud/rsga/ewallet'

const axiosRestInstance = axios.create()
axiosRestInstance.defaults.baseURL = REST_BASE_URL
axiosRestInstance.CancelToken = axios.CancelToken
axiosRestInstance.isCancel = axios.isCancel

// Add a response interceptor
axiosRestInstance.interceptors.request.use(
  function (request) {
    const access_token = loginStore.getUserAccessToken()
    if (access_token) {
      request.headers['access_token'] = access_token
    }
    return request
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error)
  }
)

axiosRestInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.status === 401) {
      proximityStore.setIsUnauthorized(true)
    }
    return Promise.reject(error)
  }
)

export { axiosRestInstance }
