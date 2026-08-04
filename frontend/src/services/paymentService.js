import useApi from '../customHooks/useApi'

// Crear una preferencia de pago en Mercado Pago
export const createPayment = async () => {

    const response = await useApi.post(
        '/payment/create-order'
    )

    return response.data

}

// Obtener el pedido asociado a un pago
export const getPedidoByPayment = async (paymentId) => {

    const response = await useApi.get(
        `/payment/${paymentId}`
    )

    return response.data
}