import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';

const Header = () => {
  const [user, setUser] = useRecoilState(currentUserState);

  const logout = () => {
    setUser({
      user: {
        username: '',
        email: '',
        token: '',
        bio: '',
        image: '',
      },
    });
  };

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="">
                Home
              </a>
            </li>
            {user.user.token !== '' ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#/editor">
                    <i className="ion-compose"></i>&nbsp;New Article
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#/settings">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </a>
                </li>
                <li className="nav-item" onClick={logout}>
                  <a className="nav-link" href="">
                    <img className="user-pic" src={user.user.image} ng-src={user.user.image} />
                    &nbsp;{user.user.username}
                  </a>
                </li>
                <li className="nav-item" onClick={logout}>
                  <a className="nav-link" href="">
                    <i className="ion-gear-a"></i>&nbsp;Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#/login">
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#/register">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
