const express = require('express')
const {getAllCategoriesActives,
    getAllCategoriesInactives,
    getOneCategoryActive,
    getOneCategoryInactive,
    createCategory,
    updateCategory,
    deleteCategory,
    restoreCategory,
    searchCategoryByName} = require('../Controllers/categoriasController')
const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()
router.get('/categorias/activas', getAllCategoriesActives)
router.get('/categorias/inactivas', verifyToken, verifyRole('Administrador'), getAllCategoriesInactives)
router.get('/categoria/activa/:id', getOneCategoryActive)
router.get('/categoria/inactiva/:id', verifyToken, verifyRole('Administrador'), getOneCategoryInactive)
router.post('/categorias/crear', verifyToken, verifyRole('Administrador'), createCategory)
router.put('/categorias/editar/:id', verifyToken, verifyRole('Administrador'), updateCategory)
router.delete('/categorias/eliminar/:id', verifyToken, verifyRole('Administrador'), deleteCategory)
router.put('/categorias/restaurar/:id', verifyToken, verifyRole('Administrador'), restoreCategory)
router.get('/categorias/buscar', searchCategoryByName)

module.exports = router