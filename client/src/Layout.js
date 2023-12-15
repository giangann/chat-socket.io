import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch("http://localhost:5000/api/user", {
        credentials: "include",
        method: "POST",
      });

      const user = await response.json();

      const isLogined = user.status;
      if (isLogined) {
        navigate("/chat", { state: { user: user.user } });
      } else {
        navigate("/login");
      }
    };

    checkUser();
  }, []);
};
