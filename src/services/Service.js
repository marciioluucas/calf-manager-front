import axios from 'axios'
import {Api} from '../../config/api'

const client = axios.create({
  baseURL: Api.host,
  timeout: 1000
})
export default client
