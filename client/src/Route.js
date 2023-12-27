import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Layout } from "./Layout";
import { Signup } from "./Signup";
import { ChatRoom } from "./ChatRoom";
import { ProtectedRoute } from "./ProtectedRoute";

const routeArr = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/chat",
        element: <ChatRoom />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];
export const route = createBrowserRouter(routeArr);
