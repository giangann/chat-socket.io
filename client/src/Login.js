import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = { username, password };

    const respond = await fetch("http://localhost:5000/api/user/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // if don't have this, token can't be set to cookies
    });

    const result = await respond.json();

    if (result.status === true) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" ref={usernameRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <a href="/signup">Create new account</a>
    </div>
  );
};
