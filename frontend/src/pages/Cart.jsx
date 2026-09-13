import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/authStore'
import { createPayment } from '../services/paymentService'
import { createOrder } from "../services/orderService";
import { Link } from 'react-router-dom'
import '../pages/Cart.css'
import Footer from '../components/Footer'
const Cart = () => {
const [metodoPago, setMetodoPago] = useState("mercadopago");
const [datosEntrega, setDatosEntrega] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    referencia: ""
});
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

const confirmarPedido = async () => {
    

    try {
        if (
    !datosEntrega.nombre ||
    !datosEntrega.telefono ||
    !datosEntrega.direccion ||
    !datosEntrega.ciudad ||
    !datosEntrega.provincia
        )

       {

    alert("Complete todos los datos para la entrega.");

    return;

}
console.log("PRODUCTOS DEL CARRITO:");
console.log(productos);

const pedido = {
    usuario_id: user.id,
    total,
    productos: productos.map((producto) => ({
    producto_id: producto.producto_id,
    cantidad: producto.cantidad,
    precio_unitario: producto.precio
}))
};

console.log("PEDIDO A ENVIAR:");
console.log(JSON.stringify(pedido, null, 2));

const response = await createOrder(pedido);



console.log(response);

const listaProductos = productos
    .map(
        (producto) =>
            `• ${producto.nombre}
Cantidad: ${producto.cantidad}
Subtotal: $${producto.subtotal}`
    )
    .join("\n\n");



const mensaje = `

    NUEVO PEDIDO

 Pedido #${response.pedido_id}

 Cliente:
${datosEntrega.nombre}

 Teléfono:
${datosEntrega.telefono}

 Dirección:
${datosEntrega.direccion}

 Ciudad:
${datosEntrega.ciudad}

 Provincia:
${datosEntrega.provincia}

 Referencia:
${datosEntrega.referencia || "Sin referencia"}

━━━━━━━━━━━━━━

${listaProductos}

━━━━━━━━━━━━━━

 Total: $${total}

 Forma de pago:
Efectivo / Transferencia

IMPORTANTE:
Si elije transferencia, recuerde mandar comprobante.

ALIAS:
rami.mp`;






alert(
` Pedido registrado correctamente.

Se abrirá WhatsApp con el pedido listo para enviar.

 IMPORTANTE:
El pedido NO quedará confirmado hasta que envíes ese mensaje y un administrador verifique el pago.

Podrás consultar el estado de tu pedido desde la sección "Mis pedidos".`
);

const telefonoNegocio = "543816991773";

window.location.href =
    `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;

await vaciarCarrito(user.id, carrito.id);
    } catch (error) {

        console.error(error)

    }

}

const handleChange = (e) => {

    setDatosEntrega({
        ...datosEntrega,
        [e.target.name]: e.target.value
    });

};


    return (
    <>
        <Navbar />

        <main className="carrito-page">

            <h1 className="carrito-titulo">
                Mi carrito
            </h1>

            {
                productos.length > 0 ?

                    <div className="carrito-contenedor">

                        <section className="carrito-productos">

                            {
                                productos.map((producto) => (

                                    <div
                                        className="carrito-producto"
                                        key={producto.id}
                                    >

                                        <div className="carrito-producto-info">

                                            <h3>
                                                {producto.nombre}
                                            </h3>

                                            <p className="carrito-precio">
                                                ${producto.precio}
                                            </p>

                                            <p>
                                                Subtotal: ${producto.subtotal}
                                            </p>

                                        </div>

                                        <div className="carrito-cantidad">

                                            <span>
                                                Cantidad:
                                            </span>

                                            <div className="cantidad-controles">

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
                                                    −
                                                </button>

                                                <span>
                                                    {producto.cantidad}
                                                </span>

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

                                            </div>

                                        </div>

                                        <button
                                            className="carrito-eliminar"
                                            onClick={() =>
                                                eliminarProducto(
                                                    user.id,
                                                    producto.id
                                                )
                                            }
                                        >
                                            🗑 Eliminar
                                        </button>

                                    </div>

                                ))
                            }

                        </section>


                        <aside className="carrito-resumen">

                            <h2>
                                Resumen de compra
                            </h2>

                            <div className="carrito-total">
                                <span>Total:</span>
                                <strong>${total}</strong>
                            </div>


                            <h3>
                                Método de pago
                            </h3>

                            <label className="metodo-pago">

                                <input
                                    type="radio"
                                    name="metodoPago"
                                    value="mercadopago"
                                    checked={metodoPago === "mercadopago"}
                                    onChange={(e) =>
                                        setMetodoPago(e.target.value)
                                    }
                                />

                                Mercado Pago

                            </label>


                            <label className="metodo-pago">

                                <input
                                    type="radio"
                                    name="metodoPago"
                                    value="manual"
                                    checked={metodoPago === "manual"}
                                    onChange={(e) =>
                                        setMetodoPago(e.target.value)
                                    }
                                />

                                Efectivo / Transferencia

                            </label>


                            <p className="metodo-descripcion">
                                {
                                    metodoPago === "mercadopago"
                                        ? "El pago será procesado automáticamente mediante Mercado Pago."
                                        : "El pedido será enviado por WhatsApp y un administrador confirmará el pago."
                                }
                            </p>


                            {
                                metodoPago === "manual" && (

                                    <div className="datos-entrega">

                                        <h3>
                                            Datos para la entrega
                                        </h3>

                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre y apellido"
                                            value={datosEntrega.nombre}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder="Teléfono"
                                            value={datosEntrega.telefono}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="direccion"
                                            placeholder="Dirección"
                                            value={datosEntrega.direccion}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="ciudad"
                                            placeholder="Ciudad"
                                            value={datosEntrega.ciudad}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="provincia"
                                            placeholder="Provincia"
                                            value={datosEntrega.provincia}
                                            onChange={handleChange}
                                        />

                                        <textarea
                                            name="referencia"
                                            placeholder="Referencia (opcional)"
                                            value={datosEntrega.referencia}
                                            onChange={handleChange}
                                        />

                                    </div>

                                )
                            }


                            <button
                                className="carrito-vaciar"
                                onClick={() =>
                                    vaciarCarrito(
                                        user.id,
                                        carrito.id
                                    )
                                }
                            >
                                Vaciar carrito
                            </button>


                            <button
                                className="carrito-confirmar"
                                onClick={() => {

                                    if (metodoPago === "mercadopago") {

                                        pagarMercadoPago()

                                    } else {

                                        confirmarPedido()

                                    }

                                }}
                            >
                                Confirmar compra
                            </button>

                        </aside>

                    </div>

                    :

                    <div className="carrito-vacio">

                        <h2>
                            Tu carrito está vacío.
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

export default Cart