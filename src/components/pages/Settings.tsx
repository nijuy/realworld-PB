import Layout from '../layout/Layout';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { userApi } from '../../api/userApi';
import { IEditUserData } from '../../types/userApi.type';
import { getToken, removeItemToken, setToken } from '../../services/TokenService';
import { updateHeader } from '../../api/api';

const Settings = () => {
  const [user, setUser] = useRecoilState(currentUserState);

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

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
    removeItemToken();
    navigate('/');
  };

  const onSubmitUserData = (buttonEvent: React.MouseEvent<HTMLButtonElement>) => {
    if (emailRef.current?.checkValidity()) {
      buttonEvent.preventDefault();
      const userData = {
        username: usernameRef.current!.value,
        email: emailRef.current.value,
        password: passwordRef.current!.value,
        bio: bioRef.current!.value,
        image: imageRef.current!.value,
      };
      update(userData);
    }
  };

  const update = async (userData: IEditUserData) => {
    try {
      const response = await userApi.modify({ user: userData });
      setUser(response.data);
      setToken(response.data.user.token);
      updateHeader(response.data.user.token);
      navigate(`/profile/${response.data.user.username}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getToken() === null) {
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
                      ref={imageRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={user.user.username}
                      ref={usernameRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      defaultValue={user.user.bio}
                      ref={bioRef}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      defaultValue={user.user.email}
                      ref={emailRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      ref={passwordRef}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={onSubmitUserData}
                  >
                    Update Settings
                  </button>
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
