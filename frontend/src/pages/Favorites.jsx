import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useFavoriteStore from '../store/useFavoriteStore'
import useAuthStore from '../store/authStore'
import { Link } from 'react-router-dom'
import '../pages/Favorites.css'
import Footer from '../components/Footer'

const Favorites = () => {

    const { user } = useAuthStore()

    const {
        favoritos,
        cargarFavoritos,
        eliminarFavorito
    } = useFavoriteStore()


    useEffect(() => {

        if (user) {

            cargarFavoritos(user.id)

        }

    }, [user])


    if (!user) {

        return <h2>Debes iniciar sesión para ver tus favoritos.</h2>

    }


    return (
    <>
        <Navbar />

        <main className="favoritos-page">

            <h1 className="favoritos-titulo">
                Mis favoritos
            </h1>

            {
                favoritos.length > 0 ?

                <div className="favoritos-grid">

                    {favoritos.map((producto) => (

                        <div
                            className="favorito-card"
                            key={producto.id}
                        >

                            <div className="favorito-imagen-container">
                                <img
                                    src={producto.imagen || '/sin-imagen.png'}
                                    alt={producto.nombre}
                                />
                            </div>

                            <div className="favorito-info">

                                <h3>
                                    {producto.nombre}
                                </h3>

                                <p className="favorito-precio">
                                    ${producto.precio}
                                </p>

                                <p className="favorito-stock">
                                    Stock: {producto.stock}
                                </p>

                                <button
                                    className="favorito-quitar"
                                    onClick={() =>
                                        eliminarFavorito(
                                            user.id,
                                            producto.id
                                        )
                                    }
                                >
                                    💔 Quitar favorito
                                </button>

                                <Link
                                    className="favorito-detalle"
                                    to={`/producto/${producto.id}`}
                                >
                                    👁 Ver detalle
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

                :

                <div className="favoritos-vacio">
                    <h2>
                        No tienes productos favoritos.
                    </h2>

                    <Link to="/">
                        Ver productos
                    </Link>
                </div>
            }

        </main>
        <Footer />
    </>
)

}


export default Favorites