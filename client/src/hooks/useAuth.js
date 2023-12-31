import { useAtom } from "jotai";
import { useCallback } from "react";
import { userAtom } from "../atom/userAtom";
import { postApi } from "../ultils/request/request";

export const useAuth = () => {
  const [user, setUserAtom] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const user = await postApi('api/user')
    const isLogined = user.status;
    if (isLogined) {
      setUserAtom(user.user);
    }
  }, [setUserAtom]);

  const login = async (username, password) => {
    const data = { username, password };
    const result = await postApi("api/user/login", data);
    if (result.status === true) {
      setUserAtom(result.user);
    }
  };

  const logout = async () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserAtom(null);
  };
  return {
    user,
    checkUser,
    login,
    logout,
  };
};
