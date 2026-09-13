import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

import Cart from "../pages/Cart";
 import Favorites from "../pages/Favorites";

 import ProductDetail from "../pages/ProductDetail";

 import Success from "../pages/Success";

 import AdminPanel from "../pages/admin/AdminPanel";
 import AdminPedidos from "../pages/admin/AdminPedidos";
import AdminProductos from '../pages/admin/AdminProductos'
import AdminCategorias from '../pages/admin/AdminCategorias'
import AdminUsuarios from '../pages/admin/AdminUsuarios'
import {
    HOME,
    LOGIN,
    REGISTER,
    PRODUCT_DETAIL,
     CART,
     FAVORITES,
    SUCCESS,
    ADMIN_PANEL,
    ADMIN_PEDIDOS,
    ADMIN_PRODUCTOS,
    ADMIN_CATEGORIAS,
    ADMIN_USUARIOS
} from "./rutas";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppRoutes = () => {

    return (
        <>

        <Routes>


            <Route
                path={HOME}
                element={<Home />}
            />

            <Route
                path={LOGIN}
                element={<Login />}
            />

            <Route
                path={REGISTER}
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
            />

            <Route
                path={PRODUCT_DETAIL}
                element={<ProductDetail />}
            />

            

            <Route
    path={SUCCESS}
    element={<Success />}
/>

            






              <Route element={<PrivateRoute />}>

                <Route
                    path={CART}
                    element={<Cart />}
                />

                <Route
                    path={FAVORITES}
                    element={<Favorites />}
                />

                </Route>

            


            <Route element={<AdminRoute />}>

    <Route
        path={ADMIN_PANEL}
        element={<AdminPanel />}
    />

    <Route
        path={ADMIN_PEDIDOS}
        element={<AdminPedidos />}
    />

    <Route
    path={ADMIN_PRODUCTOS}
    element={<AdminProductos />}
    /> 

    <Route
    path={ADMIN_CATEGORIAS}
    element={<AdminCategorias />}
    /> 

    <Route
    path={ADMIN_USUARIOS}
    element={<AdminUsuarios />}
    /> 

</Route>
               

        </Routes>

        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

        </>

    );

};

export default AppRoutes;