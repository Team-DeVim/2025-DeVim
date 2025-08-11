import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout";
import { Suspense } from "react";
import { lazy } from "react";

const MainPage = lazy(() => import('../pages/main/MainPage'));


const root = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'main',
                element: (
                    <Suspense>
                        <MainPage />
                    </Suspense>
                )
            },



        ],
    }
]);

export default root;