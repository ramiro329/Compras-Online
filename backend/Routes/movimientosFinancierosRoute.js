const express = require('express')
const {getAllFinancialMovements,
    getOneFinancialMovement,
    createFinancialMovement,
    getFinancialMovementsByUser,
    getFinancialMovementsByType,
    getFinancialMovementByOrder,
    getTotalIncome,
    getTotalExpenses,
    getBalance} = require('../Controllers/movimientosFinancierosController')

const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()

router.get(
    '/movimientos-financieros',
    verifyToken,
    verifyRole('Administrador'),
    getAllFinancialMovements
)

router.get(
    '/movimientos-financieros/:id',
    verifyToken,
    verifyRole('Administrador'),
    getOneFinancialMovement
)

router.post(
    '/movimientos-financieros/crear',
    verifyToken,
    verifyRole('Administrador'),
    createFinancialMovement
)

router.get(
    '/movimientos-financieros/usuario/:usuario_id',
    verifyToken,
    verifyRole('Administrador'),
    getFinancialMovementsByUser
)

router.get(
    '/movimientos-financieros/tipo/:tipo_id',
    verifyToken,
    verifyRole('Administrador'),
    getFinancialMovementsByType
)

router.get(
    '/movimientos-financieros/pedido/:pedido_id',
    verifyToken,
    verifyRole('Administrador'),
    getFinancialMovementByOrder
)

router.get(
    '/movimientos-financieros/ingresos/total',
    verifyToken,
    verifyRole('Administrador'),
    getTotalIncome
)

router.get(
    '/movimientos-financieros/egresos/total',
    verifyToken,
    verifyRole('Administrador'),
    getTotalExpenses
)

router.get(
    '/movimientos-financieros/balance',
    verifyToken,
    verifyRole('Administrador'),
    getBalance
)




module.exports = router