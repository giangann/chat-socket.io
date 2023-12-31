import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { ChatBox } from "./ChatBox";
import { ListUsers } from "./ListUsers";
import { userAtom } from "./atom/userAtom";
import { useAuth } from "./hooks/useAuth";
import { useState } from "react";
export const ChatRoom = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user] = useAtom(userAtom);
  const [toUser, setToUser] = useState(-1)

  const handleChooseUser = (id) =>{
    setToUser(id)
  }
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="App">
      <div style={{ marginBottom: 60, marginTop: 20 }}>
        <p>hello {user.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ margin: "auto" }}>
        <div style={{ display: "flex" }}>
          {/* list users */}
          <ListUsers toUser={toUser} handleChooseUser={handleChooseUser}/>

          {/* chat box */}
          <ChatBox me={user} toUser = {toUser} />
        </div>
      </div>
    </div>
  );
};

export const height = "500px";
