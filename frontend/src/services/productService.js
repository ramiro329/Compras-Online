import useApi from '../customHooks/useApi'

export const getAllProducts = async (page = 1, limit = 12) => {

    const response = await useApi.get('/productos', {
        params: {
            page,
            limit
        }
    })

    return response.data

}

export const getAllInactiveProducts = async (page = 1, limit = 12) => {

    const response = await useApi.get('/productos/inactivos', {
        params: {
            page,
            limit
        }
    })

    return response.data

}

export const getProductById = async (id) => {

    const response = await useApi.get(`/producto/${id}`)

    return response.data
}

export const getInactiveProductById = async (id) => {

    const response = await useApi.get(`/producto/inactivo/${id}`)

    return response.data
}

export const searchProducts = async (nombre, pagina, limite) => {

    const response = await useApi.get('/productos/buscar', {
        params: {
            nombre,
            page: pagina,
            limit: limite
        }
    })

    return response.data
}



export const getProductsByCategory = async (categoria_id, pagina, limite) => {

    const response = await useApi.get('/productos/categoria', {
        params: {
            categoria_id,
            page: pagina,
            limit: limite
        }
    })

    return response.data
}
export const createProduct = async (product) => {

    const response = await useApi.post(
        '/productos/crear',
        product
    )

    return response.data
}

export const updateProduct = async (id, product) => {

    const response = await useApi.put(
        `/productos/editar/${id}`,
        product
    )

    return response.data
}

export const deleteProduct = async (id) => {

    const response = await useApi.delete(
        `/productos/eliminar/${id}`
    )

    return response.data
}

export const restoreProduct = async (id) => {

    const response = await useApi.put(
        `/productos/restaurar/${id}`
    )

    return response.data
}

export const getProductsWithoutStock = async () => {

    const response = await useApi.get('/productos/sin-stock')

    return response.data
}

export const getProductsLowStock = async () => {

    const response = await useApi.get('/productos/stock-bajo')

    return response.data
}

export const getProductsNormalStock = async () => {

    const response = await useApi.get('/productos/stock-normal')

    return response.data
}



