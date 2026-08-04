const express = require('express')
const {getAllProductsActives, getAllProductsInactives, getOneProductActive, getOneProductInactive, deleteProducts, updateProducts, createProducts, restoreProducts, buscarProductosActivos, buscarProductosPorCategoria, productosSinStock, productosStockBajo, productosStockNormal} = require('../Controllers/productosController')
const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')
const router = express.Router()

router.get('/productos', getAllProductsActives)
router.get('/productos/inactivos', verifyToken, verifyRole('Administrador'), getAllProductsInactives)
router.get('/producto/:id', getOneProductActive)
router.get('/producto/inactivo/:id', verifyToken, verifyRole('Administrador'), getOneProductInactive)
router.get('/productos/buscar', buscarProductosActivos)
router.delete('/productos/eliminar/:id', verifyToken, verifyRole('Administrador'), deleteProducts)
router.put('/productos/editar/:id', verifyToken, verifyRole('Administrador'), updateProducts)
router.post('/productos/crear', verifyToken, verifyRole('Administrador'), createProducts)
router.put('/productos/restaurar/:id', verifyToken, verifyRole('Administrador'), restoreProducts)
router.get('/productos/categoria', buscarProductosPorCategoria);
router.get('/productos/sin-stock', verifyToken, verifyRole('Administrador'), productosSinStock);
router.get('/productos/stock-bajo', verifyToken, verifyRole('Administrador'), productosStockBajo);
router.get('/productos/stock-normal', verifyToken, verifyRole('Administrador'), productosStockNormal);
module.exports = router