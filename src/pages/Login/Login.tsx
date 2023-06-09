import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import tokenState from '../../recoil/tokenState/atom';
import loginUser from '../../apis/api/userApi';
import styles from './Login.module.css';
import login from '../../assets/login.png';
import cupingLogo from '../../img/Group.png';
import bini from '../../img/kong.png';

interface IUser {
  userId: string;
  password: string;
}

const Login = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [userIdInput, setUserIdInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate('/');
  };

  const handleSignupPage = () => {
    navigate('/signup');
  };

  // console.log({ userId: userIdInput, password: passwordInput });
  const mutation = useMutation(async (user: IUser) => {
    try {
      const tokens = await loginUser(user); // Fetch the tokens

      // Check if tokens are received successfully
      if (!tokens || typeof tokens === 'number') {
        // Check for error messages
        console.log('Server response: ', tokens);
        if (tokens === 400) {
          setLoginError('아이디가 일치하지 않습니다.');
        } else if (tokens === 403) {
          setLoginError('비밀번호가 일치하지 않습니다.');
        } else {
          setLoginError('Unknown error occurred.');
        }

        throw new Error('Failed to fetch tokens');
      }

      // Save the tokens in cookies
      Cookies.set('accessToken', tokens.accessToken, {
        expires: tokens.accessTokenExpirationTime,
      });
      Cookies.set('refreshToken', tokens.refreshToken, {
        expires: tokens.refreshTokenExpirationTime,
      });

      // Save tokens in the state
      setToken({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });

      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error(error);
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
    const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const REDIRECT_URI = `${import.meta.env.VITE_BE_SERVER}/users/oauth/kakao`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    navigate(`${kakaoURL}`);

    window.location.href = kakaoURL;

    const redirectCode = new URL(window.location.href).searchParams.get('code');
    console.log('너왔니코드?', redirectCode);
  };

  return (
    <div className="bg-secondary-color-light w-full h-[100vh] flex justify-center items-center">
      <div className="w-[1440px] flex justify-center">
        <div className="top flex items-center w-full h-full">
          <div className="flex w-full items-center justify-center">
            <div className="left flex h-full items-center mt-[5rem] mr-[3rem]">
              <div className="flex flex-col">
                <img
                  src={cupingLogo}
                  alt="Logo"
                  className="w-[10rem] cursor-pointer mb-10"
                  onClick={handleHomePage}
                  role="presentation"
                />
                <div className="mb-20">
                  <div className="text-[24px] text-[#CEAC8A] mb-2">
                    <div>지금 여기,</div>
                    <div>맛있는 원두를 찾고 싶을 땐</div>
                    <div>커핑 하세요!</div>
                  </div>
                  <div>원두 기반 카페 검색 서비스</div>
                </div>
                <img src={bini} alt="charac" className="w-full" />
              </div>
            </div>
            <div className="right flex h-full items-center">
              <div className="flex">
                <div className="p-10 mx-auto w-[428px]">
                  <div className="w-full bg-white border-4 border-primary-color-salgu shadow divide-y divide-gray-200">
                    <div className="">
                      <div className="p-[39px] w-[350px]">
                        <form onSubmit={submitHandler}>
                          <p>아이디</p>
                          <input
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={userIdInput}
                            onChange={userIdInputHandler}
                            className={`border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full ${
                              loginError === '아이디가 일치하지 않습니다.'
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                          {loginError === '아이디가 일치하지 않습니다.' && (
                            <p className="text-red-500 text-xs mb-8">
                              잘못된 아이디입니다.
                            </p>
                          )}
                          <p>비밀번호</p>
                          <input
                            type="password"
                            placeholder="비밀번호 입력(영문, 숫자 조합 최소 8자)"
                            value={passwordInput}
                            onChange={passwordInputHandler}
                            className={`border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full ${
                              loginError === '비밀번호가 일치하지 않습니다.'
                                ? 'border-red-500'
                                : ''
                            } `}
                          />
                          {loginError === '비밀번호가 일치하지 않습니다.' && (
                            <p className="text-red-500 mt-10] text-xs">
                              비밀번호가 일치하지 않습니다.
                            </p>
                          )}
                          <button
                            type="submit"
                            className="transition duration-200 bg-primary-color-salgu hover:bg-neutral-400
                            focus:bg-primary-color-orange focus:shadow-sm focus:ring-4 focus:ring-neutral-400 
                            focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm 
                            hover:shadow-md font-semibold text-center inline-block mt-8 mb-8"
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
                          카카오 로그인 (비활성화)
                        </button>
                        <div className="flex justify-center mt-4">
                          <p className="text-sm mr-2 test-9">
                            계정이 없으신가요?
                          </p>
                          <button
                            type="button"
                            className="text-primary-color-orange inline-block mr-2 text-sm"
                            onClick={handleSignupPage}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
