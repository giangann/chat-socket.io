import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
export const ChatRoom = () => {
  const [messages, setMessages] = useState(messagesTest);
  const socket = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const {
    state: { user },
  } = useLocation();
  const handleSend = async () => {
    const newMessage = {
      from_user_id: user._id,
      to_user_id: "657e8fc34b24f63b2b877d22",
      text: inputRef.current.value,
    };
    inputRef.current.value = "";

    // const respond = await fetch(
    //   "http://localhost:5000/api/message/save-message",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newMessage),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const result = await respond.json()
    // console.log(result)

    setMessages([...messages, { text: newMessage.text, type: "send" }]);
    socket.current.emit("send-msg", newMessage);
  };

  const handleLogout = async () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    const getListMsgOfUser = async () => {
      const searchParams = {
        from_user_id: user._id,
        to_user_id: "657e8fc34b24f63b2b877d22",
      };
      const respond = await fetch(
        "http://localhost:5000/api/message/get-message?" +
          new URLSearchParams(searchParams),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await respond.json();
      console.log(result);
    };

    getListMsgOfUser();
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
  }, []);

  useEffect(() => {
    socket.current.on("reply-msg", (message) => {
      setMessages([...messages, { text: message, type: "received" }]);
    });
    socket.current.on("new-user", (message) => {
      console.log(message);
    });
  }, [socket, messages]);

  return (
    <div className="App">
      <div style={{ marginBottom: 60, marginTop: 20 }}>
        <p>hello {user.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <input ref={inputRef} />
      <button onClick={handleSend}>send</button>
      <div
        className="chat"
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignItems: message.type === "send" ? "flex-end" : "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "12px 6px",
                backgroundColor: message.type === "send" ? "blue" : "gray",
              }}
            >
              <p style={{ color: "black", margin: 0 }}>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const messagesTest = [
  {
    text: "Hello, Send",
    type: "send",
  },
  {
    text: "Hello, Send",
    type: "received",
  },
  {
    text: "Hello, Send",
    type: "send",
  },
  {
    text: "Hello, Send",
    type: "send",
  },
  {
    text: "Hello, Send",
    type: "received",
  },
];
