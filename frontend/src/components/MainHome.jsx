import React, { useEffect, useState } from 'react'
import { getAllProducts, searchProducts, getProductsByCategory } from '../services/productService'
import ProductCard from './ProductCard'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
const MainHome = () => {

    const [productos, setProductos] = useState([])

    const [loading, setLoading] = useState(true)

    const [busqueda, setBusqueda] = useState('')

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

    

   


   
    const cargarProductos = async () => {

        try {

            let response

           if(busqueda.trim() !== '') {

    response = await searchProducts(busqueda)

} else if(categoriaSeleccionada !== '') {

    response = await getProductsByCategory(categoriaSeleccionada)

} else {

    response = await getAllProducts()

}

            setProductos(response)

        } catch (error) {

            console.error(error)

        } finally {

            setLoading(false)

        }

    }


  useEffect(() => {

    cargarProductos()

}, [busqueda, categoriaSeleccionada])



    if (loading) {

        return <h2>Cargando productos...</h2>

    }

    return (

        <>

        <Navbar />

        <SearchBar
        value={busqueda}
        onChange={setBusqueda}
                          />

                          <CategoryFilter 
                            value={categoriaSeleccionada}
                                onCategoryChange={setCategoriaSeleccionada}
                                                                            />

            <h1>Productos</h1>

            {
                productos.length > 0 ?

                    productos.map((producto) => (

                        <ProductCard
                            key={producto.id}
                            producto={producto}
                        />

                    ))

                    :

                    <h3>No hay productos disponibles.</h3>

            }

        </>

    )

}

export default MainHome