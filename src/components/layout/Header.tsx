const Header = () => {
  const headerMenu = ['Home', 'New Post', 'Settings', 'Sign Up', 'Sign In'];

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            {headerMenu.map((headerMenuData, index) => (
              <li
                className="nav-item"
                key={index}
                onClick={() => {
                  alert(headerMenuData);
                }}
              >
                <a className="nav-link" href="">
                  <i className="ion-compose"></i>&nbsp;{headerMenuData}{' '}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
