import React, { useRef } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    await login(username, password);
    navigate("/chat");
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
