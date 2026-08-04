import useApi from '../customHooks/useApi'

// Obtener todos los movimientos de stock
export const getAllStockMovements = async () => {

    const response = await useApi.get(
        '/movimientos-stock'
    )

    return response.data
}

// Obtener un movimiento de stock
export const getOneStockMovement = async (id) => {

    const response = await useApi.get(
        `/movimientos-stock/${id}`
    )

    return response.data
}

// Crear un movimiento de stock
export const createStockMovement = async (movement) => {

    const response = await useApi.post(
        '/movimientos-stock/crear',
        movement
    )

    return response.data
}

// Obtener movimientos por producto
export const getStockMovementsByProduct = async (producto_id) => {

    const response = await useApi.get(
        `/movimientos-stock/producto/${producto_id}`
    )

    return response.data
}

// Obtener movimientos por usuario
export const getStockMovementsByUser = async (usuario_id) => {

    const response = await useApi.get(
        `/movimientos-stock/usuario/${usuario_id}`
    )

    return response.data
}

// Obtener movimientos por tipo
export const getStockMovementsByType = async (tipo_id) => {

    const response = await useApi.get(
        `/movimientos-stock/tipo/${tipo_id}`
    )

    return response.data
}

// Obtener entradas de stock
export const getStockEntries = async () => {

    const response = await useApi.get(
        '/movimientos-stock/entradas'
    )

    return response.data
}

// Obtener salidas de stock
export const getStockOutputs = async () => {

    const response = await useApi.get(
        '/movimientos-stock/salidas'
    )

    return response.data
}