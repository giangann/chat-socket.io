import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "./ultils/request/request";
export const Signup = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    setErrorMessage("");
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = { username, password };

    const result = await postApi("api/user/new-user", data);

    if (result.status === false) {
      setErrorMessage(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSignUp}>
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
      <p style={{ color: "red" }}>{errorMessage}</p>

      <a href="/login">have account? login</a>
    </div>
  );
};
