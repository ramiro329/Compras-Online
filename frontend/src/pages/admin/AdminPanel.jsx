
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import AdminStockAlert from '../../components/adminComponents/AdminStockAlert'
import '../admin/AdminPanel.css'
const AdminPanel = () => {

   return (
    <>
        <Navbar />

        <main className="admin-panel">

            <div className="admin-header">

                <h1>
                    Panel de Administrador
                </h1>

                <p>
                    Seleccione una sección:
                </p>

            </div>


            <div className="admin-menu">

                <Link to="/admin/pedidos" className="admin-option">
                    <span className="admin-icon">📦</span>

                    <div>
                        <h3>Gestionar pedidos</h3>
                        <p>Consultar y administrar pedidos.</p>
                    </div>
                </Link>


                <Link to="/admin/productos" className="admin-option">
                    <span className="admin-icon">🛒</span>

                    <div>
                        <h3>Gestionar productos</h3>
                        <p>Agregar, editar y administrar productos.</p>
                    </div>
                </Link>


                <Link to="/admin/categorias" className="admin-option">
                    <span className="admin-icon">🏷️</span>

                    <div>
                        <h3>Gestionar categorías</h3>
                        <p>Administrar las categorías de productos.</p>
                    </div>
                </Link>


                <Link to="/admin/usuarios" className="admin-option">
                    <span className="admin-icon">👥</span>

                    <div>
                        <h3>Gestionar usuarios</h3>
                        <p>Consultar los usuarios registrados.</p>
                    </div>
                </Link>

            </div>


            <section className="admin-alertas">

                <AdminStockAlert />

            </section>

        </main>
    </>
)

}

export default AdminPanel

