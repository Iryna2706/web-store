import {$host, $authHost} from "./index";


export const createType = async (type) => {
    // backend expects { name }
    const {data} = await $authHost.post('api/type', { name: type })
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', { name: brand })
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createProduct = async (productData) => {
    const {data} = await $authHost.post('api/product', productData)
    return data
}

export const fetchProducts = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/product', { params: { typeId, brandId, page, limit } })
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`)
    return data
}

export const deleteType = async (id) => {
    const response = await $authHost.delete(`api/type/${id}`)
    return response
}

export const deleteBrand = async (id) => {
    const response = await $authHost.delete(`api/brand/${id}`)
    return response
}

export const deleteProduct = async (id) => {
    const response = await $authHost.delete(`api/product/${id}`)
    return response
}

