import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../recoil/atom/currentUserData';
import { IJoinUserData } from '../types/userApi.type';
import { AxiosError } from 'axios';
import { IError } from '../types/error.type';
import Layout from '../components/layout/Layout';
import { userApi } from '../api/userApi';
import ErrorPrint from '../components/ErrorPrint';
import { getToken, setToken } from '../services/tokenService';
import { updateHeader } from '../api/api';

interface ISignupError extends IError {
  signupStatus: boolean;
}

const Signup = () => {
  const [_, setUser] = useRecoilState(currentUserState);
  const [signupStatusData, setSignupStatusData] = useState<ISignupError>();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onSubmitSignupData = (formEvent: React.MouseEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const signupData = {
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
    };
    join(signupData);
  };

  const join = async (signupData: IJoinUserData) => {
    try {
      const response = await userApi.join({ user: signupData });
      setUser(response.data);
      setToken(response.data.user.token);
      updateHeader(response.data.user.token);
      navigate('/');
    } catch (error) {
      const signupError = error as AxiosError;
      if (signupError.response !== undefined && signupError.response.data !== null) {
        const response = signupError.response.data as IError;
        setSignupStatusData({
          signupStatus: false,
          errors: response.errors,
        });
      }
    }
  };

  useEffect(() => {
    if (getToken() !== null) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Layout>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign Up</h1>
                <p className="text-xs-center">
                  <a href="#/login">Have an account?</a>
                </p>

                {signupStatusData && !signupStatusData.signupStatus && (
                  <ul className="error-messages">
                    <ErrorPrint errors={signupStatusData.errors} />
                  </ul>
                )}

                <form onSubmit={onSubmitSignupData}>
                  <fieldset className="form-group">
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                      />
                    </fieldset>
                    <input
                      className="form-control form-control-lg"
                      type="email"
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

                  <button className="btn btn-lg btn-primary pull-xs-right">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
