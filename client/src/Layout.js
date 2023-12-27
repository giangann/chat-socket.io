import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userAtom } from "./atom/userAtom";

export const Layout = () => {
  return <Outlet />;
};
