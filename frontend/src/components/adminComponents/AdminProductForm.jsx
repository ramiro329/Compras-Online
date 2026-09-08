import React, { useEffect, useState } from 'react'
import {
    createProduct,
    updateProduct
} from '../../services/productService'
import { getAllCategories } from '../../services/categoryService'

import './AdminProductForm.css'

const AdminProductForm = ({
    producto = null,
    onCancel,
    onSuccess
}) => {

    const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stock_minimo: '',
    categoria_id: '',
    imagen: ''
})
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



    useEffect(() => {

        

        if (producto) {

            setFormulario({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                stock: producto.stock,
                stock_minimo: producto.stock_minimo,
                categoria_id: producto.categoria_id,
                imagen: producto.imagen || ''
            })

        }

    }, [producto])


    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            if (producto) {

                await updateProduct(
                    producto.id,
                    formulario
                )

            } else {

                await createProduct(formulario)

            }

            onSuccess()

        } catch (error) {

            console.error(error)

        }

    }


   
return (
    <div className="admin-product-form">

        <div className="admin-product-form-header">
            <h3>
                {producto ? 'Editar producto' : 'Crear producto'}
            </h3>

            <p>
                {producto
                    ? 'Modifica los datos del producto.'
                    : 'Completa los datos para agregar un nuevo producto.'
                }
            </p>
        </div>

        <form onSubmit={handleSubmit} className="producto-form">

            <div className="form-grupo">
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formulario.nombre}
                    onChange={handleChange}
                />
            </div>

            <div className="form-grupo">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    placeholder="Descripción del producto"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    rows="4"
                />
            </div>

            <div className="form-fila">

                <div className="form-grupo">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        value={formulario.precio}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-grupo">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formulario.stock}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-grupo">
                    <label>Stock mínimo</label>
                    <input
                        type="number"
                        name="stock_minimo"
                        placeholder="Stock mínimo"
                        value={formulario.stock_minimo}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="form-grupo">
                <label>Categoría</label>

                <select
                    name="categoria_id"
                    value={formulario.categoria_id}
                    onChange={handleChange}
                >
                    <option value="">
                        Seleccionar categoría
                    </option>

                    {categorias.map((categoria) => (
                        <option
                            key={categoria.id}
                            value={categoria.id}
                        >
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-grupo">
                <label>Imagen</label>

                <input
                    type="text"
                    name="imagen"
                    placeholder="URL de la imagen"
                    value={formulario.imagen}
                    onChange={handleChange}
                />
            </div>

            {formulario.imagen && (
                <div className="producto-preview">
                    <p>Vista previa</p>

                    <div className="preview-imagen-container">
                        <img
                            src={formulario.imagen}
                            alt="Vista previa"
                        />
                    </div>
                </div>
            )}

            <div className="form-acciones">

                <button
                    type="submit"
                    className="producto-form-guardar"
                >
                    {producto
                        ? 'Guardar cambios'
                        : 'Crear producto'
                    }
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className="producto-form-cancelar"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                )}

            </div>

        </form>

    </div>
)



}

export default AdminProductForm