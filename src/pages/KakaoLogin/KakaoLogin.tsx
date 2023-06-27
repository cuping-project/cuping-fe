import { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

// 카카오 로그인 API
const kakaoLoginApi = async code => {
  const response = await axios.get(
    `${import.meta.env.VITE_BE_SERVER}/users/oauth/kakao/${code}`,
  );
  // console.log(response);
  if (response.status !== 200) {
    throw new Error('카카오 로그인 실패');
  }
  return response.data;
};

const KakaoLogin = () => {
  const navigate = useNavigate();
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

      navigate('/');
    },
    onError: error => {
      console.log(error);
    },
  });

  // 페이지가 로드될 때 code 파라미터를 체크합니다.
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      // code가 있다면 이를 사용하여 로그인을 시도합니다.
      // console.log(code);
      kakaoLoginMutation.mutate(code);
    }
  }, [kakaoLoginMutation]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoLogin;
