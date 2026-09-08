import React, { useEffect, useState } from 'react'
import {
    getAllOrders,
    getOneOrder,
    updateOrderStatus
} from '../../services/orderService'

import './AdminOrderTable.css'

const AdminOrderTable = () => {

    const [pedidos, setPedidos] = useState([])
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [productos, setProductos] = useState([])
    const [pagina, setPagina] = useState(1)
const [totalPaginas, setTotalPaginas] = useState(1)

    const cargarPedidos = async () => {

    try {

        const response = await getAllOrders(pagina, 10)

        setPedidos(response.pedidos)
        setTotalPaginas(response.totalPages)

    } catch (error) {

        console.error(error)

    }

}


    useEffect(() => {

    cargarPedidos()

}, [pagina])


    const verPedido = async (id) => {

    if (pedidoSeleccionado?.id === id) {

        // Si ya está abierto, lo cerramos
        setPedidoSeleccionado(null)
        setProductos([])

        return
    }

    try {

        // Si está cerrado, lo abrimos
        const response = await getOneOrder(id)

        setPedidoSeleccionado(response.pedido)
        setProductos(response.productos)

    } catch (error) {

        console.error(error)

    }

}


    const marcarComoPagado = async (id) => {

        try {

            await updateOrderStatus(id, 2)

            await cargarPedidos()

            const response = await getOneOrder(id)

            setPedidoSeleccionado(response.pedido)
            setProductos(response.productos)

        } catch (error) {

            console.error(error)

        }

    }


    
return (
    <main className="admin-pedidos">
        

        <div className="admin-pedidos-header">
            <div>
                <h2>Pedidos</h2>
                <p>Consultar y administrar los pedidos realizados.</p>
            </div>
        </div>


        <div className="pedidos-table-container">

            <table className="pedidos-table">

                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Usuario</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {pedidos.map((pedido) => (

                        <tr key={pedido.id}>

                            <td className="pedido-id">
                                #{pedido.id}
                            </td>

                            <td>
                                {pedido.nombre} {pedido.apellido}
                            </td>

                            <td className="pedido-total">
                                ${pedido.total}
                            </td>

                            <td>
                                <span
                                    className={`pedido-estado estado-${pedido.estado_id}`}
                                >
                                    {pedido.estado}
                                </span>
                            </td>

                            <td>

                                <button
                                    className="pedido-ver"
                                    onClick={() => verPedido(pedido.id)}
                                >
                                    {pedidoSeleccionado?.id === pedido.id
                                        ? "Ocultar pedido"
                                        : "Ver pedido"
                                    }
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

        <div className="pedidos-paginacion">

    <button
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
    >
        ← Anterior
    </button>

    <span>
        Página {pagina} de {totalPaginas}
    </span>

    <button
        disabled={pagina === totalPaginas}
        onClick={() => setPagina(pagina + 1)}
    >
        Siguiente →
    </button>

</div>


        
{pedidoSeleccionado && (

    <div className="pedido-modal-overlay">

        <div className="pedido-modal">

            <div className="pedido-modal-header">

                <div>
                    <h3>
                        Pedido #{pedidoSeleccionado.id}
                    </h3>

                    <span
                        className={`pedido-estado estado-${pedidoSeleccionado.estado_id}`}
                    >
                        {pedidoSeleccionado.estado}
                    </span>
                </div>

                <button
                    className="pedido-modal-cerrar"
                    onClick={() => {
                        setPedidoSeleccionado(null)
                        setProductos([])
                    }}
                >
                    ×
                </button>

            </div>


            <div className="pedido-modal-contenido">

                <h4>Productos del pedido</h4>

                <div className="pedido-productos">

                    {productos.map((producto) => (

                        <div
                            className="pedido-producto"
                            key={producto.producto_id}
                        >

                            <div className="pedido-producto-info">

                                <strong>
                                    {producto.nombre}
                                </strong>

                                <span>
                                    Precio unitario: ${producto.precio_unitario}
                                </span>

                            </div>

                            <div className="pedido-producto-cantidad">

                                <span>
                                    Cantidad
                                </span>

                                <strong>
                                    {producto.cantidad}
                                </strong>

                            </div>

                            <div className="pedido-producto-subtotal">

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ${(producto.precio_unitario * producto.cantidad).toFixed(2)}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>


                <div className="pedido-modal-total">

                    <span>
                        Total del pedido
                    </span>

                    <strong>
                        ${pedidoSeleccionado.total}
                    </strong>

                </div>

            </div>


            {pedidoSeleccionado.estado_id === 1 && (

                <div className="pedido-modal-acciones">

                    <button
                        className="pedido-pagado"
                        onClick={() =>
                            marcarComoPagado(
                                pedidoSeleccionado.id
                            )
                        }
                    >
                        ✓ Marcar como pagado
                    </button>

                </div>

            )}

        </div>

    </div>

)}



    </main>
)



}

export default AdminOrderTable