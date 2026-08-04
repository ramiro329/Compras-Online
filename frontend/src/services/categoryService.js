import useApi from '../customHooks/useApi'

// Obtener todas las categorías activas
export const getAllCategories = async () => {

    const response = await useApi.get('/categorias/activas')

    return response.data
}

// Obtener todas las categorías inactivas (Admin)
export const getAllInactiveCategories = async () => {

    const response = await useApi.get('/categorias/inactivas')

    return response.data
}

// Obtener una categoría activa
export const getCategoryById = async (id) => {

    const response = await useApi.get(`/categoria/activa/${id}`)

    return response.data
}

// Obtener una categoría inactiva (Admin)
export const getInactiveCategoryById = async (id) => {

    const response = await useApi.get(`/categoria/inactiva/${id}`)

    return response.data
}

// Crear categoría (Admin)
export const createCategory = async (category) => {

    const response = await useApi.post(
        '/categorias/crear',
        category
    )

    return response.data
}

// Editar categoría (Admin)
export const updateCategory = async (id, category) => {

    const response = await useApi.put(
        `/categorias/editar/${id}`,
        category
    )

    return response.data
}

// Eliminar categoría (Admin)
export const deleteCategory = async (id) => {

    const response = await useApi.delete(
        `/categorias/eliminar/${id}`
    )

    return response.data
}

// Restaurar categoría (Admin)
export const restoreCategory = async (id) => {

    const response = await useApi.put(
        `/categorias/restaurar/${id}`
    )

    return response.data
}

// Buscar categoría por nombre
export const searchCategoryByName = async (nombre) => {

    const response = await useApi.get('/categorias/buscar', {
        params: { nombre }
    })

    return response.data
}