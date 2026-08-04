const express = require('express')
const {getAllOrders,
    getOneOrder,
    createOrder,
    updateOrderStatus,
    getOrdersByUser,
    getOrdersByStatus} = require('../Controllers/pedidosController')

const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()

router.get(
    '/pedidos',
    verifyToken,
    verifyRole('Administrador'),
    getAllOrders
)


router.get(
    '/pedido/:id',
    verifyToken,
    getOneOrder
)


router.post(
    '/pedido/crear',
    verifyToken,
    createOrder
)


router.put(
    '/pedido/actualizar-estado/:id',
    verifyToken,
    verifyRole('Administrador'),
    updateOrderStatus
)


router.get(
    '/pedidos/usuario/:usuario_id',
    verifyToken,
    getOrdersByUser
)


router.get(
    '/pedidos/estado/:estado_id',
    verifyToken,
    verifyRole('Administrador'),
    getOrdersByStatus
)



module.exports = router