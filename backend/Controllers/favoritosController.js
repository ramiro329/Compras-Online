const { conection } = require('../Config/database')

// Obtener favoritos de un usuario
const getFavoritesByUser = (req, res) => {

    const usuario_id = req.params.usuario_id

    const consulta = `
    SELECT
        p.*,
        ip.url AS imagen,
        f.fecha_agregado
    FROM favoritos f
    INNER JOIN productos p
        ON f.producto_id = p.id
    LEFT JOIN imagenes_producto ip
        ON p.id = ip.producto_id
        AND ip.principal = 1
    WHERE f.usuario_id = ?
`
        
    

    conection.query(consulta, [usuario_id], (err, results) => {
        if (err) throw err

        res.json(results)
    })
}

// Agregar producto a favoritos
const addFavorite = (req, res) => {

    const { usuario_id, producto_id } = req.body

    const verificarFavorito = `
        SELECT *
        FROM favoritos
        WHERE usuario_id = ? AND producto_id = ?
    `

    conection.query(
        verificarFavorito,
        [usuario_id, producto_id],
        (err, results) => {

            if (err) throw err

            if (results.length > 0) {
                return res.status(400).json({
                    message: 'El producto ya está en favoritos'
                })
            }

            const consulta = `
                INSERT INTO favoritos
                (usuario_id, producto_id)
                VALUES (?, ?)
            `

            conection.query(
                consulta,
                [usuario_id, producto_id],
                (err) => {

                    if (err) throw err

                    res.status(201).json({
                        message: 'Producto agregado a favoritos'
                    })
                }
            )
        }
    )
}

// Eliminar favorito
const removeFavorite = (req, res) => {

    const usuario_id = req.params.usuario_id
    const producto_id = req.params.producto_id

    const consulta = `
        DELETE FROM favoritos
        WHERE usuario_id = ? AND producto_id = ?
    `

    conection.query(
        consulta,
        [usuario_id, producto_id],
        (err, results) => {

            if (err) throw err

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Favorito no encontrado'
                })
            }

            res.json({
                message: 'Producto eliminado de favoritos'
            })
        }
    )
}

// Verificar si un producto es favorito
const isFavorite = (req, res) => {

    const usuario_id = req.params.usuario_id
    const producto_id = req.params.producto_id

    const consulta = `
        SELECT *
        FROM favoritos
        WHERE usuario_id = ? AND producto_id = ?
    `

    conection.query(
        consulta,
        [usuario_id, producto_id],
        (err, results) => {

            if (err) throw err

            res.json({
                favorito: results.length > 0
            })
        }
    )
}

module.exports = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite,
    isFavorite
}