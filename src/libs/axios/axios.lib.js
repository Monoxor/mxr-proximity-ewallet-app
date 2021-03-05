import axios from 'axios'

const REST_BASE_URL =
  'https://kushal.parikh.sb.intern.monoxor.com:8080/data-services/crud/rsga/ewallet'

const GRAPHQL_URL =
  'https://kushal.parikh.sb.intern.monoxor.com:8080/data-services/graphql/rsga/ewallet'

const axiosRestInstance = axios.create()
axiosRestInstance.defaults.baseURL = REST_BASE_URL
axiosRestInstance.CancelToken = axios.CancelToken
axiosRestInstance.isCancel = axios.isCancel

const axiosGraphqlInstace = axios.create()
axiosGraphqlInstace.defaults.baseURL = GRAPHQL_URL

export { axiosRestInstance, axiosGraphqlInstace }
