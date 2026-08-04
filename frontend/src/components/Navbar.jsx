import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '../store/authStore'

const Navbar = () => {

    const navigate = useNavigate()

    const { user, logoutUser } = useAuthStore()

    const handleLogout = () => {

        logoutUser()

        navigate('/')

    }

    return (

        <nav>

            <h2>Electronica</h2>

            <ul>

                <li>
                    <Link to="/">
                        Inicio
                    </Link>
                </li>

                {
                    !user && (

                        <>
                            <li>

                                <Link to="/login">
                                    Iniciar sesión
                                </Link>

                            </li>

                            <li>

                                <Link to="/register">
                                    Registrarse
                                </Link>

                            </li>
                        </>

                    )
                }

                {
                    user && user.rol === 'Cliente' && (

                        <>

                            <li>

                                <Link to="/favoritos">
                                    Favoritos
                                </Link>

                            </li>

                            <li>

                                <Link to="/carrito">
                                    Carrito
                                </Link>

                            </li>

                            <li>

                                <Link to="/perfil">
                                    Perfil
                                </Link>

                            </li>

                        </>

                    )
                }

                {
                    user && user.rol === 'Administrador' && (

                        <>

                            <li>

                                <Link to="/admin/productos">
                                    Productos
                                </Link>

                            </li>

                            <li>

                                <Link to="/admin/categorias">
                                    Categorías
                                </Link>

                            </li>

                            <li>

                                <Link to="/admin/usuarios">
                                    Usuarios
                                </Link>

                            </li>

                            <li>

                                <Link to="/admin/pedidos">
                                    Pedidos
                                </Link>

                            </li>

                            <li>

                                <Link to="/admin/movimientos">
                                    Movimientos
                                </Link>

                            </li>

                        </>

                    )
                }

                {
                    user && (

                        <li>

                            <button onClick={handleLogout}>
                                Cerrar sesión
                            </button>

                        </li>

                    )
                }

            </ul>

        </nav>

    )

}

export default Navbar