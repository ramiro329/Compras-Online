import useApi from '../customHooks/useApi'

// Obtener todos los productos activos
export const getAllProducts = async (page = 1, limit = 10) => {

    const response = await useApi.get('/productos', {
        params: {
            page,
            limit
        }
    })

    return response.data

}

// Obtener todos los productos inactivos (Admin)
export const getAllInactiveProducts = async (page = 1, limit = 10) => {

    const response = await useApi.get('/productos/inactivos', {
        params: {
            page,
            limit
        }
    })

    return response.data

}

// Obtener un producto activo
export const getProductById = async (id) => {

    const response = await useApi.get(`/producto/${id}`)

    return response.data
}

// Obtener un producto inactivo (Admin)
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
// Crear producto (Admin)
export const createProduct = async (product) => {

    const response = await useApi.post(
        '/productos/crear',
        product
    )

    return response.data
}

// Editar producto (Admin)
export const updateProduct = async (id, product) => {

    const response = await useApi.put(
        `/productos/editar/${id}`,
        product
    )

    return response.data
}

// Eliminar producto (Admin)
export const deleteProduct = async (id) => {

    const response = await useApi.delete(
        `/productos/eliminar/${id}`
    )

    return response.data
}

// Restaurar producto (Admin)
export const restoreProduct = async (id) => {

    const response = await useApi.put(
        `/productos/restaurar/${id}`
    )

    return response.data
}

// Productos sin stock (Admin)
export const getProductsWithoutStock = async () => {

    const response = await useApi.get('/productos/sin-stock')

    return response.data
}

// Productos con stock bajo (Admin)
export const getProductsLowStock = async () => {

    const response = await useApi.get('/productos/stock-bajo')

    return response.data
}

// Productos con stock normal (Admin)
export const getProductsNormalStock = async () => {

    const response = await useApi.get('/productos/stock-normal')

    return response.data
}



