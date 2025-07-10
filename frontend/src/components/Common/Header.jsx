import TopBar from "../Layouts/TopBar.jsx";
import NavBar from "./NavBar.jsx";

function Header() {
  return (
    <header className="border-b border-gray-200">
      {/* TopBar */}
      <TopBar />
      <NavBar />
    </header>
  );
}

export default Header;
