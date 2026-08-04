const { conection } = require('../Config/database')

// Obtener todos los movimientos de stock
const getAllStockMovements = (req, res) => {

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            u.nombre,
            u.apellido,
            tms.nombre AS tipo_movimiento
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        INNER JOIN tipos_movimiento_stock tms
            ON ms.tipo_movimiento_stock_id = tms.id
    `

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener un movimiento por ID
const getOneStockMovement = (req, res) => {

    const id = req.params.id

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            u.nombre,
            u.apellido,
            tms.nombre AS tipo_movimiento
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        INNER JOIN tipos_movimiento_stock tms
            ON ms.tipo_movimiento_stock_id = tms.id
        WHERE ms.id = ?
    `

    conection.query(consulta, [id], (err, results) => {

        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Movimiento no encontrado'
            })
        }

        res.json(results[0])
    })
}

// Registrar movimiento de stock
const createStockMovement = (req, res) => {

    const {
        producto_id,
        usuario_id,
        tipo_movimiento_stock_id,
        cantidad,
        observacion
    } = req.body

    // Obtener el stock actual
    const consultaProducto = `
        SELECT stock
        FROM productos
        WHERE id = ?
    `

    conection.query(consultaProducto, [producto_id], (err, producto) => {

        if (err) throw err

        if (producto.length === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        const stock_anterior = producto[0].stock
        let stock_nuevo

        // Entrada
        if (tipo_movimiento_stock_id == 1) {
            stock_nuevo = stock_anterior + cantidad
        }

        // Salida
        else if (tipo_movimiento_stock_id == 2) {

            if (cantidad > stock_anterior) {
                return res.status(400).json({
                    message: 'Stock insuficiente'
                })
            }

            stock_nuevo = stock_anterior - cantidad
        }

        // Ajuste
        else {
            stock_nuevo = cantidad
        }

        // Actualizar el producto
        const actualizarProducto = `
            UPDATE productos
            SET stock = ?
            WHERE id = ?
        `

        conection.query(
            actualizarProducto,
            [stock_nuevo, producto_id],
            (err) => {

                if (err) throw err

                // Registrar movimiento
                const insertarMovimiento = `
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
                `

                conection.query(
                    insertarMovimiento,
                    [
                        producto_id,
                        usuario_id,
                        tipo_movimiento_stock_id,
                        cantidad,
                        stock_anterior,
                        stock_nuevo,
                        observacion
                    ],
                    (err) => {

                        if (err) throw err

                        res.status(201).json({
                            message: 'Movimiento registrado'
                        })
                    }
                )
            }
        )
    })
}

// Obtener movimientos de un producto
const getStockMovementsByProduct = (req, res) => {

    const producto_id = req.params.producto_id

    const consulta = `
        SELECT
            ms.*,
            tms.nombre AS tipo_movimiento,
            u.nombre,
            u.apellido
        FROM movimientos_stock ms
        INNER JOIN tipos_movimiento_stock tms
            ON ms.tipo_movimiento_stock_id = tms.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        WHERE ms.producto_id = ?
    `

    conection.query(consulta, [producto_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener movimientos realizados por un usuario
const getStockMovementsByUser = (req, res) => {

    const usuario_id = req.params.usuario_id

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            tms.nombre AS tipo_movimiento
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN tipos_movimiento_stock tms
            ON ms.tipo_movimiento_stock_id = tms.id
        WHERE ms.usuario_id = ?
    `

    conection.query(consulta, [usuario_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener movimientos por tipo
const getStockMovementsByType = (req, res) => {

    const tipo_id = req.params.tipo_id

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            u.nombre,
            u.apellido,
            tms.nombre AS tipo_movimiento
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        INNER JOIN tipos_movimiento_stock tms
            ON ms.tipo_movimiento_stock_id = tms.id
        WHERE ms.tipo_movimiento_stock_id = ?
    `

    conection.query(consulta, [tipo_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener entradas de stock
const getStockEntries = (req, res) => {

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            u.nombre,
            u.apellido
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        WHERE ms.tipo_movimiento_stock_id = 1
    `

    conection.query(consulta, (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener salidas de stock
const getStockOutputs = (req, res) => {

    const consulta = `
        SELECT
            ms.*,
            p.nombre AS producto,
            u.nombre,
            u.apellido
        FROM movimientos_stock ms
        INNER JOIN productos p
            ON ms.producto_id = p.id
        INNER JOIN usuarios u
            ON ms.usuario_id = u.id
        WHERE ms.tipo_movimiento_stock_id = 2
    `

    conection.query(consulta, (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

module.exports = {
    getAllStockMovements,
    getOneStockMovement,
    createStockMovement,
    getStockMovementsByProduct,
    getStockMovementsByUser,
    getStockMovementsByType,
    getStockEntries,
    getStockOutputs
}