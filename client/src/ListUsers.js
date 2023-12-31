import { useEffect, useState } from "react";
import { height } from "./ChatRoom";
import { useAuth } from "./hooks/useAuth";

export const ListUsers = ({ toUser, handleChooseUser }) => {
  const [listUser, setListUser] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const getListUsers = async () => {
      const searchParams = {
        my_user_id: user._id,
      };
      const respond = await fetch(
        "http://localhost:5000/api/user/get-user-not-me?" +
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
      setListUser(result);
    };

    getListUsers();
  }, []);
  return (
    <div style={{ width: "25vw", height: height, overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {listUser.map((user) => (
          <div
            style={{
              backgroundColor: user._id === toUser ? "blue" : "pink",
              flexBasis: "75px",
              border: "1px solid blue",
              cursor: "pointer",
            }}
            onClick={() => handleChooseUser(user._id)}
          >
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
