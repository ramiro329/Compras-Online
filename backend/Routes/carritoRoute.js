const express = require('express')
const {getCartByUser, createCart, addProductToCart, updateProductQuantity, removeProductFromCart, clearCart} = require('../Controllers/carritoController')

const router = express.Router()

router.get('/carrito/usuario/:usuario_id', getCartByUser)
router.post('/carrito/crear', createCart)
router.post('/carrito/agregar-producto', addProductToCart)
router.put('/carrito/actualizar-cantidad/:id', updateProductQuantity)

router.delete('/carrito/eliminar-producto/:id', removeProductFromCart)

router.delete('/carrito/vaciar/:carrito_id', clearCart)


module.exports = router