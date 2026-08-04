const express = require('express')
const {getImagesByProduct,
    getPrincipalImage,
    createImage,
    setPrincipalImage,
    deleteImage} = require('../Controllers/imagenesController')

const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()
router.get('/imagenes/:producto_id', getImagesByProduct)
router.get('/imagenes/principal/:producto_id', getPrincipalImage)
router.post('/imagenes/add', verifyToken, verifyRole('Administrador'), createImage)
router.put('/imagenes/principal/:id', verifyToken, verifyRole('Administrador'), setPrincipalImage)
router.delete('/imagenes/eliminar/:id', verifyToken, verifyRole('Administrador'), deleteImage)




module.exports = router