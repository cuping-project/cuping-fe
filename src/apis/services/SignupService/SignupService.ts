import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import {
  checkUserIdApi,
  ownerSignupApi,
  userSignupApi,
} from '../../api/signupApi/signupApi';

/**
 * 아이디 중복체크를 시도하는 함수
 * @returns 중복된 아이디가 없으면 `true`를 반환
 */
const CheckUserIdService = () => {
  return useMutation(checkUserIdApi, {
    onSuccess: data => {
      alert(data.data.message);
    },
    onError: error => {
      console.log(error);
    },
  });
};

/**
 * 일반회원 회원가입을 시도하는 함수
 * @returns 회원가입 성공시 resopnse를 반환
 */
const SignupUserService = () => {
  const navigate = useNavigate();
  return useMutation(userSignupApi, {
    onSuccess: (data: any) => {
      alert(data.data.message);
      navigate('/login');
    },
    onError: error => {
      console.log(error);
    },
  });
};

const SignupOwnerService = () => {
  const navigate = useNavigate();
  return useMutation(ownerSignupApi, {
    onSuccess: data => {
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    },
    onError: error => {
      console.error('failed', error);
    },
  });
};

export { CheckUserIdService, SignupUserService, SignupOwnerService };
