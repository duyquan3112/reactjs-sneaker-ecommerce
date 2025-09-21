import LayoutHeaderTopBar from "./LayoutHeaderTopBar.jsx";
import LayoutHeaderNavBar from "./LayoutHeaderNavBar.jsx";

function LayoutHeader() {
  return (
    <header className="border-b border-gray-200 bg-white w-full sticky top-0 z-50 shadow-sm">
      {/* TopBar */}
      <LayoutHeaderTopBar />
      <LayoutHeaderNavBar />
    </header>
  );
}

export default LayoutHeader;
