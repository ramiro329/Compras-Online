import useApi from '../customHooks/useApi'

export const getAllUsersActives = async () => {

    const response = await useApi.get('/usuarios/activos')

    return response.data
}

export const getAllUsersInactives = async () => {

    const response = await useApi.get('/usuarios/inactivos')

    return response.data
}

export const getOneUserActive = async (id) => {

    const response = await useApi.get(`/usuario/activo/${id}`)

    return response.data
}

export const getOneUserInactive = async (id) => {

    const response = await useApi.get(`/usuario/inactivo/${id}`)

    return response.data
}



export const deleteUser = async (id) => {

    const response = await useApi.delete(
        `/usuario/eliminar/${id}`
    )

    return response.data
}

export const restoreUser = async (id) => {

    const response = await useApi.put(
        `/usuario/restaurar/${id}`
    )

    return response.data
}

export const searchUserByName = async (nombre) => {

    const response = await useApi.get(
        `/usuarios/buscar?nombre=${nombre}`
    )

    return response.data
}