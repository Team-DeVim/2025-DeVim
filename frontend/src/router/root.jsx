import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout";
import { Suspense } from "react";
import { lazy } from "react";



const MainPage = lazy(() => import('../pages/main/MainPage'));
const Register = lazy(() => import("../pages/SignUpRegister/Register"));
const SignUp = lazy(() => import("../pages/SignUpRegister/SignUp"));
const BoardPage = lazy(() => import("../pages/boardPage/BoardPage"));
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const DetailPage = lazy(() => import("../pages/detailPage/DetailPage"));
const EditorPage = lazy(() => import("../pages/editorPage/EditorPage"));

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
      {
        path: "signUp",
        element: (
          <Suspense>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "boardPage",
        element: (
          <Suspense>
            <BoardPage />
          </Suspense>
        ),
      },
      {
        path: "ProfilePage",
        element: (
          <Suspense>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "detailPage",
        element: (
          <Suspense>
            <DetailPage />
          </Suspense>
        ),
      },
       {
        path: "editorPage",
        element: (
          <Suspense>
            <EditorPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default root;