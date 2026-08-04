import { create } from 'zustand'

import {
    getCartByUser,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    clearCart
} from '../services/cartService'

const useCartStore = create((set, get) => ({

    carrito: null,

    productos: [],

    cargarCarrito: async (usuario_id) => {

        try {

            const response = await getCartByUser(usuario_id)

            set({
                carrito: response.carrito,
                productos: response.productos
            })

        } catch (error) {

            console.error(error)

        }

    },

    agregarProducto: async (usuario_id, data) => {

        try {

            await addProductToCart(data)

            await get().cargarCarrito(usuario_id)

        } catch (error) {

            console.error(error)

        }

    },

    actualizarCantidad: async (usuario_id, id, cantidad) => {

        try {

            await updateProductQuantity(id, cantidad)

            await get().cargarCarrito(usuario_id)

        } catch (error) {

            console.error(error)

        }

    },

    eliminarProducto: async (usuario_id, id) => {

        try {

            await removeProductFromCart(id)

            await get().cargarCarrito(usuario_id)

        } catch (error) {

            console.error(error)

        }

    },

    vaciarCarrito: async (usuario_id, carrito_id) => {

        try {

            await clearCart(carrito_id)

            set({
                productos: []
            })

            await get().cargarCarrito(usuario_id)

        } catch (error) {

            console.error(error)

        }

    }

}))

export default useCartStore