import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import { Suspense } from "react";
import { lazy } from "react";
import AdminPage from "../pages/adminPage/AdminPage";
import ClientErrorPage from "../pages/errorPage/ClientErrorPage.jsx";
import ServerErrorPage from "../pages/errorPage/ServerErrorPage.jsx";


const MainPage = lazy(() => import("../pages/main/MainPage"));
const Register = lazy(() => import("../pages/SignUpRegister/Register"));
const SignUp = lazy(() => import("../pages/SignUpRegister/SignUp"));
const BoardPage = lazy(() => import("../pages/boardPage/BoardPage"));
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const DetailPage = lazy(() => import("../pages/detailPage/DetailPage"));
const UsersPage = lazy(() => import("../pages/adminPage/routes/UsersPage"));
const UserDetailPage = lazy(() =>
  import("../pages/adminPage/routes/UserDetailPage")
);
const EditorPage = lazy(() => import("../pages/editorPage/EditorPage"));
const UsersSmokeTest = lazy(() => import("../pages/apiTestPage/UsersSmokeTest"));
const DashboardPage = lazy(() => import("../pages/adminPage/routes/DashboardPage"));


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
        path: "login",
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
        path: "profilePage",
        element: (
          <Suspense>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "detailPage/:boardNo",
        element: (
          <Suspense>
            <DetailPage />
          </Suspense>
        ),
      },
      {
        path: "adminPage",
        element: <AdminPage />,
        children: [
          { path: "users", element: <UsersPage /> },
          { path: "users/:userNo", element: <UserDetailPage /> },
          { path: "dashboard", element: <DashboardPage /> },
        ],
      },
      {
        path: "editorPage",
        element: (
          <Suspense>
            <EditorPage />
          </Suspense>
        ),
      },
      {
        path: "usersSmokeTest",
        element: (
          <Suspense>
            <UsersSmokeTest />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <MainPage /> },
          { path: "*", element: <ClientErrorPage /> },
        ],
      },
      { path: "/errorPage", element: <ServerErrorPage /> },
    ],
  },
]);

export default root;
