import { Outlet } from "react-router";
import LayoutHeaderMain from "./Header/LayoutHeaderMain.jsx";
import LayoutFooter from "./Footer/LayoutFooter.jsx";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LayoutHeaderMain />
      <main className="flex-1">
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
}

export default UserLayout;
