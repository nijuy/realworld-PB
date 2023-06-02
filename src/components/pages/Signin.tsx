import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import { ILoginUserData, IGlobalUserData } from '../../types/userApi.type';
import { AxiosError } from 'axios';
import { IError } from '../../types/error.type';
import ErrorPrint from '../ErrorPrint';
import Layout from '../layout/Layout';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';

interface ISigninError extends IError {
  signinStatus: boolean;
}

const Signin = () => {
  let signinData: ILoginUserData = {
    email: '',
    password: '',
  };
  const [signinResponseData, setSigninResponseData] =
    useRecoilState<IGlobalUserData>(currentUserState);
  const [signinStatusData, setSigninStatusData] = useState<ISigninError>();

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClickSigninData = (buttonEvent: React.MouseEvent<HTMLButtonElement>) => {
    buttonEvent.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      signinData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      login(signinData);
    }
  };

  const login = async (signinData: ILoginUserData) => {
    try {
      const response = await userApi.login({ user: signinData });
      setSigninResponseData(response.data);
    } catch (error) {
      const signinError = error as AxiosError;
      if (signinError.response !== undefined && signinError.response.data !== null) {
        const response = signinError.response.data as IError;
        setSigninStatusData({
          signinStatus: false,
          errors: response.errors,
        });
      }
    }
  };

  useEffect(() => {
    if (signinResponseData.token !== '') {
      navigate('/');
    }
  }, [signinResponseData]);

  return (
    <>
      <Layout>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <a href="/#/register">Need an account?</a>
                </p>

                {signinStatusData && !signinStatusData.signinStatus && (
                  <ul className="error-messages">
                    <ErrorPrint errors={signinStatusData.errors} />
                  </ul>
                )}

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
      </Layout>
    </>
  );
};

export default Signin;
