import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    getAllCategories,
    getAllInactiveCategories,
    deleteCategory,
    restoreCategory
} from '../../services/categoryService'

import AdminCategoryForm from './AdminCategoryForm'

import './AdminCategoryTable.css'

const AdminCategoryTable = () => {

    const [categorias, setCategorias] = useState([])
    const [categoriasInactivas, setCategoriasInactivas] = useState([])

    const [mostrarInactivas, setMostrarInactivas] = useState(false)

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [categoriaEditar, setCategoriaEditar] = useState(null)


    const cargarCategorias = async () => {

        try {

            const response = await getAllCategories()

            setCategorias(response)

        } catch (error) {

            console.error(error)

        }

    }


    const cargarCategoriasInactivas = async () => {

        try {

            const response = await getAllInactiveCategories()

            setCategoriasInactivas(response)

        } catch (error) {

            console.error(error)

        }

    }


    useEffect(() => {

        cargarCategorias()
        cargarCategoriasInactivas()

    }, [])


    const eliminarCategoria = async (id) => {

        try {

            await deleteCategory(id)

            await cargarCategorias()
            await cargarCategoriasInactivas()

        } catch (error) {

            console.error(error)

        }

    }


    const restaurarCategoria = async (id) => {

        try {

            await restoreCategory(id)

            await cargarCategorias()
            await cargarCategoriasInactivas()

        } catch (error) {

            console.error(error)

        }

    }


    
return (
    <main className="admin-categorias">

        <div className="admin-categorias-header">

            <div>
                <h2>Categorías</h2>
                <p>Gestionar las categorías de productos.</p>
            </div>

            <div className="admin-categorias-controles">

                <button
                    className="categorias-toggle"
                    onClick={() =>
                        setMostrarInactivas(!mostrarInactivas)
                    }
                >
                    {mostrarInactivas
                        ? 'Mostrar categorías activas'
                        : 'Mostrar categorías eliminadas'
                    }
                </button>

                {!mostrarInactivas && (
                    <button
                        className="categoria-crear"
                        onClick={() => {
                            setCategoriaEditar(null)
                            setMostrarFormulario(true)
                        }}
                    >
                        + Crear categoría
                    </button>
                )}

            </div>

        </div>



        {mostrarFormulario && (

            <div className="categoria-form-container">

                <AdminCategoryForm
                    onCancel={() => setMostrarFormulario(false)}
                    onSuccess={() => {
                        setMostrarFormulario(false)
                        cargarCategorias()
                    }}
                />

            </div>

        )}



        {categoriaEditar && (

            <div className="categoria-form-container">

                <AdminCategoryForm
                    categoria={categoriaEditar}
                    onCancel={() => setCategoriaEditar(null)}
                    onSuccess={() => {
                        setCategoriaEditar(null)
                        cargarCategorias()
                    }}
                />

            </div>

        )}



        {!mostrarInactivas && (

            <div className="categorias-table-container">

                <table className="categorias-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {categorias.map((categoria) => (

                            <tr key={categoria.id}>

                                <td className="categoria-id">
                                    {categoria.id}
                                </td>

                                <td>

                                    {categoria.imagen_url ? (

                                        <img
                                            className="admin-categoria-imagen"
                                            src={categoria.imagen_url}
                                            alt={categoria.nombre}
                                        />

                                    ) : (

                                        <span className="categoria-sin-imagen">
                                            Sin imagen
                                        </span>

                                    )}

                                </td>

                                <td className="categoria-nombre">
                                    {categoria.nombre}
                                </td>

                                <td className="categoria-descripcion">
                                    {categoria.descripcion}
                                </td>

                                <td>

                                    <div className="categoria-acciones">

                                        <button
                                            className="categoria-editar"
                                            onClick={() => {
                                                setMostrarFormulario(false)
                                                setCategoriaEditar(categoria)
                                            }}
                                        >
                                            ✏️ Editar
                                        </button>

                                        <button
                                            className="categoria-eliminar"
                                            onClick={() =>
                                                eliminarCategoria(
                                                    categoria.id
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

        )}



        {mostrarInactivas && (

            <div className="categorias-table-container">

                <table className="categorias-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {categoriasInactivas.map((categoria) => (

                            <tr key={categoria.id}>

                                <td className="categoria-id">
                                    {categoria.id}
                                </td>

                                <td>

                                    {categoria.imagen_url ? (

                                        <img
                                            className="admin-categoria-imagen"
                                            src={categoria.imagen_url}
                                            alt={categoria.nombre}
                                        />

                                    ) : (

                                        <span className="categoria-sin-imagen">
                                            Sin imagen
                                        </span>

                                    )}

                                </td>

                                <td className="categoria-nombre">
                                    {categoria.nombre}
                                </td>

                                <td className="categoria-descripcion">
                                    {categoria.descripcion}
                                </td>

                                <td>

                                    <button
                                        className="categoria-restaurar"
                                        onClick={() =>
                                            restaurarCategoria(
                                                categoria.id
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
)



}

export default AdminCategoryTable