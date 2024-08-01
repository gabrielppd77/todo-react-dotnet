import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@layouts/PublicLayout";
import MainLayout from "@layouts/MainLayout";

import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";

import Home from "@pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
