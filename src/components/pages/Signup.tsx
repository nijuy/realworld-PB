import { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';
import userApi from '../../api/userApi';
import { IJoinUserData } from '../../api/types/userApi.type';

const Signup = () => {
  const [signupData, setSignupData] = useState<IJoinUserData>();

  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onChangeSignupData = (formEvent: React.FormEvent<HTMLInputElement>) => {
    switch (formEvent.currentTarget.value) {
      case 'email':
        break;
      case 'nickname':
        break;
      case 'password':
        break;
    }
  };

  const onClickSignupData = (buttonEvent: React.MouseEvent<HTMLButtonElement>) => {
    buttonEvent.preventDefault();
    if (emailRef.current !== null && nicknameRef.current !== null && passwordRef.current !== null) {
      if (
        emailRef.current.value === '' ||
        nicknameRef.current.value === '' ||
        passwordRef.current.value === ''
      ) {
        alert('!');
      }
      setSignupData({
        email: emailRef.current.value,
        username: nicknameRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {
    setSignupData({
      email: '',
      username: '',
      password: '',
    });

    const test = {
      username: 'indianapoylylyl',
      email: 'hyeonlimgo5@gmail.com',
      password: 'tiehdn1300',
    };

    const test2 = userApi.join({ user: test });
    console.log(test2);
  }, []);

  useEffect(() => {
    console.log(signupData?.email);
  }, [signupData]);

  return (
    <>
      <Layout>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign Up</h1>
                <p className="text-xs-center">
                  <a href="">Have an account?</a>
                </p>

                <form>
                  <fieldset className="form-group">
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        ref={nicknameRef}
                      />
                    </fieldset>
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
                    onClick={onClickSignupData}
                  >
                    Sign Up
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

export default Signup;
