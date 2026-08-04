import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import Navbar from './Navbar'

const MainRegister = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
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

            const response = await register(user)

            alert(response.message)

            navigate('/login')

        } catch (error) {

            alert(
                error.response?.data?.message ||
                'Error al registrar el usuario'
            )

        }

    }

    return (

        <>

        <Navbar />

            <h2>Registrarse</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={user.nombre}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={user.apellido}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Registrarse
                </button>

            </form>

            <br />

            <Link to="/login">
                ¿Ya tienes una cuenta? Inicia sesión
            </Link>

        </>

    )

}

export default MainRegister