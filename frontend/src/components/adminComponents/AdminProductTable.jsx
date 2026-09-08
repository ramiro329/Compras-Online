import React, { useEffect, useState } from 'react'
import {
    getAllProducts,
    getAllInactiveProducts,
    deleteProduct,
    restoreProduct
} from '../../services/productService'

import AdminProductForm from './AdminProductForm'

import './AdminProductTable.css'

const AdminProductTable = () => {
    
 const [pagina, setPagina] = useState(1)
 const [totalPaginas, setTotalPaginas] = useState(1)

    const [productos, setProductos] = useState([])
    const [productosInactivos, setProductosInactivos] = useState([])

    const [mostrarInactivos, setMostrarInactivos] = useState(false)

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const [productoEditar, setProductoEditar] = useState(null)



    const cargarProductos = async () => {
    try {
        const response = await getAllProducts(pagina, 10)

        setTotalPaginas(response.totalPages)

        if (pagina > response.totalPages && response.totalPages > 0) {
            setPagina(response.totalPages)
            return
        }

        setProductos(response.productos)

    } catch (error) {
        console.error(error)
    }
}


    const cargarProductosInactivos = async () => {

        try {

            const response = await getAllInactiveProducts()

            setProductosInactivos(response.productos)

        } catch (error) {

            console.error(error)

        }

    }


    useEffect(() => {

        cargarProductos()
        cargarProductosInactivos()

    }, [pagina])


    const eliminarProducto = async (id) => {

        try {

            await deleteProduct(id)

            await cargarProductos()
            await cargarProductosInactivos()

        } catch (error) {

            console.error(error)

        }

    }


    const restaurarProducto = async (id) => {

        try {

            await restoreProduct(id)

            await cargarProductos()
            await cargarProductosInactivos()

        } catch (error) {

            console.error(error)

        }

    }


    return (
    <>
        <main className="admin-productos">

            <div className="admin-productos-header">

                <div>
                    <h2>Productos</h2>
                    <p>Gestionar productos de la tienda</p>
                </div>

                <div className="admin-productos-controles">

                    <button
                        className="productos-toggle"
                        onClick={() =>
                            setMostrarInactivos(!mostrarInactivos)
                        }
                    >
                        {mostrarInactivos
                            ? "Mostrar productos activos"
                            : "Mostrar productos eliminados"
                        }
                    </button>

                    {!mostrarInactivos && (
                        <button
                            className="producto-crear"
                            onClick={() => {
                                setMostrarFormulario(true)
                                setProductoEditar(null)
                            }}
                        >
                            + Crear producto
                        </button>
                    )}

                </div>

            </div>


            {mostrarFormulario && (

                <div className="producto-form-container">

                    <AdminProductForm
                        onCancel={() => setMostrarFormulario(false)}
                        onSuccess={() => {
                            setMostrarFormulario(false)
                            cargarProductos()
                        }}
                    />

                </div>

            )}


            {productoEditar && (

                <div className="producto-form-container">

                    <AdminProductForm
                        producto={productoEditar}
                        onCancel={() => setProductoEditar(null)}
                        onSuccess={() => {
                            setProductoEditar(null)
                            cargarProductos()
                        }}
                    />

                </div>

            )}


            {!mostrarInactivos && (

                <>

                    <div className="productos-table-container">

                        <table className="productos-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Stock mínimo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {productos.map((producto) => (

                                    <tr key={producto.id}>

                                        <td>
                                            {producto.id}
                                        </td>

                                        <td>

                                            {producto.imagen ? (

                                                <img
                                                    className="admin-producto-imagen"
                                                    src={producto.imagen}
                                                    alt={producto.nombre}
                                                />

                                            ) : (

                                                <span className="sin-imagen">
                                                    Sin imagen
                                                </span>

                                            )}

                                        </td>

                                        <td className="producto-nombre">
                                            {producto.nombre}
                                        </td>

                                        <td>
                                            ${producto.precio}
                                        </td>

                                        <td>
                                            {producto.stock}
                                        </td>

                                        <td>
                                            {producto.stock_minimo}
                                        </td>

                                        <td>

                                            <div className="producto-acciones">

                                                <button
                                                    className="producto-editar"
                                                    onClick={() =>
                                                        setProductoEditar(producto)
                                                    }
                                                >
                                                    ✏️ Editar
                                                </button>

                                                <button
                                                    className="producto-eliminar"
                                                    onClick={() =>
                                                        eliminarProducto(
                                                            producto.id
                                                        )
                                                    }
                                                >
                                                    🗑 Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    <div className="productos-paginacion">

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

                </>

            )}


            {mostrarInactivos && (

                <div className="productos-table-container">

                    <table className="productos-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {productosInactivos.map((producto) => (

                                <tr key={producto.id}>

                                    <td>
                                        {producto.id}
                                    </td>

                                    <td className="producto-nombre">
                                        {producto.nombre}
                                    </td>

                                    <td>
                                        ${producto.precio}
                                    </td>

                                    <td>

                                        <button
                                            className="producto-restaurar"
                                            onClick={() =>
                                                restaurarProducto(
                                                    producto.id
                                                )
                                            }
                                        >
                                            ↩ Restaurar
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </main>
    </>
)
}

export default AdminProductTable