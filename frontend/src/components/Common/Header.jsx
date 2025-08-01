import TopBar from "../Layouts/TopBar.jsx";
import NavBar from "./NavBar.jsx";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white w-full sticky top-0 z-50 shadow-sm">
      {/* TopBar */}
      <TopBar />
      <NavBar />
    </header>
  );
}

export default Header;
