import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/` : 'http://localhost:3000/'

const $host = axios.create({
    baseURL: API_BASE
})

const $authHost = axios.create({
    baseURL: API_BASE
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}

export { API_BASE }