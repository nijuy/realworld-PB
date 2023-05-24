import { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';
import { joinUser } from '../../api/userApi';
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
      username: 'dsafkjlncsbtjkvla;emvlnbkhfdjsla;ml',
      email: 'aaadfasdjfsnjaweokjfwaw@gmail.com',
      password: '123sdjflknfaiej',
    };
    joinUser(test);
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
          <button type="button" onClick={onClickSignupData}>
            저장
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Signup;
