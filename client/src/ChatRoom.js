import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatBox } from "./ChatBox";
import { ListUsers } from "./ListUsers";
import { userAtom } from "./atom/userAtom";
export const ChatRoom = () => {
  const navigate = useNavigate();
  const [user, setUserAtom] = useAtom(userAtom);
  const handleLogout = async () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserAtom(null);
    navigate("/");
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
          <ListUsers />

          {/* chat box */}
          <ChatBox me={user} />
        </div>
      </div>
    </div>
  );
};

export const height = "500px";
