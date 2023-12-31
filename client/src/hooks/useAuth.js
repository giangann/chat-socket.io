import { useAtom } from "jotai";
import { useCallback } from "react";
import { userAtom } from "../atom/userAtom";

export const useAuth = () => {
  const [user, setUserAtom] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const response = await fetch("http://localhost:5000/api/user", {
      credentials: "include",
      method: "POST",
    });

    const user = await response.json();
    console.log(user);
    const isLogined = user.status;
    if (isLogined) {
      setUserAtom(user.user);
    }
  }, [setUserAtom]);

  const login = async (username, password) => {
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
      console.log(result);
      setUserAtom(result.user);
    }
  };

  const logout = async ()=>{
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserAtom(null)
  }
  return {
    user,
    checkUser,
    login,
    logout
  };
};
