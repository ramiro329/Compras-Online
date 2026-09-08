import React from 'react'
import AdminProductTable from '../../components/adminComponents/AdminProductTable'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import './VolverBoton.css'
import './Paginas.css'
const AdminProductos = () => {

    return (
        <>
            <Navbar />
            <div className="fondo-pagina">

            <Link to="/admin">
                <button className="volver-boton">
                    ← Panel De Admin
                </button>
            </Link>
            

                    <h1 className="pagina-titulo">Administración de Productos</h1>
            

            <AdminProductTable />

            {/* <AdminProductForm />

            <AdminCategoryTable /> */}
            </div>

        </>
    )

}

export default AdminProductos