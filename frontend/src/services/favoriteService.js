import useApi from '../customHooks/useApi'

export const getFavoritesByUser = async (usuario_id) => {

    const response = await useApi.get(`/favorito/${usuario_id}`)

    return response.data
}

export const addFavorite = async (favorite) => {

    const response = await useApi.post(
        '/favorito/add',
        favorite
    )

    return response.data
}

export const removeFavorite = async (usuario_id, producto_id) => {

    const response = await useApi.delete(
        `/favorito/eliminar/${usuario_id}/${producto_id}`
    )

    return response.data
}

export const isFavorite = async (usuario_id, producto_id) => {

    const response = await useApi.get(
        `/favorito/${usuario_id}/${producto_id}`
    )

    return response.data
}