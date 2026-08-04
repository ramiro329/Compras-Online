const { conection } = require('../Config/database')

// Obtener todos los pedidos
const getAllOrders = (req, res) => {

    const consulta = `
        SELECT
            p.*,
            e.nombre AS estado
        FROM pedidos p
        INNER JOIN estados_pedido e
            ON p.estado_id = e.id
    `

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener un pedido por ID
const getOneOrder = (req, res) => {

    const id = req.params.id

    const consultaPedido = `
        SELECT
            p.*,
            u.nombre,
            u.apellido,
            e.nombre AS estado
        FROM pedidos p
        INNER JOIN usuarios u
            ON p.usuario_id = u.id
        INNER JOIN estados_pedido e
            ON p.estado_id = e.id
        WHERE p.id = ?
    `

    const consultaDetalle = `
        SELECT
            dp.producto_id,
            pr.nombre,
            dp.cantidad,
            dp.precio_unitario
        FROM detalle_pedido dp
        INNER JOIN productos pr
            ON dp.producto_id = pr.id
        WHERE dp.pedido_id = ?
    `

    conection.query(consultaPedido, [id], (err, pedido) => {
        if (err) throw err

        if (pedido.length === 0) {
            return res.status(404).json({
                message: 'Pedido no encontrado'
            })
        }

        conection.query(consultaDetalle, [id], (err, detalle) => {
            if (err) throw err

            res.json({
                pedido: pedido[0],
                productos: detalle
            })
        })
    })
}

// Crear pedido
const createOrder = (req, res) => {

    const { usuario_id, total, productos } = req.body
    const estado_id = 1 // Pendiente de pago

    const consultaPedido = `
        INSERT INTO pedidos
        (usuario_id, estado_id, total)
        VALUES (?, ?, ?)
    `

    conection.query(
        consultaPedido,
        [usuario_id, estado_id, total],
        (err, results) => {

            if (err) throw err

            const pedido_id = results.insertId


            const insertarDetalles = (index) => {

                if (index >= productos.length) {

                    return res.status(201).json({
                        message: 'Pedido creado. Pendiente de pago',
                        pedido_id
                    })

                }


                const producto = productos[index]


                const consultaDetalle = `
                    INSERT INTO detalle_pedido
                    (
                        pedido_id,
                        producto_id,
                        cantidad,
                        precio_unitario
                    )
                    VALUES (?, ?, ?, ?)
                `


                conection.query(
                    consultaDetalle,
                    [
                        pedido_id,
                        producto.producto_id,
                        producto.cantidad,
                        producto.precio_unitario
                    ],
                    (err) => {

                        if (err) throw err

                        insertarDetalles(index + 1)

                    }
                )

            }


            insertarDetalles(0)

        }
    )
}

// Actualizar estado del pedido
const updateOrderStatus = (req, res) => {

    const id = req.params.id
    const { estado_id } = req.body


    const actualizarEstado = `
        UPDATE pedidos
        SET estado_id = ?
        WHERE id = ?
    `


    conection.query(
        actualizarEstado,
        [estado_id, id],
        (err, results) => {

            if (err) throw err


            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Pedido no encontrado'
                })
            }


            // Si el pedido fue marcado como PAGADO
            if (estado_id == 2) {


                const consultaPedido = `
                    SELECT *
                    FROM pedidos
                    WHERE id = ?
                `


                conection.query(
                    consultaPedido,
                    [id],
                    (err, pedidoResult) => {

                        if (err) throw err


                        const pedido = pedidoResult[0]


                        const consultaDetalle = `
                            SELECT
                                dp.producto_id,
                                dp.cantidad,
                                dp.precio_unitario,
                                p.stock
                            FROM detalle_pedido dp
                            INNER JOIN productos p
                                ON dp.producto_id = p.id
                            WHERE dp.pedido_id = ?
                        `


                        conection.query(
                            consultaDetalle,
                            [id],
                            (err, productos) => {

                                if (err) throw err


                                productos.forEach(producto => {


                                    const nuevoStock =
                                        producto.stock - producto.cantidad



                                    // Actualizar stock
                                    conection.query(
                                        `
                                        UPDATE productos
                                        SET stock = ?
                                        WHERE id = ?
                                        `,
                                        [
                                            nuevoStock,
                                            producto.producto_id
                                        ]
                                    )



                                    // Registrar movimiento stock
                                    conection.query(
                                        `
                                        INSERT INTO movimientos_stock
                                        (
                                            producto_id,
                                            usuario_id,
                                            tipo_movimiento_stock_id,
                                            cantidad,
                                            stock_anterior,
                                            stock_nuevo,
                                            observacion
                                        )
                                        VALUES (?, ?, ?, ?, ?, ?, ?)
                                        `,
                                        [
                                            producto.producto_id,
                                            pedido.usuario_id,
                                            2,
                                            producto.cantidad,
                                            producto.stock,
                                            nuevoStock,
                                            `Venta Pedido #${id}`
                                        ]
                                    )

                                })



                                // Registrar movimiento financiero
                                conection.query(
                                    `
                                    INSERT INTO movimientos_financieros
                                    (
                                        usuario_id,
                                        tipo_movimiento_financiero_id,
                                        monto,
                                        concepto,
                                        pedido_id
                                    )
                                    VALUES (?, ?, ?, ?, ?)
                                    `,
                                    [
                                        pedido.usuario_id,
                                        1,
                                        pedido.total,
                                        `Pago Pedido #${id}`,
                                        id
                                    ]
                                )


                                res.json({
                                    message: 'Pedido pagado y registrado correctamente'
                                })


                            }
                        )

                    }
                )


            } else {


                res.json({
                    message: 'Estado actualizado'
                })

            }

        }
    )

}

// Obtener pedidos de un usuario
const getOrdersByUser = (req, res) => {

    const usuario_id = req.params.usuario_id

    const consulta = `
        SELECT
            p.*,
            e.nombre AS estado
        FROM pedidos p
        INNER JOIN estados_pedido e
            ON p.estado_id = e.id
        WHERE p.usuario_id = ?
    `

    conection.query(consulta, [usuario_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener pedidos por estado
const getOrdersByStatus = (req, res) => {

    const estado_id = req.params.estado_id

    const consulta = `
        SELECT
            p.*,
            e.nombre AS estado
        FROM pedidos p
        INNER JOIN estados_pedido e
            ON p.estado_id = e.id
        WHERE p.estado_id = ?
    `

    conection.query(consulta, [estado_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOrderStatus,
    getOrdersByUser,
    getOrdersByStatus
}