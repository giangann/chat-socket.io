import { useLocation, useNavigate } from "react-router-dom";
import { ChatBox } from "./ChatBox";
import { ListUsers } from "./ListUsers";
import { useEffect, useState } from "react";
export const ChatRoom = () => {
  const [listUsers, setListUsers] = useState([]);
  const {
    state: { user },
  } = useLocation();
  const handleLogout = async () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListUsers = async () => {
      const respond = fetch("");
    };
  }, []);

  return (
    <div className="App">
      <div style={{ marginBottom: 60, marginTop: 20 }}>
        <p>hello {user.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ margin: "auto" }}>
        <div style={{ display: "flex" }}>
          {/* list users */}
          <ListUsers />

          {/* chat box */}
          <ChatBox me={user} />
        </div>
      </div>
    </div>
  );
};

export const height = '500px';
