import React, { useEffect, useState } from 'react'

import {
    getProductsWithoutStock,
    getProductsLowStock
} from '../../services/productService'

import './AdminStockAlert.css'

const AdminStockAlert = () => {

    const [productosSinStock, setProductosSinStock] = useState([])
    const [productosStockBajo, setProductosStockBajo] = useState([])


    const cargarAlertas = async () => {

        try {

            const sinStock = await getProductsWithoutStock()
            const stockBajo = await getProductsLowStock()

            setProductosSinStock(sinStock)
            setProductosStockBajo(stockBajo)

        } catch (error) {

            console.error(error)

        }

    }


    useEffect(() => {

        cargarAlertas()

    }, [])


   return (

    <div className="stock-alert">

        <h3 className="stock-alert-title">
            ⚠️ Alertas de stock
        </h3>


        {productosSinStock.length > 0 && (

            <div className="stock-section stock-sin">

                <h4>
                    🔴 Productos sin stock
                </h4>

                <ul>

                    {productosSinStock.map((producto) => (

                        <li key={producto.id}>
                            {producto.nombre}
                        </li>

                    ))}

                </ul>

            </div>

        )}


        {productosStockBajo.length > 0 && (

            <div className="stock-section stock-bajo">

                <h4>
                    🟠 Productos con stock bajo
                </h4>

                <ul>

                    {productosStockBajo.map((producto) => (

                        <li key={producto.id}>
                            <span>
                                {producto.nombre}
                            </span>

                            <span className="stock-cantidad">
                                Stock: {producto.stock}
                            </span>
                        </li>

                    ))}

                </ul>

            </div>

        )}


        {productosSinStock.length === 0 &&
         productosStockBajo.length === 0 && (

            <div className="stock-sin-alertas">

                <span>✓</span>

                <p>
                    No hay alertas de stock.
                </p>

            </div>

        )}

    </div>

)

}

export default AdminStockAlert