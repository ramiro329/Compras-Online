const {Router} = require('express')
const router = Router()
const {createOrder, receiveWebhook, getPedidoByPayment} = require('../Controllers/paymentController')
const verifyToken = require('../Middlewares/verifyToken')

router.post(
    '/payment/create-order',
    verifyToken,
    createOrder
)
router.post('/payment/webhook', receiveWebhook)
router.get('/payment/:paymentId', getPedidoByPayment)
module.exports = router 