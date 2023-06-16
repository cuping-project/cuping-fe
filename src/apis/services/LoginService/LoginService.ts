import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import loginApi from '../../api/loginApi/loginApi';
import { IUser } from './types';

/**
 * 로그인을 시도하는 함수
 *
 * - 토큰을 `accessToken`, `refreshToken`으로 나누어서 저장
 * - 로그인 성공시 '/' 로 이동
 * @returns loginMutation 을 반환
 */
const LoginService = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation(loginApi, {
    onSuccess: data => {
      Cookies.set('ACCESS_KEY', data.access_key);
      Cookies.set('REFRESH_KEY', data.refresh_key);
      navigate('/');
    },
    onError: error => {
      alert(error.response.data.message);
    },
  });

  return loginMutation;
};

export default LoginService;
