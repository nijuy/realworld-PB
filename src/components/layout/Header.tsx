const Header = () => {
  const headerMenu = ['Home', 'New Post', 'Settings', 'Sign Up', 'Sign In'];

  return (
    <>
      <div>
        <img></img>
        <span>Header</span>
      </div>
      <nav>
        <ul>
          {headerMenu.map((headerMenuData) => (
            <li
              onClick={() => {
                alert(headerMenuData);
              }}
            >
              {headerMenuData}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
