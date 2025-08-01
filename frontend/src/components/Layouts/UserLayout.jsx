import { Outlet } from "react-router";
import Header from "../Common/Header.jsx";
import Footer from "../Common/Footer/Footer.jsx";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
