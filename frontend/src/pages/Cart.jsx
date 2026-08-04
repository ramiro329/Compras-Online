import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/authStore'
import { createPayment } from '../services/paymentService'
const Cart = () => {

    const { user } = useAuthStore()

    const {
        carrito,
        productos,
        cargarCarrito,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito
    } = useCartStore()


    useEffect(() => {

        if (user) {

            cargarCarrito(user.id)

        }

    }, [user, cargarCarrito])


    if (!user) {

        return <h2>Debes iniciar sesión para ver tu carrito.</h2>

    }


    const total = productos.reduce((acumulador, producto) => {

        return acumulador + Number(producto.subtotal)

    }, 0)




    const pagarMercadoPago = async () => {

    try {

        const response = await createPayment()

        console.log(response)

        window.location.href = response.init_point

    } catch (error) {

        console.error(error)

    }

}


    return (

        <>

            <Navbar />

            <h1>Mi carrito</h1>

            {

                productos.length > 0 ?

                    <>

                        {

                            productos.map((producto) => (

                                <div key={producto.id}>

                                    <h3>
                                        {producto.nombre}
                                    </h3>

                                    <p>
                                        ${producto.precio}
                                    </p>

                                    <p>
                                        Cantidad: {producto.cantidad}
                                    </p>

                                    <p>
                                        Subtotal: ${producto.subtotal}
                                    </p>

                                    <button
                                        onClick={() =>
                                            actualizarCantidad(
                                                user.id,
                                                producto.id,
                                                producto.cantidad + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => {

                                            if (producto.cantidad > 1) {

                                                actualizarCantidad(
                                                    user.id,
                                                    producto.id,
                                                    producto.cantidad - 1
                                                )

                                            }

                                        }}
                                    >
                                        -
                                    </button>

                                    <button
                                        onClick={() =>
                                            eliminarProducto(
                                                user.id,
                                                producto.id
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            ))

                        }

                        <h2>
                            Total: ${total}
                        </h2>

                        <button
                            onClick={() =>
                                vaciarCarrito(
                                    user.id,
                                    carrito.id
                                )
                            }
                        >
                            Vaciar carrito
                        </button>

                        <button onClick={pagarMercadoPago}>
    Pagar con Mercado Pago
</button>

                    </>

                    :

                    <h2>
                        Tu carrito está vacío.
                    </h2>

            }

        </>

    )

}

export default Cart