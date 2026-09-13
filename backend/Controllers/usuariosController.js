const { conection } = require('../Config/database')

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

const deleteUser = (req, res) => {

const id = req.params.id 

const consulta = 'update usuarios set activo = 0 where id = ? and activo = 1'

conection.query(consulta, [id], (err, results) => {
    if (err) throw err
    if (results.affectedRows === 0) {
        res.status(404).json({message:'Usuario no encontrado'})
    } else {
        res.json({message:'Usuario eliminado'})
    }
   
})
}


const restoreUser = (req, res) => {

const id = req.params.id 

const consulta = 'update usuarios set activo = 1 where id = ? and activo = 0'

conection.query(consulta, [id], (err, results) => {
    if (err) throw err
    if (results.affectedRows === 0) {
        res.status(404).json({message:'Usuario no encontrado'})
    } else {
        res.json({message:'Usuario restaurado'})
    }
   
})
}


module.exports = {
    getAllUsersActives,
    getAllUsersInactives,
    getOneUserActive,
    getOneUserInactive,
        
    deleteUser,
    restoreUser,
    searchUserByName
}