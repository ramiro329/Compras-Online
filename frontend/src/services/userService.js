import useApi from '../customHooks/useApi'

// Obtener todos los usuarios activos (Administrador)
export const getAllUsersActives = async () => {

    const response = await useApi.get('/usuarios/activos')

    return response.data
}

// Obtener todos los usuarios inactivos (Administrador)
export const getAllUsersInactives = async () => {

    const response = await useApi.get('/usuarios/inactivos')

    return response.data
}

// Obtener un usuario activo (Administrador)
export const getOneUserActive = async (id) => {

    const response = await useApi.get(`/usuario/activo/${id}`)

    return response.data
}

// Obtener un usuario inactivo (Administrador)
export const getOneUserInactive = async (id) => {

    const response = await useApi.get(`/usuario/inactivo/${id}`)

    return response.data
}

// Editar usuario
export const updateUser = async (id, user) => {

    const response = await useApi.put(
        `/usuario/editar/${id}`,
        user
    )

    return response.data
}

// Eliminar usuario (Administrador)
export const deleteUser = async (id) => {

    const response = await useApi.delete(
        `/usuario/eliminar/${id}`
    )

    return response.data
}

// Restaurar usuario (Administrador)
export const restoreUser = async (id) => {

    const response = await useApi.put(
        `/usuario/restaurar/${id}`
    )

    return response.data
}

// Buscar usuarios por nombre (Administrador)
export const searchUserByName = async (nombre) => {

    const response = await useApi.get(
        `/usuarios/buscar?nombre=${nombre}`
    )

    return response.data
}