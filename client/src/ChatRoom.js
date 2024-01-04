import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { ChatBox } from "./ChatBox";
import { ListUsers } from "./ListUsers";
import { userAtom } from "./atom/userAtom";
import { baseUrl } from "./constants/constant";
import { useAuth } from "./hooks/useAuth";
export const ChatRoom = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user] = useAtom(userAtom);
  const [toUser, setToUser] = useState(-1);
  const socket = useRef(null);

  const handleChooseUser = (id) => {
    setToUser(id);
    socket.current.emit("user_chatting_with", {
      user_chatting_with: { _id: id },
    });
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  useEffect(() => {
    socket.current = io(baseUrl).emit("parse-user", { user_id: user._id });
    console.log(socket.current);
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
          <ListUsers toUser={toUser} handleChooseUser={handleChooseUser} />

          {/* chat box */}
          <ChatBox me={user} toUser={toUser} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export const height = "500px";
