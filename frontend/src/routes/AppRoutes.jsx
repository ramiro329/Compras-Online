import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Cart from "../pages/Cart";
 import Favorites from "../pages/Favorites";
// import Profile from "../pages/Profile";

// import Products from "../pages/Products";
 import ProductDetail from "../pages/ProductDetail";

 import Success from "../pages/Success";

import {
    HOME,
    LOGIN,
    REGISTER,
    // PRODUCTS,
    PRODUCT_DETAIL,
     CART,
     FAVORITES,
    // PROFILE
    SUCCESS
} from "./rutas";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Públicas */}

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
                path={PRODUCT_DETAIL}
                element={<ProductDetail />}
            />

            <Route
    path={SUCCESS}
    element={<Success />}
/>

            {/* <Route
                path={PRODUCTS}
                element={<Products />}
            />

             */}






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

            {/* Privadas */}
{/* 
           

                

                <Route
                    path={PROFILE}
                    element={<Profile />}
                />

             */}

        </Routes>

    );

};

export default AppRoutes;