import axios from 'axios'
import {Api} from '../../config/api'

const client = axios.create({
    baseURL: Api.host,
    headers: localStorage.getItem('token') !== null
        ? {Authorization: localStorage.getItem('token')}
        : {},
    timeout: 35000
})
export default client
