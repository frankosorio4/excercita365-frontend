/* eslint-disable */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage/CadastroUsuarioPage";
import ErroPage from "../pages/ErroPage/ErroPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import CadastroLocalPage from "../pages/CadastroLocalPage/CadastroLocalPage";
import ListaLocalPage from "../pages/ListaLocalPage/ListaLocalPage";
import { getCookie } from "../hooks/useCookies";
import InitialPage from "../pages/InitialPage/InitialPage";

const PrivateRoute = () => {
    const isAuthenticated = getCookie("usuarioLogado") !== null;
    console.log("Autenticado: ", isAuthenticated)
    return isAuthenticated ? <App/> : <Navigate to="/login" />;
};

const routers = createBrowserRouter([
    {
        path: "/public",
        element: <DashboardPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/cadastroUsuario",
        element: <CadastroUsuarioPage />
    },
    {
        path: "/",
        element: <PrivateRoute />,
        errorElement: <ErroPage />,
        children: [
            { 
                index: true, 
                element: <InitialPage/> 
            },
            {
                path: "home",
                element:
                    <InitialPage />

            },
            {
                path: "cadastroLocal",
                element:
                    <CadastroLocalPage />


            },
            {
                path: "cadastroLocal/:id",
                element:
                    <CadastroLocalPage />

            },
            {
                path: "listaLocal",
                element:
                    <ListaLocalPage />

            }
        ]
    }
]);

export default routers;
