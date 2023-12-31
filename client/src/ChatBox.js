import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { height } from "./ChatRoom";

export const ChatBox = ({ me: user, toUser }) => {
  const [messages, setMessages] = useState(messagesTest);
  const socket = useRef(null);
  const inputRef = useRef(null);
  const handleSend = async () => {
    const newMessage = {
      from_user_id: user._id,
      to_user_id: toUser,
      text: inputRef.current.value,
    };
    inputRef.current.value = "";

    setMessages([...messages, { text: newMessage.text, type: "send" }]);
    socket.current.emit("send-msg", newMessage);
  };

  useEffect(() => {
    const getListMsgOfUser = async () => {
      const searchParams = {
        from_user_id: user._id,
        to_user_id: toUser,
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

      setMessages(
        result.map((message) => {
          return {
            ...message,
            type: message.from === user._id ? "send" : "received",
          };
        })
      );
    };

    getListMsgOfUser();
  }, [toUser]);

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
    <div style={{ width: "50vw", height: height, overflowY: "auto" }}>
      <input ref={inputRef} />
      <button onClick={handleSend}>send</button>
      <div
        className="chat"
        style={{
          width: "100%",
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
