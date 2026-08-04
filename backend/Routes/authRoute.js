const express = require('express')

const {
    register,
    login,
    verifyToken,
    
    forgotPassword,
    resetPassword
} = require('../Controllers/authController')

const router = express.Router()

router.post('/auth/register', register)

router.post('/auth/login', login)

router.get('/auth/verify', verifyToken)

router.post(
    '/auth/forgot-password',
    forgotPassword
)

router.post(
    '/auth/reset-password',
    resetPassword
)

module.exports = router