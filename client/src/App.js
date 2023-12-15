import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { route } from "./Route";

//check login status, navigate user
function App() {
  return (
    <div className="App">
      {/* {isLogin ? <ChatRoom /> : <Login onLogin={() => setIsLogin(true)} />} */}
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
