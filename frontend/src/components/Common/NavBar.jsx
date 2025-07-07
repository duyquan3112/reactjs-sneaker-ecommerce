import { Link } from "react-router";
import {
  HiOutlineUserCircle,
  HiOutlineShoppingBag,
  HiMiniBars3BottomRight
} from "react-icons/hi2";

function NavBar() {
  const mainCategories = [
    {
      index: 1,
      name: "men",
      route: "#"
    },
    {
      index: 2,
      name: "women",
      route: "#"
    },
    {
      index: 3,
      name: "kids",
      route: "#"
    },
    {
      index: 4,
      name: "for sale",
      route: "#"
    }
  ];
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <Link to="/">
            <img
              src="/logo-2x.png"
              alt="Brand Logo"
              className="object-contain h-14 w-14 hover:scale-110 hover:rotate-12 transition-all duration-300 ease-in-out min-h-10 min-w-10"
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {mainCategories.map((cat) => (
            <Link
              key={cat.index}
              to={cat.route}
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUserCircle className="h-7 w-7 text-gray-700" />
          </Link>
          <button className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          <button className="md:hidden">
            <HiMiniBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
