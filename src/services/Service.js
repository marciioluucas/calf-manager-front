import axios from 'axios'
import {Api} from '../../config/api'

const client = axios.create({
    baseURL: Api.host,
    headers: localStorage.getItem('token') !== null
        ? {Authorization: localStorage.getItem('token')}
        : {},
    timeout: 35000
})
client.interceptors.request.use(async config =>{
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `${token}`
    }
    return config
})
export default client
