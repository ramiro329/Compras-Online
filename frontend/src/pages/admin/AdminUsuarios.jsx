import React from 'react'
import Navbar from '../../components/Navbar'
import AdminUserTable from '../../components/adminComponents/AdminUserTable'
import { Link } from 'react-router-dom'
import './VolverBoton.css'
import './Paginas.css'
const AdminUsuarios = () => {
  return (
    <div>
      
      <Navbar />
      <div className="fondo-pagina">
      <Link to = '/admin'>
      <button className="volver-boton">  ← Panel De Admin</button>
      </Link>
      

      <h1 className="pagina-titulo">Administración de Usuarios</h1>
      <AdminUserTable />
    </div>
    </div>
  )
}

export default AdminUsuarios
