import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Home } from '../pages/Home';
import { Register } from "../pages/Register";
import { Verify } from "../pages/Verify";
import { ForgotPass } from "../pages/ForgotPass";
import { UIKit } from "../pages/UIKit";
import { Unverified } from "../pages/Unverified";
import { Onboarding } from "../pages/Onboarding";
import { LayoutDefault } from "../layouts/Default";
import { Profile } from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      // {
      //   path: '/',
      //   index: true,
      //   element: <Home />
      // },
      {
        path: 'profile/:userId?',
        element: <Profile />
      },
      {
        path: 'search',
        element: <p>Search</p>
      },
      {
        path: 'lists',
        element: <p>Lists</p>
      },
      {
        path: 'notifications',
        element: <p>Notifications</p>
      },
      {
        path: 'communities',
        element: <p>Communities</p>
      },      
      {
        path: 'articles',
        element: <p>Articles</p>
      },
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/verify",
    element: <Verify /> 
  },  
  {
    path: "/forgot-password",
    element: <ForgotPass /> 
  },
  {
    path: "/uikit",
    element: <UIKit />
  },
  {
    path: '*',
    element: <p>404</p>
  }
]);

export function Routes() {
  const { me, logged } = useAuth();

  // if (!logged && window.location.pathname !== "/") {
  //   router.navigate("/");
  // }

  if (me.unverified) {
    const { pathname } = window.location;

    return pathname.startsWith('/verify/')
      ? <Verify />
      : <Unverified />
  }

  if (me.onboarding) {
    return <Onboarding />
  }

  return (
    <RouterProvider router={router} />
  )
}