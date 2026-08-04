import useApi from '../customHooks/useApi'

// Obtener el carrito de un usuario
export const getCartByUser = async (usuario_id) => {

    const response = await useApi.get(`/carrito/usuario/${usuario_id}`)

    return response.data
}

// Crear carrito
export const createCart = async (usuario_id) => {

    const response = await useApi.post('/carrito/crear', {
        usuario_id
    })

    return response.data
}

// Agregar producto al carrito
export const addProductToCart = async (data) => {
    console.log(data)

    const response = await useApi.post(
        '/carrito/agregar-producto',
        data
    )

    return response.data
}

// Actualizar cantidad de un producto
export const updateProductQuantity = async (id, cantidad) => {

    const response = await useApi.put(
        `/carrito/actualizar-cantidad/${id}`,
        { cantidad }
    )

    return response.data
}

// Eliminar un producto del carrito
export const removeProductFromCart = async (id) => {

    const response = await useApi.delete(
        `/carrito/eliminar-producto/${id}`
    )

    return response.data
}

// Vaciar carrito
export const clearCart = async (carrito_id) => {

    const response = await useApi.delete(
        `/carrito/vaciar/${carrito_id}`
    )

    return response.data
}