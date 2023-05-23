import { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';

interface SignupData {
  email: string;
  nickname: string;
  password: string;
}

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupData>();

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

  useEffect(() => {
    setSignupData({
      email: '',
      nickname: '',
      password: '',
    });
  }, []);

  useEffect(() => {
    console.log(signupData?.email);
  }, [signupData]);

  return (
    <>
      <Layout>
        <form>
          <input type="text" placeholder="email" ref={emailRef} onChange={onChangeSignupData} />
          <input
            type="text"
            placeholder="nickname"
            ref={nicknameRef}
            onChange={onChangeSignupData}
          />
          <input
            type="text"
            placeholder="password"
            ref={passwordRef}
            onChange={onChangeSignupData}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (
                emailRef.current !== null &&
                nicknameRef.current !== null &&
                passwordRef.current !== null
              ) {
                if (
                  emailRef.current.value === '' ||
                  nicknameRef.current.value === '' ||
                  passwordRef.current.value === ''
                ) {
                  alert('!');
                }
                setSignupData({
                  email: emailRef.current.value,
                  nickname: nicknameRef.current.value,
                  password: passwordRef.current.value,
                });
              }
            }}
          >
            저장
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Signup;
