import React from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/authStore'
import useFavoriteStore from '../store/useFavoriteStore'    
import '../components/ProductCard.css'
import { toast } from 'react-toastify'
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

        toast.info('Debes iniciar sesión para agregar favoritos')
        return

    }

    if (favorito) {

        eliminarFavorito(
            user.id,
            producto.id
        )

        toast.success('Producto quitado de favoritos')

    } else {

        agregarFavorito(
            user.id,
            producto.id
        )

        toast.success('Producto agregado a favoritos')

    }

}

    const handleAgregarCarrito = async () => {

    if (!user) {

        toast.info('Debes iniciar sesión para agregar productos al carrito')
        return

    }

    const data = {

        usuario_id: user.id,
        producto_id: producto.id,
        cantidad: 1

    }

    await agregarProducto(user.id, data)

    toast.success('Producto agregado al carrito')

}

    return (

    <div className="product-card">

        <div className="product-image-container">
            <img
                src={producto.imagen || '/sin-imagen.png'}
                alt={producto.nombre}
            />
        </div>

        <div className="product-info">

            <h3>{producto.nombre}</h3>

            <p className="product-price">
                ${producto.precio}
            </p>

            <p className="product-stock">
                Stock: {producto.stock}
            </p>

            <button
    className="product-button favorite-button"
    onClick={handleAgregarFavorito}
>
    {favorito ? '💔 Quitar favorito' : '❤️ Favorito'}
</button>

            <button
                className="product-button cart-button"
                onClick={handleAgregarCarrito}
            >
                🛒 Agregar al carrito
            </button>

            <Link
                className="product-detail"
                to={`/producto/${producto.id}`}
            >
                👁 Ver detalle
            </Link>

        </div>

    </div>

)

}

export default ProductCard