const NavBar = ({ navLinks }) => {

  return (
    <nav className="bg-white shadow-lg p-4 fixed top-0 left-0 right-0">
      <div className="flex space-x-4 justify-between px-4 items-center">
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          Book Store
        </h1>
        {/* search bar */}
        <div className="flex items-center">
            <input type="search" placeholder="Search" className="p-2 rounded-full border border-gray-400 outline-none w-[500px] px-6"/>
        </div>

        <ul className="flex justify-center">
          {navLinks.map((link) => {
            return (
              <li key={link.title} className="mx-4">
                <a href={link.path}>{link.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
