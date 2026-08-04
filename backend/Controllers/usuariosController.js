const { conection } = require('../Config/database')

// Obtener todos los usuarios activos
const getAllUsersActives = (req, res) => {
    const consulta = `
        SELECT u.*, r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.activo = 1
    `

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener todos los usuarios inactivos
const getAllUsersInactives = (req, res) => {
    const consulta = `
        SELECT u.*, r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.activo = 0
    `

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener un usuario activo
const getOneUserActive = (req, res) => {
    const id = req.params.id

    const consulta = `
        SELECT u.*, r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.id = ? AND u.activo = 1
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.json(results)
    })
}

// Obtener un usuario inactivo
const getOneUserInactive = (req, res) => {
    const id = req.params.id

    const consulta = `
        SELECT u.*, r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.id = ? AND u.activo = 0
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.json(results)
    })
}

// Crear usuario
// const createUser = (req, res) => {
//     const { nombre, apellido, email, password, rol_id } = req.body;

//     const verificarEmail = `
//         SELECT *
//         FROM usuarios
//         WHERE email = ?
//     `;

//     conection.query(verificarEmail, [email], (err, results) => {
//         if (err) throw err;

//         if (results.length > 0) {
//             return res.status(400).json({
//                 message: 'El email ya está registrado'
//             });
//         }

//         const consulta = `
//             INSERT INTO usuarios
//             (nombre, apellido, email, password, rol_id)
//             VALUES (?, ?, ?, ?, ?)
//         `;

//         conection.query(
//             consulta,
//             [nombre, apellido, email, password, rol_id],
//             (err, results) => {
//                 if (err) throw err;

//                 res.json({ message: 'Usuario creado' });
//             }
//         );
//     });
// };

// Actualizar usuario
const updateUser = (req, res) => {
    const id = req.params.id

    const { nombre, apellido, email, password, rol_id } = req.body

    const consulta = `
        UPDATE usuarios
        SET nombre = ?, apellido = ?, email = ?, password = ?, rol_id = ?
        WHERE id = ? AND activo = 1
    `

    conection.query(
        consulta,
        [nombre, apellido, email, password, rol_id, id],
        (err, results) => {
            if (err) throw err

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                })
            }

            res.json({ message: 'Usuario actualizado' })
        }
    )
}

// Borrado lógico
const deleteUser = (req, res) => {
    const id = req.params.id

    const consulta = `
        UPDATE usuarios
        SET activo = 0
        WHERE id = ? AND activo = 1
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.json({ message: 'Usuario eliminado' })
    })
}

// Restaurar usuario
const restoreUser = (req, res) => {
    const id = req.params.id

    const consulta = `
        UPDATE usuarios
        SET activo = 1
        WHERE id = ? AND activo = 0
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.json({ message: 'Usuario restaurado' })
    })
}

// Buscar usuarios por nombre
const searchUserByName = (req, res) => {
    const { nombre } = req.query

    const consulta = `
        SELECT u.*, r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.nombre LIKE ? AND u.activo = 1
    `

    conection.query(consulta, [`%${nombre}%`], (err, results) => {
        if (err) throw err

        res.json(results)
    })
}

module.exports = {
    getAllUsersActives,
    getAllUsersInactives,
    getOneUserActive,
    getOneUserInactive,
    // createUser,
    updateUser,
    deleteUser,
    restoreUser,
    searchUserByName
}