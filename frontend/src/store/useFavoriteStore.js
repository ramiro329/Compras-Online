import { create } from 'zustand'

import {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
} from '../services/favoriteService'


const useFavoriteStore = create((set, get) => ({

    favoritos: [],


    cargarFavoritos: async (usuario_id) => {

        try {

            const response = await getFavoritesByUser(usuario_id)

            set({
                favoritos: response
            })

        } catch (error) {

            console.error(error)

        }

    },


    agregarFavorito: async (usuario_id, producto_id) => {

        try {

            await addFavorite({
                usuario_id,
                producto_id
            })


            await get().cargarFavoritos(usuario_id)


        } catch (error) {

            console.error(error)

        }

    },


    eliminarFavorito: async (usuario_id, producto_id) => {

        try {

            await removeFavorite(
                usuario_id,
                producto_id
            )


            await get().cargarFavoritos(usuario_id)


        } catch (error) {

            console.error(error)

        }

    },


    esFavorito: (producto_id) => {

        const favoritos = get().favoritos

        return favoritos.some(
            producto => producto.id === producto_id
        )

    }

}))


export default useFavoriteStore