import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AdminRoute = () => {

    const { user } = useAuthStore();

    console.log("USUARIO ACTUAL:", user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.rol !== "Administrador") {
        return <Navigate to="/" replace />;
    }


    return <Outlet />;
};

export default AdminRoute;