import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-28 z-40" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
              className="bg-gray-100 py-2 pl-4 pr-12 rounded-full focus:outline-none w-full placeholder:text-icon-gray"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <HiMagnifyingGlass className="h-6 w-6 text-icon-gray hover:text-black hover:scale-105" />
            </button>
          </div>
          <button
            type="button"
            className="pl-4"
            onClick={() => setIsOpen(false)}
          >
            <HiMiniXMark className="h-6 w-6 text-icon-gray hover:text-black" />
          </button>
        </form>
      ) : (
        <button onClick={() => setIsOpen(true)}>
          <HiMagnifyingGlass className="h-7 w-7 text-icon-gray hover:text-black hover:scale-105" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
