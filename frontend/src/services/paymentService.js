import useApi from '../customHooks/useApi'

export const createPayment = async () => {

    const response = await useApi.post(
        '/payment/create-order'
    )

    return response.data

}

export const getPedidoByPayment = async (paymentId) => {

    const response = await useApi.get(
        `/payment/${paymentId}`
    )

    return response.data
}