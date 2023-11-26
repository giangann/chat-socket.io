import { useState } from "react";
import "./App.css";
import { ChatRoom } from "./ChatRoom";
import { Login } from "./Login";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      {isLogin ? <ChatRoom /> : <Login onLogin={() => setIsLogin(true)} />}
    </div>
  );
}

export default App;
