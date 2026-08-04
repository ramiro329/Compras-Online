const { conection } = require('../Config/database')

// Obtener todas las imágenes de un producto
const getImagesByProduct = (req, res) => {

    const producto_id = req.params.producto_id

    const consulta = `
        SELECT *
        FROM imagenes_producto
        WHERE producto_id = ?
    `

    conection.query(consulta, [producto_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener la imagen principal
const getPrincipalImage = (req, res) => {

    const producto_id = req.params.producto_id

    const consulta = `
        SELECT *
        FROM imagenes_producto
        WHERE producto_id = ?
        AND principal = 1
    `

    conection.query(consulta, [producto_id], (err, results) => {

        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Imagen no encontrada'
            })
        }

        res.json(results[0])
    })
}

// Agregar imagen
const createImage = (req, res) => {

    const { producto_id, url, principal } = req.body

    const insertarImagen = () => {

        const consulta = `
            INSERT INTO imagenes_producto
            (producto_id, url, principal)
            VALUES (?, ?, ?)
        `

        conection.query(
            consulta,
            [producto_id, url, principal],
            (err) => {

                if (err) throw err

                res.status(201).json({
                    message: 'Imagen agregada'
                })
            }
        )
    }

    if (principal == 1) {

        const quitarPrincipal = `
            UPDATE imagenes_producto
            SET principal = 0
            WHERE producto_id = ?
        `

        conection.query(quitarPrincipal, [producto_id], (err) => {

            if (err) throw err

            insertarImagen()
        })

    } else {

        insertarImagen()

    }

}

// Cambiar imagen principal
const setPrincipalImage = (req, res) => {

    const id = req.params.id
    const { producto_id } = req.body

    const quitarPrincipal = `
        UPDATE imagenes_producto
        SET principal = 0
        WHERE producto_id = ?
    `

    conection.query(quitarPrincipal, [producto_id], (err) => {

        if (err) throw err

        const ponerPrincipal = `
            UPDATE imagenes_producto
            SET principal = 1
            WHERE id = ?
        `

        conection.query(ponerPrincipal, [id], (err, results) => {

            if (err) throw err

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Imagen no encontrada'
                })
            }

            res.json({
                message: 'Imagen principal actualizada'
            })

        })

    })

}

// Eliminar imagen
const deleteImage = (req, res) => {

    const id = req.params.id

    const consulta = `
        DELETE FROM imagenes_producto
        WHERE id = ?
    `

    conection.query(consulta, [id], (err, results) => {

        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Imagen no encontrada'
            })
        }

        res.json({
            message: 'Imagen eliminada'
        })
    })
}

module.exports = {
    getImagesByProduct,
    getPrincipalImage,
    createImage,
    setPrincipalImage,
    deleteImage
}