const express = require('express')
const {getAllUsersActives,
    getAllUsersInactives,
    getOneUserActive,
    getOneUserInactive,
    updateUser,
    deleteUser,
    restoreUser,
    searchUserByName} = require('../Controllers/usuariosController')
const verifyToken = require('../Middlewares/verifyToken')
const verifyRole = require('../Middlewares/verifyRole')

const router = express.Router()



router.put('/usuario/editar/:id', verifyToken, updateUser)

router.get('/usuarios/activos', verifyToken, verifyRole('Administrador'), getAllUsersActives)

router.get('/usuarios/inactivos', verifyToken, verifyRole('Administrador'), getAllUsersInactives)

router.get('/usuario/activo/:id', verifyToken, verifyRole('Administrador'), getOneUserActive)

router.get('/usuario/inactivo/:id', verifyToken, verifyRole('Administrador'), getOneUserInactive)

router.delete('/usuario/eliminar/:id', verifyToken, verifyRole('Administrador'), deleteUser)

router.put('/usuario/restaurar/:id', verifyToken, verifyRole('Administrador'), restoreUser)

router.get('/usuarios/buscar', verifyToken, verifyRole('Administrador'), searchUserByName)

module.exports = router