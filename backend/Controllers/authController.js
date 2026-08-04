const { conection } = require('../Config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { enviarRecuperacionPassword } = require('../Service/emailService')
dotenv.config()

const forgotPassword = (req, res) => {

    const { email } = req.body

    const consulta = `
        SELECT *
        FROM usuarios
        WHERE email = ?
        AND activo = 1
    `

    conection.query(consulta, [email], async (err, results) => {

        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        const usuario = results[0]

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '15m'
            }
        )

        const link = `${process.env.FRONTEND_URL}/reset-password/${token}`

        await enviarRecuperacionPassword(
            usuario.email,
            link
        )

        res.json({
            message: 'Correo enviado correctamente'
        })

    })

}

const resetPassword = async (req, res) => {

    const { token, password } = req.body

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const passwordHash = await bcrypt.hash(password, 10)

        const consulta = `
            UPDATE usuarios
            SET password = ?
            WHERE id = ?
        `

        conection.query(
            consulta,
            [passwordHash, decoded.id],
            (err, results) => {

                if (err) throw err

                res.json({
                    message: 'Contraseña actualizada'
                })

            }
        )

    }

    catch {

        return res.status(401).json({
            message: 'Token inválido o expirado'
        })

    }

}







// =======================
// REGISTER
// =======================

const register = async (req, res) => {

    const { nombre, apellido, email, password } = req.body

    const rol_id = 2 // Cliente

    const verificar = `
        SELECT *
        FROM usuarios
        WHERE email = ?
    `

    conection.query(verificar, [email], async (err, results) => {

        if (err) throw err

        if (results.length > 0) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const consulta = `
            INSERT INTO usuarios
            (nombre, apellido, email, password, rol_id)
            VALUES (?, ?, ?, ?, ?)
        `

        conection.query(
    consulta,
    [nombre, apellido, email, passwordHash, rol_id],
    (err, results) => {

        if (err) throw err

        const usuario_id = results.insertId

        const consultaCarrito = `
            INSERT INTO carritos (usuario_id)
            VALUES (?)
        `

        conection.query(
            consultaCarrito,
            [usuario_id],
            (err) => {

                if (err) throw err

                res.status(201).json({
                    message: 'Usuario registrado'
                })

            }
        )

    }
)
    })
}

// =======================
// LOGIN
// =======================

const login = (req, res) => {

    const { email, password } = req.body

    const consulta = `
        SELECT
            u.*,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
            ON u.rol_id = r.id
        WHERE u.email = ?
        AND u.activo = 1
    `

    conection.query(consulta, [email], async (err, results) => {

        if (err) throw err

        if (results.length === 0) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            })
        }

        const usuario = results[0]

        const coincide = await bcrypt.compare(password, usuario.password)

        if (!coincide) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            })
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        )

        res.json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol
            }
        })

    })
}

// =======================
// VERIFY TOKEN
// =======================

const verifyToken = (req, res) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token requerido'
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: 'Token inválido'
            })
        }

        res.json({
            valid: true,
            usuario: decoded
        })

    })

}

module.exports = {
    register,
    login,
    verifyToken,
    forgotPassword,
    resetPassword
}