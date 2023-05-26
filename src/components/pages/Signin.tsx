import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import { ILoginUserData } from '../../api/types/userApi.type';

const Signin = () => {
  const [signinData, setSigninData] = useState<ILoginUserData>();

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClickSigninData = (buttonEvent: React.MouseEvent<HTMLButtonElement>) => {
    buttonEvent.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      if (emailRef.current.value === '' || passwordRef.current.value === '') {
        alert('!');
      }
      setSigninData({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      login();
    }
  };

  const login = async () => {
    try {
      if (signinData !== undefined) {
        const response = await userApi.login({ user: signinData });
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (false) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="">Need an account?</a>
              </p>

              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={onClickSigninData}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
