import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useFavoriteStore from '../store/useFavoriteStore'
import useAuthStore from '../store/authStore'
import { Link } from 'react-router-dom'


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

            <h1>
                Mis favoritos
            </h1>


            {
                favoritos.length > 0 ?

                favoritos.map((producto) => (

                    <div key={producto.id}>

                        <img
                            src={producto.imagen || '/sin-imagen.png'}
                            alt={producto.nombre}
                        />


                        <h3>
                            {producto.nombre}
                        </h3>


                        <p>
                            ${producto.precio}
                        </p>


                        <p>
                            Stock: {producto.stock}
                        </p>


                        <button
                            onClick={() =>
                                eliminarFavorito(
                                    user.id,
                                    producto.id
                                )
                            }
                        >
                            💔 Quitar favorito
                        </button>


                        <Link to={`/producto/${producto.id}`}>
                            👁 Ver detalle
                        </Link>


                    </div>

                ))

                :

                <h2>
                    No tienes productos favoritos.
                </h2>

            }


        </>

    )

}


export default Favorites