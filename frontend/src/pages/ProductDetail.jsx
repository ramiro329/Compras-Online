import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import Navbar from '../components/Navbar'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/authStore'

const ProductDetail = () => {

    const { id } = useParams()

    const { user } = useAuthStore()

    const { agregarProducto } = useCartStore()

    const [producto, setProducto] = useState(null)

    const [loading, setLoading] = useState(true)


    const cargarProducto = async () => {

        try {

            const response = await getProductById(id)

            console.log(response)

            setProducto(response[0])

        } catch (error) {

            console.error(error)

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {

        cargarProducto()

    }, [id])


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


    if (loading) {

        return <h2>Cargando producto...</h2>

    }


    if (!producto) {

        return <h2>Producto no encontrado</h2>

    }


    return (

        <>

            <Navbar />

            <div className="detalle-producto">

                <img
                    src={producto.imagen_principal || '/sin-imagen.png'}
                    alt={producto.nombre}
                />


                <div>

                    <h1>
                        {producto.nombre}
                    </h1>


                    <p>
                        {producto.descripcion}
                    </p>


                    <h2>
                        ${producto.precio}
                    </h2>


                    <p>
                        Stock disponible: {producto.stock}
                    </p>


                    <p>
                        Categoría: {producto.categoria}
                    </p>


                    <button onClick={handleAgregarCarrito}>
                        🛒 Agregar al carrito
                    </button>

                </div>

            </div>

        </>

    )

}

export default ProductDetail