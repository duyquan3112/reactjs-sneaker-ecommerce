import { Outlet } from "react-router";
import Header from "../Common/Header.jsx";
import Footer from "../Common/Footer/Footer.jsx";

function UserLayout() {
  return (
    <div className="h-full min-h-screen flex flex-col">
      {/* Header - Luôn cố định */}
      <Header />
      {/* Main - Nội dung thay đổi theo route */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer - Luôn cố định */}
      <Footer />
    </div>
  );
}

export default UserLayout;
