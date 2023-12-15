import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Layout } from "./Layout";
import { Signup } from "./Signup";
import { ChatRoom } from "./ChatRoom";

const routeArr = [
  { path: "/", element: <Layout /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chat",
    element: <ChatRoom />,
  },
];
export const route = createBrowserRouter(routeArr);
