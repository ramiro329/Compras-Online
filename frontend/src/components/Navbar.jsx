import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/Navbar.css'
import useAuthStore from '../store/authStore'

const Navbar = () => {

    const navigate = useNavigate()

    const { user, logoutUser } = useAuthStore()

    const handleLogout = () => {

        logoutUser()

        navigate('/')

    }

   return (

    <nav className="navbar">

        

        <div className="navbar-logo">
             <img 
        src="/favicon.svg" 
        alt="Logo Electronica"
        className="navbar-logo-image"
    />

            Electronica

       
    </div>

         

        <ul className="navbar-menu">

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

                        
                    </>
                )
            }

            {
                user && user.rol === 'Administrador' && (
                    <>
                        <li>
                            <Link to="/admin">
                                Panel de administración
                            </Link>
                        </li>

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

                        
                    </>
                )
            }

            {
                user && (
                    <li>
                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
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