import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { route } from "./Route";
import { useAuth } from "./hooks/useAuth";
//check login status, navigate user
function App() {
  const { checkUser } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("use effect call");
    const fetchUser = async () => {
      await checkUser();
      setLoading(false)
    };
    fetchUser();
  }, []);
  return (
    <div className="App">
      {loading ? "" : <RouterProvider router={route} />}
    </div>
  );
}

export default App;
