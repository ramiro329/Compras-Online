import useApi from '../customHooks/useApi'

export const getAllOrders = async (pagina = 1, limite = 10) => {

    const response = await useApi.get('/pedidos', {
        params: {
            page: pagina,
            limit: limite
        }
    })

    return response.data
}

export const getOneOrder = async (id) => {

    const response = await useApi.get(`/pedido/${id}`)

    return response.data
}

export const createOrder = async (order) => {

    const response = await useApi.post(
        '/pedido/crear',
        order
    )

    return response.data
}

export const updateOrderStatus = async (id, estado_id) => {

    const response = await useApi.put(
        `/pedido/actualizar-estado/${id}`,
        { estado_id }
    )

    return response.data
}

export const getOrdersByUser = async (usuario_id) => {

    const response = await useApi.get(
        `/pedidos/usuario/${usuario_id}`
    )

    return response.data
}

export const getOrdersByStatus = async (estado_id) => {

    const response = await useApi.get(
        `/pedidos/estado/${estado_id}`
    )

    return response.data
}