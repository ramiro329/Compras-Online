import React from 'react'
import AdminCategoryTable from '../../components/adminComponents/AdminCategoryTable'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import './VolverBoton.css'
import './Paginas.css'
const AdminCategorias = () => {
  return (
    <div>
        <Navbar />
        <div className="fondo-pagina">
        <Link to="/admin">
                <button className="volver-boton"> ← Panel De Admin</button>
            </Link>
                    <h1 className="pagina-titulo">Administración de Categorías</h1>

      <AdminCategoryTable />
    </div>
    </div>
  )
}

export default AdminCategorias
