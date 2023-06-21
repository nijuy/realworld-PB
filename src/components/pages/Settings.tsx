import Layout from '../layout/Layout';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Settings = () => {
  const [user, setUser] = useRecoilState(currentUserState);

  const navigate = useNavigate();

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

    navigate('/');
  };

  useEffect(() => {
    if (user.user.token === '') {
      navigate('/');
    }
  }, []);

  return (
    <Layout>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      defaultValue={user.user.image}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={user.user.username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      defaultValue={user.user.bio}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={user.user.email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" onClick={logout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
