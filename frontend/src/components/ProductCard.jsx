import React from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/authStore'
import useFavoriteStore from '../store/useFavoriteStore'

const ProductCard = ({ producto }) => {

 

    const { user } = useAuthStore()

    const { agregarProducto } = useCartStore()

    const { 
    agregarFavorito,
    eliminarFavorito,
    esFavorito
} = useFavoriteStore()

const favorito = esFavorito(producto.id)

    const handleAgregarFavorito = () => {

    if (!user) {

        alert('Debes iniciar sesión para agregar favoritos')
        return

    }


    agregarFavorito(
        user.id,
        producto.id
    )

}

    const handleAgregarCarrito = () => {

    if (!user) {

        alert('Debes iniciar sesión para agregar productos al carrito')
        return

    }


    const data = {

        usuario_id: user.id,
        producto_id: producto.id,
        cantidad: 1

    }


    agregarProducto(user.id, data)

}

    return (

        <div className="product-card">

            <img
                src={producto.imagen_principal || '/sin-imagen.png'}
                alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>

            <p>
                ${producto.precio}
            </p>

            <p>
                Stock: {producto.stock}
            </p>

            <button
    onClick={() => {

        if (!user) {

            alert('Debes iniciar sesión para agregar favoritos')
            return

        }


        if (favorito) {

            eliminarFavorito(
                user.id,
                producto.id
            )

        } else {

            agregarFavorito(
                user.id,
                producto.id
            )

        }

    }}
>
    {favorito ? '💔 Quitar favorito' : '❤️ Favorito'}
</button>

            <button onClick={handleAgregarCarrito}>
    🛒 Agregar al carrito
</button>

            <Link to={`/producto/${producto.id}`}>
    👁 Ver detalle
</Link>

        </div>

    )

}

export default ProductCard