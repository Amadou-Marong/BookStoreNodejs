const NavBar = ({ navLinks }) => {

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="flex space-x-4 justify-between px-4">
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          Book Store
        </h1>
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
