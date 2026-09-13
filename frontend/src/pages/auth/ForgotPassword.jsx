import React, { useState } from 'react'
import { forgotPassword } from '../../services/authService'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        setMensaje('')
        setError('')

        try {

            const response = await forgotPassword(email)

            setMensaje(response.message)

        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Ocurrió un error al enviar el correo'
            )

        }

    }

    return (
        <main className="forget-password-page">

            <div className="forget-password-card">

                <h2>Recuperar contraseña</h2>

                <p className="forget-password-descripcion">
                    Ingresa tu correo electrónico para recibir un
                    enlace para restablecer tu contraseña.
                </p>

                <form
                    className="forget-password-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                    />

                    <button type="submit">
                        Enviar enlace
                    </button>

                </form>

                {mensaje && (
                    <p className="forget-password-mensaje">
                        {mensaje}
                    </p>
                )}

                {error && (
                    <p className="forget-password-error">
                        {error}
                    </p>
                )}

                <Link
                    className="forget-password-volver"
                    to="/login"
                >
                    ← Volver al inicio de sesión
                </Link>

            </div>

        </main>
    )
}

export default ForgotPassword
