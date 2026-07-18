import {$host, $authHost} from "./index";
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return data
}


export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    return jwtDecode(data.token)
}

export const getAllUsers = async () => {
    const response = await $authHost.get('api/user/all')
    return response
}

export const deleteUser = async (id) => {
    const response = await $authHost.delete(`api/user/${id}`)
    return response
}