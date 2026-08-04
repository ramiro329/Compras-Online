import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import useAuthStore from '../store/authStore'
import Navbar from './Navbar'

const MainLogin = () => {

    const navigate = useNavigate()

    const { loginUser } = useAuthStore()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await login(user)

            loginUser(
                response.token,
                response.usuario
            )

            if (response.usuario.rol === 'Administrador') {
                navigate('/admin')
            } else {
                navigate('/')
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                'Credenciales incorrectas'
            )

        }

    }

    return (

        <>
        <Navbar />

            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Correo"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                />

                <button type="submit">
                    Ingresar
                </button>

            </form>

            <Link to="/register">
                Registrarse
            </Link>

            <br />

            <Link to="/forgot-password">
                ¿Olvidaste tu contraseña?
            </Link>

        </>

    )

}

export default MainLogin