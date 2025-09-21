import { Outlet } from "react-router-dom";
import LayoutHeader from "./Header/LayoutHeader.jsx";
import LayoutFooter from "./Footer/LayoutFooter.jsx";
import { ErrorBoundary } from "../../../components";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LayoutHeader />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <LayoutFooter />
    </div>
  );
}

export default UserLayout;
