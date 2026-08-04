const express = require('express')
const {getAllStockMovements,
    getOneStockMovement,
    createStockMovement,
    getStockMovementsByProduct,
    getStockMovementsByUser,
    getStockMovementsByType,
    getStockEntries,
    getStockOutputs} = require('../Controllers/movimientosStockController')

const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()

router.get(
    '/movimientos-stock',
    verifyToken,
    verifyRole('Administrador'),
    getAllStockMovements
)

router.get(
    '/movimientos-stock/:id',
    verifyToken,
    verifyRole('Administrador'),
    getOneStockMovement
)

router.post(
    '/movimientos-stock/crear',
    verifyToken,
    verifyRole('Administrador'),
    createStockMovement
)

router.get(
    '/movimientos-stock/producto/:producto_id',
    verifyToken,
    verifyRole('Administrador'),
    getStockMovementsByProduct
)

router.get(
    '/movimientos-stock/usuario/:usuario_id',
    verifyToken,
    verifyRole('Administrador'),
    getStockMovementsByUser
)

router.get(
    '/movimientos-stock/tipo/:tipo_id',
    verifyToken,
    verifyRole('Administrador'),
    getStockMovementsByType
)

router.get(
    '/movimientos-stock/entradas',
    verifyToken,
    verifyRole('Administrador'),
    getStockEntries
)

router.get(
    '/movimientos-stock/salidas',
    verifyToken,
    verifyRole('Administrador'),
    getStockOutputs
)



module.exports = router