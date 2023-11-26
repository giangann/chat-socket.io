import React, { useRef } from "react";

export const Login = ({ onLogin }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = { username, password };

    const respond = await fetch("http://localhost:5000/api/user/new-user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // if don't have this, token can't be set to cookies
    });

    const result = await respond.json();

    console.log("result", result);
    // fake login
    // onLogin();
    // You can perform additional actions here, such as making an API call for authentication.
  };

  return (
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
  );
};
