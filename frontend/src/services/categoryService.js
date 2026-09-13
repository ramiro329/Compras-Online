import useApi from '../customHooks/useApi'

export const getAllCategories = async () => {

    const response = await useApi.get('/categorias/activas')

    return response.data
}

export const getAllInactiveCategories = async () => {

    const response = await useApi.get('/categorias/inactivas')

    return response.data
}

export const getCategoryById = async (id) => {

    const response = await useApi.get(`/categoria/activa/${id}`)

    return response.data
}

export const getInactiveCategoryById = async (id) => {

    const response = await useApi.get(`/categoria/inactiva/${id}`)

    return response.data
}

export const createCategory = async (category) => {

    const response = await useApi.post(
        '/categorias/crear',
        category
    )

    return response.data
}

export const updateCategory = async (id, category) => {

    const response = await useApi.put(
        `/categorias/editar/${id}`,
        category
    )

    return response.data
}

export const deleteCategory = async (id) => {

    const response = await useApi.delete(
        `/categorias/eliminar/${id}`
    )

    return response.data
}

export const restoreCategory = async (id) => {

    const response = await useApi.put(
        `/categorias/restaurar/${id}`
    )

    return response.data
}

export const searchCategoryByName = async (nombre) => {

    const response = await useApi.get('/categorias/buscar', {
        params: { nombre }
    })

    return response.data
}