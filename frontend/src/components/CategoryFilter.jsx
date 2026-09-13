import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../services/categoryService'
import './CategoryFilter.css'
const CategoryFilter = ({ onCategoryChange, value }) => {

    const [categorias, setCategorias] = useState([])

    const cargarCategorias = async () => {

        try {

            const response = await getAllCategories()

            setCategorias(response)

        } catch (error) {

            console.error(error)

        }

    }


    useEffect(() => {

        cargarCategorias()

    }, [])


    return (
        <select  className="category-filter"

        value={value}
        onChange={(e) => onCategoryChange(e.target.value)}
        >

            <option value="">
                Todas las categorías
        </option>

            {
                categorias.map((categoria) => (

                    <option 
                        key={categoria.id}
                        value={categoria.id}
                    >
                        {categoria.nombre}
                    </option>

                ))
            }

        </select>
    )
}

export default CategoryFilter