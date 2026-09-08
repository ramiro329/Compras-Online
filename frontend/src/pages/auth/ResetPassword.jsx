import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../services/authService'

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')

    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        setMensaje('')
        setError('')

        if (password !== confirmarPassword) {

            setError('Las contraseñas no coinciden')
            return

        }

        try {

            const response = await resetPassword(
                token,
                password
            )

            setMensaje(response.message)

            setTimeout(() => {
                navigate('/login')
            }, 2000)

        } catch (error) {

            setError(
                error.response?.data?.message ||
                'No se pudo restablecer la contraseña'
            )

        }

    }

    return (

        <div>

            <h2>Restablecer contraseña</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Nueva contraseña"
                    required
                />

                <input
                    type="password"
                    value={confirmarPassword}
                    onChange={(e) =>
                        setConfirmarPassword(e.target.value)
                    }
                    placeholder="Confirmar contraseña"
                    required
                />

                <button type="submit">
                    Cambiar contraseña
                </button>

            </form>

            {mensaje && (
                <p>
                    {mensaje}
                </p>
            )}

            {error && (
                <p>
                    {error}
                </p>
            )}

        </div>

    )

}

export default ResetPassword