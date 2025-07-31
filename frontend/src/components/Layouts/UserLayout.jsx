import Header from "../Common/Header.jsx";
import Footer from "../Common/Footer/Footer.jsx";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Main */}
      <main className="flex-1"></main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout;
