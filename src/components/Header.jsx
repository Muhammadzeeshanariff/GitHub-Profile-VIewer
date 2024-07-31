import React from "react";
import Logo from "./Logo";

const Header = ({ searchTerm, setSearchTerm, findUser }) => {
  const handleSearch = () => {
    findUser();
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full bg-slate-950 py-4">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
    <div>
      <Logo />
    </div>
    <div className="flex items-center h-11 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search GitHub UserID here.."
        className="h-full text-black px-2 w-full md:w-96 font-semibold outline-none border rounded-md"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-sky-950 font-semibold px-4 h-full border rounded-md ml-2"
      >
        Search
      </button>
    </div>
  </div>
</div>

  );
};

export default Header;
