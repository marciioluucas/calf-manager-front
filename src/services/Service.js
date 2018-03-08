import axios from 'axios'
import {Api} from '../../config/api'

const client = axios.create({
  baseURL: Api.host,
  timeout: 35000
})
export default client
