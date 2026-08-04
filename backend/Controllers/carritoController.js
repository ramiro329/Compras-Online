const {conection} = require('../Config/database')

const getCartByUser = (req, res) => {

    const usuario_id = req.params.usuario_id

    const consultaCarrito = `
        SELECT *
        FROM carritos
        WHERE usuario_id = ?
    `

    const consultaDetalle = `
        SELECT
    dc.id,
    dc.producto_id,
    p.nombre,
    p.descripcion,
    p.precio,
    dc.cantidad,
    (p.precio * dc.cantidad) AS subtotal
FROM detalle_carrito dc
INNER JOIN productos p
    ON dc.producto_id = p.id
WHERE dc.carrito_id = ?
    `

    conection.query(consultaCarrito, [usuario_id], (err, carrito) => {
        if (err) throw err

        if (carrito.length === 0) {
            return res.status(404).json({
                message: 'El usuario no tiene carrito'
            })
        }

        const carrito_id = carrito[0].id

        conection.query(consultaDetalle, [carrito_id], (err, productos) => {
            if (err) throw err

            res.json({
                carrito: carrito[0],
                productos
            })
        })
    })
}

const createCart = (req, res) => {

    const { usuario_id } = req.body

    const consulta = `
        INSERT INTO carritos (usuario_id)
        VALUES (?)
    `

    conection.query(consulta, [usuario_id], (err, results) => {

        if (err) throw err

        res.status(201).json({
            message: 'Carrito creado',
            carrito_id: results.insertId
        })
    })
}

const addProductToCart = (req, res) => {

    const { usuario_id, producto_id, cantidad } = req.body


    const buscarCarrito = `
        SELECT id
        FROM carritos
        WHERE usuario_id = ?
    `


    conection.query(
        buscarCarrito,
        [usuario_id],
        (err, carrito) => {

            if (err) throw err


            if (carrito.length === 0) {

                return res.status(404).json({
                    message: 'Carrito no encontrado'
                })

            }


            const carrito_id = carrito[0].id


            const verificarProducto = `
                SELECT *
                FROM detalle_carrito
                WHERE carrito_id = ? 
                AND producto_id = ?
            `


            conection.query(
                verificarProducto,
                [carrito_id, producto_id],
                (err, results) => {

                    if (err) throw err


                    if (results.length > 0) {


                        const actualizarCantidad = `
                            UPDATE detalle_carrito
                            SET cantidad = cantidad + ?
                            WHERE carrito_id = ?
                            AND producto_id = ?
                        `


                        conection.query(
                            actualizarCantidad,
                            [cantidad, carrito_id, producto_id],
                            (err) => {

                                if (err) throw err

                                res.json({
                                    message: 'Cantidad actualizada'
                                })

                            }
                        )


                    } else {


                        const insertarProducto = `
                            INSERT INTO detalle_carrito
                            (carrito_id, producto_id, cantidad)
                            VALUES (?, ?, ?)
                        `


                        conection.query(
                            insertarProducto,
                            [carrito_id, producto_id, cantidad],
                            (err) => {

                                if (err) throw err

                                res.json({
                                    message: 'Producto agregado al carrito'
                                })

                            }
                        )

                    }

                }
            )

        }
    )

}

const updateProductQuantity = (req, res) => {

    const id = req.params.id
    const { cantidad } = req.body

    const consulta = `
        UPDATE detalle_carrito
        SET cantidad = ?
        WHERE id = ?
    `

    conection.query(
        consulta,
        [cantidad, id],
        (err, results) => {

            if (err) throw err

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                })
            }

            res.json({
                message: 'Cantidad actualizada'
            })
        }
    )
}

const removeProductFromCart = (req, res) => {

    const id = req.params.id

    const consulta = `
        DELETE FROM detalle_carrito
        WHERE id = ?
    `

    conection.query(consulta, [id], (err, results) => {

        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        res.json({
            message: 'Producto eliminado'
        })
    })
}

const clearCart = (req, res) => {

    const carrito_id = req.params.carrito_id

    const consulta = `
        DELETE FROM detalle_carrito
        WHERE carrito_id = ?
    `

    conection.query(consulta, [carrito_id], (err) => {

        if (err) throw err

        res.json({
            message: 'Carrito vaciado'
        })
    })
}








module.exports = {getCartByUser, createCart, addProductToCart, updateProductQuantity, removeProductFromCart, clearCart}