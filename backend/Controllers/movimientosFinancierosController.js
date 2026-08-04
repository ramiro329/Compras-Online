const { conection } = require('../Config/database')

// Obtener todos los movimientos financieros
const getAllFinancialMovements = (req, res) => {

    const consulta = `
        SELECT
            mf.*,
            tmf.nombre AS tipo_movimiento,
            u.nombre,
            u.apellido
        FROM movimientos_financieros mf
        INNER JOIN tipos_movimiento_financiero tmf
            ON mf.tipo_movimiento_financiero_id = tmf.id
        INNER JOIN usuarios u
            ON mf.usuario_id = u.id
    `

    conection.query(consulta, (err, results) => {
        if (err) throw err

        res.json(results)
    })
}

// Obtener un movimiento por ID
const getOneFinancialMovement = (req, res) => {

    const id = req.params.id

    const consulta = `
        SELECT
            mf.*,
            tmf.nombre AS tipo_movimiento,
            u.nombre,
            u.apellido
        FROM movimientos_financieros mf
        INNER JOIN tipos_movimiento_financiero tmf
            ON mf.tipo_movimiento_financiero_id = tmf.id
        INNER JOIN usuarios u
            ON mf.usuario_id = u.id
        WHERE mf.id = ?
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

// Crear un movimiento financiero
const createFinancialMovement = (req, res) => {

    const {
        usuario_id,
        tipo_movimiento_financiero_id,
        monto,
        concepto,
        pedido_id
    } = req.body

    const consulta = `
        INSERT INTO movimientos_financieros
        (
            usuario_id,
            tipo_movimiento_financiero_id,
            monto,
            concepto,
            pedido_id
        )
        VALUES (?, ?, ?, ?, ?)
    `

    conection.query(
        consulta,
        [
            usuario_id,
            tipo_movimiento_financiero_id,
            monto,
            concepto,
            pedido_id
        ],
        (err) => {

            if (err) throw err

            res.status(201).json({
                message: 'Movimiento financiero registrado'
            })
        }
    )
}

// Obtener movimientos de un usuario
const getFinancialMovementsByUser = (req, res) => {

    const usuario_id = req.params.usuario_id

    const consulta = `
        SELECT
            mf.*,
            tmf.nombre AS tipo_movimiento
        FROM movimientos_financieros mf
        INNER JOIN tipos_movimiento_financiero tmf
            ON mf.tipo_movimiento_financiero_id = tmf.id
        WHERE mf.usuario_id = ?
    `

    conection.query(consulta, [usuario_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener movimientos por tipo
const getFinancialMovementsByType = (req, res) => {

    const tipo_id = req.params.tipo_id

    const consulta = `
        SELECT
            mf.*,
            tmf.nombre AS tipo_movimiento,
            u.nombre,
            u.apellido
        FROM movimientos_financieros mf
        INNER JOIN tipos_movimiento_financiero tmf
            ON mf.tipo_movimiento_financiero_id = tmf.id
        INNER JOIN usuarios u
            ON mf.usuario_id = u.id
        WHERE mf.tipo_movimiento_financiero_id = ?
    `

    conection.query(consulta, [tipo_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Obtener movimiento por pedido
const getFinancialMovementByOrder = (req, res) => {

    const pedido_id = req.params.pedido_id

    const consulta = `
        SELECT
            mf.*,
            tmf.nombre AS tipo_movimiento
        FROM movimientos_financieros mf
        INNER JOIN tipos_movimiento_financiero tmf
            ON mf.tipo_movimiento_financiero_id = tmf.id
        WHERE mf.pedido_id = ?
    `

    conection.query(consulta, [pedido_id], (err, results) => {

        if (err) throw err

        res.json(results)
    })
}

// Total de ingresos
const getTotalIncome = (req, res) => {

    const consulta = `
        SELECT
            IFNULL(SUM(monto),0) AS total_ingresos
        FROM movimientos_financieros
        WHERE tipo_movimiento_financiero_id = 1
    `

    conection.query(consulta, (err, results) => {

        if (err) throw err

        res.json(results[0])
    })
}

// Total de egresos
const getTotalExpenses = (req, res) => {

    const consulta = `
        SELECT
            IFNULL(SUM(monto),0) AS total_egresos
        FROM movimientos_financieros
        WHERE tipo_movimiento_financiero_id = 2
    `

    conection.query(consulta, (err, results) => {

        if (err) throw err

        res.json(results[0])
    })
}

// Balance general
const getBalance = (req, res) => {

    const consulta = `
        SELECT
            IFNULL(
                SUM(
                    CASE
                        WHEN tipo_movimiento_financiero_id = 1
                        THEN monto
                        ELSE -monto
                    END
                ),
            0) AS balance
        FROM movimientos_financieros
    `

    conection.query(consulta, (err, results) => {

        if (err) throw err

        res.json(results[0])
    })
}

module.exports = {
    getAllFinancialMovements,
    getOneFinancialMovement,
    createFinancialMovement,
    getFinancialMovementsByUser,
    getFinancialMovementsByType,
    getFinancialMovementByOrder,
    getTotalIncome,
    getTotalExpenses,
    getBalance
}