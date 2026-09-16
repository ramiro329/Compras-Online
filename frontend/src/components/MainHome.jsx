import React, { useEffect, useState } from 'react'
import { getAllProducts, searchProducts, getProductsByCategory } from '../services/productService'
import ProductCard from './ProductCard'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import '../components/MainHome.css'
const MainHome = () => {

    const [productos, setProductos] = useState([])

    const [loading, setLoading] = useState(true)

    const [busqueda, setBusqueda] = useState('')

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

    const [pagina, setPagina] = useState(1)
    
    const [totalPaginas, setTotalPaginas] = useState(1)

    

   


   
    const cargarProductos = async () => {

    try {

        let response

        if (busqueda.trim() !== '') {

            response = await searchProducts(
                busqueda,
                pagina,
                10
            )

        } else if (categoriaSeleccionada !== '') {

            response = await getProductsByCategory(
                categoriaSeleccionada,
                pagina,
                12
            )

        } else {

            response = await getAllProducts(
                pagina,
                12
            )

        }

        setProductos(response.productos)
        setTotalPaginas(response.totalPages)

    } catch (error) {

        console.error(error)

    } finally {

        setLoading(false)

    }

}


    useEffect(() => {

    setPagina(1)

}, [busqueda, categoriaSeleccionada])


  useEffect(() => {

    cargarProductos()

}, [busqueda, categoriaSeleccionada, pagina])



    if (loading) {

        return <h2>Cargando productos...</h2>

    }

    return (

    <div className="main-home">

        <Navbar />

        <div className="home-filters">

            <SearchBar
                value={busqueda}
                onChange={setBusqueda}
            />

            <CategoryFilter
                value={categoriaSeleccionada}
                onCategoryChange={setCategoriaSeleccionada}
            />

        </div>

        <main className="home-content">

            <h1>Productos</h1>

            <div className="productos-container">

                {
                    productos.length > 0 ?

                        productos.map((producto) => (

                            <ProductCard
                                key={producto.id}
                                producto={producto}
                            />

                        ))

                        :

                        <h3 className="sin-productos">
                            No hay productos disponibles.
                        </h3>
                }

            </div>


            <div className="paginacion">

                <button
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                >
                    Anterior
                </button>

                <span>
                    Página {pagina} de {totalPaginas}
                </span>

                <button
                    disabled={pagina === totalPaginas}
                    onClick={() => setPagina(pagina + 1)}
                >
                    Siguiente
                </button>

            </div>

        </main>

    </div>

)

}

export default MainHome