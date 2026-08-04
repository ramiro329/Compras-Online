    const { conection } = require('../Config/database')
    const mercadopago = require('mercadopago');
    const dotenv = require('dotenv');
    const e = require('express');

    dotenv.config();

    const { MercadoPagoConfig, Preference } = mercadopago;

    const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });








    const createOrder = (req, res) => {

        const usuario_id = req.user.id

        const consultaCarrito = `
            SELECT id
            FROM carritos
            WHERE usuario_id = ?
        `

        conection.query(consultaCarrito, [usuario_id], (err, carritoResult) => {

            if (err) throw err

            if (carritoResult.length === 0) {
                return res.status(404).json({
                    message: 'Carrito no encontrado'
                })
            }

            const carrito_id = carritoResult[0].id

            const consultaProductos = `
                SELECT
                    dc.producto_id,
                    dc.cantidad,
                    p.nombre,
                    p.precio,
                    p.stock
                FROM detalle_carrito dc
                INNER JOIN productos p
                    ON dc.producto_id = p.id
                WHERE dc.carrito_id = ?
                AND p.activo = 1
            `

            conection.query(consultaProductos, [carrito_id], async (err, productos) => {

                if (err) throw err

                if (productos.length === 0) {
                    return res.status(400).json({
                        message: 'El carrito está vacío'
                    })
                }

                let total = 0
                const items = []

                for (const producto of productos) {

                    if (producto.stock < producto.cantidad) {
                        return res.status(400).json({
                            message: `Stock insuficiente para ${producto.nombre}`
                        })
                    }

                    total += producto.precio * producto.cantidad

                    items.push({
                        title: producto.nombre,
                        unit_price: Number(producto.precio),
                        currency_id: 'ARS',
                        quantity: producto.cantidad
                    })
                }

                const consultaPedido = `
                    INSERT INTO pedidos
                    (
                        usuario_id,
                        estado_id,
                        total
                    )
                    VALUES (?, ?, ?)
                `

                conection.query(
                    consultaPedido,
                    [usuario_id, 1, total],
                    async (err, pedidoResult) => {

                        if (err) throw err

                        const pedido_id = pedidoResult.insertId

                        const insertarDetalles = async (index) => {

                            if (index >= productos.length) {

                                const preference = new Preference(client)

                                try {

                                    const result = await preference.create({
                                        body: {
                                            items,
                                            external_reference: pedido_id.toString(),
                                        back_urls: {
    success: "http://localhost:5173/success",
    failure: "http://localhost:5173/failure",
    pending: "http://localhost:5173/pending"
},
                                            auto_return: 'approved',
                                            notification_url: 'https://hawkish-henotheistic-olive.ngrok-free.dev/payment/webhook'
                                        }
                                    })

                                    conection.query(
                                        `
                                        UPDATE pedidos
                                        SET preference_id = ?
                                        WHERE id = ?
                                        `,
                                        [result.id, pedido_id],
                                        (err) => {

                                            if (err) throw err

                                            res.json({
                                                pedido_id,
                                                preference_id: result.id,
                                                init_point: result.init_point
                                            })

                                        }
                                    )

                                }

                                catch (error) {

                                    console.error(error)

                                    res.status(500).json({
                                        message: 'Error al crear la preferencia'
                                    })

                                }

                                return
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
                                    producto.precio
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

            })

        })

    }









    const receiveWebhook = async (req, res) => {
 console.log("WEBHOOK RECIBIDO");
    console.log(req.query);
    console.log(req.body);
        

        try {
            

            const type = req.query.type
            const paymentId = req.query["data.id"]

            if (type !== "payment") {
                return res.sendStatus(204)
            }

            const payment = await fetch(
                `https://api.mercadopago.com/v1/payments/${paymentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
                    }
                }
            ).then(res => res.json())

            if (payment.status !== "approved") {
                return res.sendStatus(204)
            }

            const pedido_id = payment.external_reference

            const consultaPedido = `
                SELECT *
                FROM pedidos
                WHERE id = ?
            `

            conection.query(consultaPedido, [pedido_id], (err, pedidoResult) => {

                if (err) throw err

                if (pedidoResult.length === 0) {
                    return res.sendStatus(404)
                }

                const pedido = pedidoResult[0]

                // Ya fue procesado anteriormente
                if (pedido.estado_id === 2) {
                    return res.sendStatus(204)
                }

                // Cambiar a PAGADO
                const actualizarPedido = `
                    UPDATE pedidos
                    SET estado_id = 2
                    WHERE id = ?
                `

                conection.query(actualizarPedido, [pedido_id], (err) => {

                    if (err) throw err

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

                    conection.query(consultaDetalle, [pedido_id], (err, productos) => {

                        if (err) throw err

                        const actualizarStock = (index) => {

                            if (index >= productos.length) {

                                return res.sendStatus(204)

                            }

                            const producto = productos[index]

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
                                ],
                                (err) => {

                                    if (err) throw err

                                    // Registrar movimiento de stock
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
                                            2, // Venta
                                            producto.cantidad,
                                            producto.stock,
                                            nuevoStock,
                                            `Venta Pedido #${pedido_id}`
                                        ],
                                        (err) => {

                                            if (err) throw err

                                            actualizarStock(index + 1)

                                        }
                                    )

                                }
                            )

                        }

                        actualizarStock(0)

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
                                1, // Ingreso
                                pedido.total,
                                `Pago Pedido #${pedido_id}`,
                                pedido_id
                            ]
                        )

                        // Vaciar carrito
                        conection.query(
                            `
                            DELETE dc
                            FROM detalle_carrito dc
                            INNER JOIN carritos c
                                ON dc.carrito_id = c.id
                            WHERE c.usuario_id = ?
                            `,
                            [pedido.usuario_id]
                        )

                    })

                })

            })

        }

        catch (error) {

            console.error(error)

            res.sendStatus(500)

        }

    }












    const getPedidoByPayment = async (req, res) => {

        try {

            const { paymentId } = req.params

            const payment = await fetch(
                `https://api.mercadopago.com/v1/payments/${paymentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
                    }
                }
            ).then(res => res.json())

            if (!payment.external_reference) {

                return res.status(404).json({
                    message: 'Pedido no encontrado'
                })

            }

            const pedido_id = payment.external_reference

            const consulta = `
                SELECT
                    p.*,
                    e.nombre AS estado
                FROM pedidos p
                INNER JOIN estados_pedido e
                    ON p.estado_id = e.id
                WHERE p.id = ?
            `

            conection.query(consulta, [pedido_id], (err, results) => {

                if (err) throw err

                if (results.length === 0) {

                    return res.status(404).json({
                        message: 'Pedido no encontrado'
                    })

                }

                res.json({

                    payment_id: payment.id,

                    payment_status: payment.status,

                    preference_id: payment.preference_id,

                    pedido: results[0]

                })

            })

        }

        catch (error) {

            console.error(error)

            res.status(500).json({
                message: 'Error consultando pago'
            })

        }

    }



    module.exports = {
    createOrder,
    receiveWebhook,
    getPedidoByPayment
    };
