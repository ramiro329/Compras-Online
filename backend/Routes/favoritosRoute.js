const express = require('express')
const {getFavoritesByUser,
    addFavorite,
    removeFavorite,
    isFavorite} = require('../Controllers/favoritosController')

const router = express.Router()

router.get('/favorito/:usuario_id', getFavoritesByUser)
router.post('/favorito/add', addFavorite)
router.delete('/favorito/eliminar/:usuario_id/:producto_id', removeFavorite)
router.get('/favorito/:usuario_id/:producto_id', isFavorite)



module.exports = router