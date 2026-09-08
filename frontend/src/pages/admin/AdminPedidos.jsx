import React from 'react'
import AdminOrderTable from '../../components/adminComponents/AdminOrderTable'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import './VolverBoton.css'
import './Paginas.css'
const AdminPedidos = () => {
  return (
    <div>
        <Navbar />

         

            <div className="fondo-pagina">

                <Link to="/admin">
                    <button className="volver-boton">
                         ← Panel De Admin
                    </button>
                </Link>


                        <h1 className="pagina-titulo">Administración de Pedidos</h1>
                

             

            </div>
      <AdminOrderTable />
    </div>
  )
}

export default AdminPedidos
