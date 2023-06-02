import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import tokenState from '../../recoil/tokenState/atom';
import './Login.module.css';

interface IUser {
  userId: string;
  password: string;
}

function Login() {
  const [token, setToken] = useRecoilState(tokenState);
  const [userIdInput, setUserIdInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  // console.log({ userId: userIdInput, password: passwordInput });
  const mutation = useMutation(async (user: IUser) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/login`,
        user,
      );
      const { access_key: accessKey, refresh_key: refreshKey } =
        response.headers;
      const accessToken = accessKey.replace('Bearer ', '');
      const refreshToken = refreshKey.replace('Bearer ', '');
      console.log('accessToken?', accessToken);
      console.log('refreshToken?', refreshToken);
      const accessTokenDecoded: any = jwtDecode(accessToken);
      const refreshTokenDecoded: any = jwtDecode(refreshToken);
      const accessTokenExpirationTime = new Date(accessTokenDecoded.exp * 1);
      const refreshTokenExpirationTime = new Date(refreshTokenDecoded.exp * 1);

      Cookies.set('refreshToken', refreshToken, {
        expires: refreshTokenExpirationTime,
      }); // Store refreshToken in a cookie
      setToken({ accessToken, refreshToken });
      console.log('로그인의 대성공', token);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        if (serverError) {
          if (serverError.message === '아이디가 일치하지 않습니다.') {
            setLoginError('아이디가 일치하지 않습니다.');
          } else if (serverError.message === '비밀번호가 일치하지 않습니다.') {
            setLoginError('비밀번호가 일치하지 않습니다.');
          } else {
            setLoginError('Unknown error occurred.');
          }
        }
      } else {
        console.error(error);
      }
    }
  });
  const userIdInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserIdInput(e.target.value);
  };

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (userIdInput.trim() === '' || passwordInput.trim() === '') {
      return;
    }
    mutation.mutate({ userId: userIdInput, password: passwordInput });
  };

  const kakaoLoginHandler = () => {
    const REST_API_KEY = '826134c9ef39a5b494d322490e0e3abe';
    const REDIRECT_URI = 'http://13.209.106.144:8080/users/oauth/kakao';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // navigate(`${kakaoURL}`);

    window.location.href = kakaoURL;

    const redirectCode = new URL(window.location.href).searchParams.get('code');
    console.log('너왔니코드?', redirectCode);
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom, var(--secondary-color-light) 75%, var(--background-color-grey) 25%)',
        minHeight: '100vh', // To make sure it takes the full height of the screen
      }}
      className="flex justify-between sm:py-12 border-2"
    >
      <div
        style={{
          marginLeft: 250,
          marginRight: -300,
          width: '100%',
          maxWidth: '25%',
          padding: 100,
        }}
      >
        <img
          src="/src/img/Group.png"
          alt="Logo"
          className="w-full"
          style={{ width: '130px', height: 'auto' }}
        />
        <img
          src="/src/img/kong.png"
          alt="charac"
          className="w-full"
          style={{ width: '500px', height: 'auto' }}
        />
      </div>
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md mt-[-3rem]">
        <div className="bg-white border-4 border-primary-color-salgu shadow w-full  divide-y divide-gray-200">
          <div className="px-5 py-7 ">
            <div className="p-5">
              <div>
                <form onSubmit={submitHandler}>
                  <p>아이디</p>
                  <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userIdInput}
                    onChange={userIdInputHandler}
                    className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${
                      loginError === '아이디가 일치하지 않습니다.'
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  <p>비밀번호</p>
                  <input
                    type="password"
                    placeholder="비밀번호 입력(영문, 숫자 조합 최소 8자)"
                    value={passwordInput}
                    onChange={passwordInputHandler}
                    className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${
                      loginError === '비밀번호가 일치하지 않습니다.'
                        ? 'border-red-500'
                        : ''
                    } `}
                  />
                  <button
                    type="submit"
                    className="transition duration-200 bg-primary-color-salgu hover:bg-neutral-400
              focus:bg-primary-color-orange focus:shadow-sm focus:ring-4 focus:ring-neutral-400 
              focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm 
              hover:shadow-md font-semibold text-center inline-block mb-8"
                  >
                    로그인
                  </button>
                </form>

                <button
                  type="submit"
                  onClick={kakaoLoginHandler}
                  className="transition duration-200 bg-amber-300 hover:bg-yellow-400 
                  focus:bg-kakao-color focus:shadow-sm focus:ring-4 focus:ring-yellow-500 
                  focus:ring-opacity-50 w-full py-2.5 rounded-lg text-sm shadow-sm 
                  hover:shadow-md font-semibold text-center inline-block"
                >
                  카카오 로그인
                </button>
                <div className="flex justify-center mt-4">
                  <p className="text-sm mr-2 test-9">계정이 없으신가요?</p>
                  <button
                    type="button"
                    className="text-primary-color-orange inline-block mr-2 text-sm"
                  >
                    회원가입 하러 가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
