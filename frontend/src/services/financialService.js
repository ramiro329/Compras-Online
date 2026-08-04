import useApi from '../customHooks/useApi'

// Obtener todos los movimientos financieros
export const getAllFinancialMovements = async () => {

    const response = await useApi.get(
        '/movimientos-financieros'
    )

    return response.data
}

// Obtener un movimiento financiero
export const getOneFinancialMovement = async (id) => {

    const response = await useApi.get(
        `/movimientos-financieros/${id}`
    )

    return response.data
}

// Crear un movimiento financiero
export const createFinancialMovement = async (movement) => {

    const response = await useApi.post(
        '/movimientos-financieros/crear',
        movement
    )

    return response.data
}

// Obtener movimientos por usuario
export const getFinancialMovementsByUser = async (usuario_id) => {

    const response = await useApi.get(
        `/movimientos-financieros/usuario/${usuario_id}`
    )

    return response.data
}

// Obtener movimientos por tipo
export const getFinancialMovementsByType = async (tipo_id) => {

    const response = await useApi.get(
        `/movimientos-financieros/tipo/${tipo_id}`
    )

    return response.data
}

// Obtener movimiento por pedido
export const getFinancialMovementByOrder = async (pedido_id) => {

    const response = await useApi.get(
        `/movimientos-financieros/pedido/${pedido_id}`
    )

    return response.data
}

// Obtener total de ingresos
export const getTotalIncome = async () => {

    const response = await useApi.get(
        '/movimientos-financieros/ingresos/total'
    )

    return response.data
}

// Obtener total de egresos
export const getTotalExpenses = async () => {

    const response = await useApi.get(
        '/movimientos-financieros/egresos/total'
    )

    return response.data
}

// Obtener balance
export const getBalance = async () => {

    const response = await useApi.get(
        '/movimientos-financieros/balance'
    )

    return response.data
}