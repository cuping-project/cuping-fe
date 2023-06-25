import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import LoginService from '../../apis/services/LoginService/LoginService';
import cupingLogo from '../../assets/img/cupping-logo-icon02.svg';
import bini from '../../assets/img/beni.svg';
import { IUser } from './types';
import loginApi from '../../apis/api/loginApi/loginApi';
import { loginState } from '../../recoil/atom/loginState';

const Login = () => {
  const [userIdInput, setUserIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // 로그인이 되었는지 확인
  const [loggedin, setLoggedin] = useRecoilState(loginState);

  // 로그인이 되어있다면 메인 페이지로 라우팅
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('ACCESS_KEY');
      if (accessToken) {
        navigate('/');
        alert('이미 로그인 되어있습니다. 로그 아웃 후 이용해주세요.');
      } else {
        setLoggedin(false);
      }
    };

    checkLoginStatus();
  }, []);

  // 로그인 api
  const loginMutation = useMutation(loginApi, {
    onSuccess: data => {
      const decoded = jwtDecode(data.access_key);
      const accessExpirationDate = new Date(decoded.exp * 1000); // 1시간
      const refreshExpirationDate = new Date(decoded.exp * 10000); // 10시간

      Cookies.set('ACCESS_KEY', data.access_key, {
        expires: accessExpirationDate,
      });
      Cookies.set('REFRESH_KEY', data.refresh_key, {
        expires: refreshExpirationDate,
      });
      navigate('/');
      alert('로그인 성공');
    },
    onError: error => {
      alert(error.response.data.message);
    },
  });

  // 로그인 핸들러
  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    // 정규식 검사
    // 앞뒤 공백이 있는지 체크
    if (userIdInput.trim() === '' || passwordInput.trim() === '') {
      alert(`아이디와 비밀번호를 입력해주세요.`);
    }

    loginMutation.mutate({ userId: userIdInput, password: passwordInput });
  };

  // 카카오 로그인 API
  const kakaoLoginApi = async code => {
    const response = await axios.post(
      `${import.meta.env.VITE_BE_SERVER}/users/oauth/kakao`,
      { code },
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error('카카오 로그인 실패');
    }
    return response.data;
  };

  const kakaoLoginMutation = useMutation(kakaoLoginApi, {
    onSuccess: data => {
      const decoded = jwtDecode(data.access_key);
      const accessExpirationDate = new Date(decoded.exp * 1000); // 1시간
      const refreshExpirationDate = new Date(decoded.exp * 10000); // 10시간

      Cookies.set('ACCESS_KEY', data.access_key, {
        expires: accessExpirationDate,
      });
      Cookies.set('REFRESH_KEY', data.refresh_key, {
        expires: refreshExpirationDate,
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  // 카카오 로그인 핸들러
  const kakaoLoginHandler = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const REDIRECT_URI = `https://cuping.net/login/kakaologin`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트합니다.
    window.location.href = kakaoURL;
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
                  onClick={() => navigate('/')}
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
                        <form onSubmit={loginHandler}>
                          <p>아이디</p>
                          <input
                            type="text"
                            placeholder="아이디를 입력하세요."
                            value={userIdInput}
                            onChange={e => setUserIdInput(e.target.value)}
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
                            placeholder="비밀번호를 입력하세요."
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
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
                          카카오 로그인
                        </button>
                        <div className="flex justify-center mt-4">
                          <p className="text-sm mr-2 test-9">
                            계정이 없으신가요?
                          </p>
                          <button
                            type="button"
                            className="text-primary-color-orange inline-block mr-2 text-sm"
                            onClick={() => navigate('/signup')}
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
