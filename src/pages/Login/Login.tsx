import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import tokenState from '../../recoil/tokenState/atom';

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
      console.log('이게 뤼스펀스 헤더야', response.headers);
      const { access_key: accessKey, refresh_key: refreshKey } =
        response.headers;
      const accessToken = accessKey.replace('Bearer ', '');
      const refreshToken = refreshKey.replace('Bearer ', '');
      console.log('accessToken?', accessToken);
      console.log('refreshToken?', refreshToken);
      // const accessToken: string = tokens[0];
      // const refreshToken: string = tokens[1];
      const accessTokenDecoded: any = jwtDecode(accessToken);
      const refreshTokenDecoded: any = jwtDecode(refreshToken);
      console.log('디코디드', refreshTokenDecoded);
      const accessTokenExpirationTime = new Date(accessTokenDecoded.exp * 1);
      const refreshTokenExpirationTime = new Date(refreshTokenDecoded.exp * 1);

      Cookies.set('refreshToken', refreshToken, {
        expires: refreshTokenExpirationTime,
      }); // Store refreshToken in a cookie
      setToken({ accessToken }); // Store only accessToken in recoil state
      setLoginError('');
      alert('로그인 성공');
      console.log('하이하이', token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoginError('비밀번호가 일치하지 않습니다.');
      alert('로그인 실패'); // Optionally add a user-facing alert for login failure
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
      alert('사용자 ID와 비밀번호를 입력해주세요.');
      return;
    }
    mutation.mutate({ userId: userIdInput, password: passwordInput });
  };

  // const SocialKakao=()=>{
  //   const Rest_api_key='REST API KEY'
  //   const redirecti_uri= 'http://43.201.181.250/kakao/callback'
  //   const kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=7fe3a140583f0df4191f29f81742062c&redirect_uri=http://43.201.181.250/members/kakao/callback&response_type=code`
  //   const handleLogin =()=>{
  //     window.location.href = kakaoURL
  //   }
  //  const code = new URL(window.location.href).searchParams.get("code");
  return (
    <div className="min-h-screen bg-secondary-color-light flex items-center justify-between sm:py-12 border-2">
      <div className="w-full md:w-1/4 p-10">
        <img src="" alt="" className="w-full" />
      </div>
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
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
                    className=" border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <p>비밀번호</p>
                  <input
                    type="password"
                    placeholder="비밀번호 입력(영문, 숫자 조합 최소 8자)"
                    value={passwordInput}
                    onChange={passwordInputHandler}
                    className=" border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full "
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
                  className="transition duration-200 bg-amber-300 hover:bg-yellow-400 
                  focus:bg-kakao-color focus:shadow-sm focus:ring-4 focus:ring-yellow-500 
                  focus:ring-opacity-50 w-full py-2.5 rounded-lg text-sm shadow-sm 
                  hover:shadow-md font-semibold text-center inline-block"
                >
                  카카오 로그인
                </button>
                <div className="flex justify-center mt-4">
                  <p className="mr-2 test-9">계정이 없으신가요?</p>
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
