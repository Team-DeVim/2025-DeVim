import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout";
import { Suspense } from "react";
import { lazy } from "react";

const MainPage = lazy(() => import('../pages/main/MainPage'));
const Register = lazy(() => import("../pages/SignUpRegister/Register"));


const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "main",
        element: (
          <Suspense>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

export default root;