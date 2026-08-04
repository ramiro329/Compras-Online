import useApi from '../customHooks/useApi'

// Obtener todos los pedidos (Administrador)
export const getAllOrders = async () => {

    const response = await useApi.get('/pedidos')

    return response.data
}

// Obtener un pedido por ID
export const getOneOrder = async (id) => {

    const response = await useApi.get(`/pedido/${id}`)

    return response.data
}

// Crear un pedido
export const createOrder = async (order) => {

    const response = await useApi.post(
        '/pedido/crear',
        order
    )

    return response.data
}

// Actualizar estado del pedido (Administrador)
export const updateOrderStatus = async (id, estado_id) => {

    const response = await useApi.put(
        `/pedido/actualizar-estado/${id}`,
        { estado_id }
    )

    return response.data
}

// Obtener pedidos de un usuario
export const getOrdersByUser = async (usuario_id) => {

    const response = await useApi.get(
        `/pedidos/usuario/${usuario_id}`
    )

    return response.data
}

// Obtener pedidos por estado (Administrador)
export const getOrdersByStatus = async (estado_id) => {

    const response = await useApi.get(
        `/pedidos/estado/${estado_id}`
    )

    return response.data
}