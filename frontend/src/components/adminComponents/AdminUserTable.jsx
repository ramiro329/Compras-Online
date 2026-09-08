import React, { useEffect, useState } from 'react'

import {
    getAllUsersActives,
    getAllUsersInactives,
    deleteUser,
    restoreUser,
    searchUserByName
} from '../../services/userService'
import './AdminUserTable.css'

const AdminUserTable = () => {

    const [usuarios, setUsuarios] = useState([])
    const [usuariosInactivos, setUsuariosInactivos] = useState([])

    const [mostrarInactivos, setMostrarInactivos] = useState(false)

    const [busqueda, setBusqueda] = useState('')


    const cargarUsuarios = async () => {

        try {

            let response

            if (busqueda.trim() !== '') {

                response = await searchUserByName(busqueda)

            } else {

                response = await getAllUsersActives()

            }

            setUsuarios(response)

        } catch (error) {

            console.error(error)

        }

    }


    const cargarUsuariosInactivos = async () => {

        try {

            const response = await getAllUsersInactives()

            setUsuariosInactivos(response)

        } catch (error) {

            console.error(error)

        }

    }


    useEffect(() => {

        cargarUsuarios()
        cargarUsuariosInactivos()

    }, [busqueda])


    const eliminarUsuario = async (id) => {

        try {

            await deleteUser(id)

            await cargarUsuarios()
            await cargarUsuariosInactivos()

        } catch (error) {

            console.error(error)

        }

    }


    const restaurarUsuario = async (id) => {

        try {

            await restoreUser(id)

            await cargarUsuarios()
            await cargarUsuariosInactivos()

        } catch (error) {

            console.error(error)

        }

    }


    return (
    <div className="admin-users">

        <div className="admin-users-header">

            <div>
                <h2>Usuarios</h2>
                <p>Gestionar usuarios registrados</p>
            </div>

            <div className="admin-users-controls">

                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <button
                    className="usuarios-toggle"
                    onClick={() =>
                        setMostrarInactivos(!mostrarInactivos)
                    }
                >
                    {mostrarInactivos
                        ? 'Mostrar usuarios activos'
                        : 'Mostrar usuarios eliminados'
                    }
                </button>

            </div>

        </div>


        {!mostrarInactivos && (

            <div className="usuarios-table-container">

                <table className="usuarios-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                            <tr key={usuario.id}>

                                <td>{usuario.id}</td>

                                <td>{usuario.nombre}</td>

                                <td>{usuario.apellido}</td>

                                <td>{usuario.email}</td>

                                <td>
                                    <span className="usuario-rol">
                                        {usuario.rol}
                                    </span>
                                </td>

                                <td>

                                    <button
                                        className="usuario-eliminar"
                                        onClick={() =>
                                            eliminarUsuario(usuario.id)
                                        }
                                    >
                                        🗑 Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        )}


        {mostrarInactivos && (

            <div className="usuarios-table-container">

                <table className="usuarios-table usuarios-inactivos">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {usuariosInactivos.map((usuario) => (

                            <tr key={usuario.id}>

                                <td>{usuario.id}</td>

                                <td>{usuario.nombre}</td>

                                <td>{usuario.apellido}</td>

                                <td>{usuario.email}</td>

                                <td>
                                    <span className="usuario-rol">
                                        {usuario.rol}
                                    </span>
                                </td>

                                <td>

                                    <button
                                        className="usuario-restaurar"
                                        onClick={() =>
                                            restaurarUsuario(usuario.id)
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

    </div>
)

}


export default AdminUserTable