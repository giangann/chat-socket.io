import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div style={{backgroundColor:'palegoldenrod'}}>
      <Outlet />
    </div>
  );
};
