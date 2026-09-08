import React, { useEffect, useState } from 'react'
import {
    createCategory,
    updateCategory
} from '../../services/categoryService'
import './AdminCategoryForm.css'
const AdminCategoryForm = ({
    categoria = null,
    onCancel,
    onSuccess
}) => {

    const [formulario, setFormulario] = useState({
        nombre: '',
        descripcion: '',
        imagen_url: ''
    })


    useEffect(() => {

        if (categoria) {

            setFormulario({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                imagen_url: categoria.imagen_url || ''
            })

        } else {

            setFormulario({
                nombre: '',
                descripcion: '',
                imagen_url: ''
            })

        }

    }, [categoria])


    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            if (categoria) {

                await updateCategory(
                    categoria.id,
                    formulario
                )

            } else {

                await createCategory(formulario)

            }

            onSuccess()

        } catch (error) {

            console.error(error)

        }

    }


    
return (
    <div className="admin-category-form">

        <div className="admin-category-form-header">

            <h3>
                {categoria
                    ? 'Editar categoría'
                    : 'Crear categoría'
                }
            </h3>

            <p>
                {categoria
                    ? 'Modifica los datos de la categoría.'
                    : 'Completa los datos para agregar una nueva categoría.'
                }
            </p>

        </div>


        <form
            onSubmit={handleSubmit}
            className="categoria-form"
        >

            <div className="categoria-form-grupo">

                <label>Nombre</label>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la categoría"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                />

            </div>


            <div className="categoria-form-grupo">

                <label>Descripción</label>

                <textarea
                    name="descripcion"
                    placeholder="Descripción de la categoría"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    rows="4"
                />

            </div>


            <div className="categoria-form-grupo">

                <label>Imagen</label>

                <input
                    type="text"
                    name="imagen_url"
                    placeholder="URL de la imagen"
                    value={formulario.imagen_url}
                    onChange={handleChange}
                />

            </div>


            {formulario.imagen_url && (

                <div className="categoria-preview">

                    <p>Vista previa</p>

                    <div className="categoria-preview-imagen">

                        <img
                            src={formulario.imagen_url}
                            alt="Vista previa"
                        />

                    </div>

                </div>

            )}


            <div className="categoria-form-acciones">

                <button
                    type="submit"
                    className="categoria-form-guardar"
                >
                    {categoria
                        ? 'Guardar cambios'
                        : 'Crear categoría'
                    }
                </button>


                {onCancel && (

                    <button
                        type="button"
                        className="categoria-form-cancelar"
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

export default AdminCategoryForm