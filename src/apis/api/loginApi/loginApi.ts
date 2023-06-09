import { IUser } from './types';
import axiosInstance from '../../utils/axiosInstance';

/**
 * 로그인을 시도하는 API
 * @param user `userId`와 `password`를 담은 객체
 * @returns 로그인 성공시 데이터를 반환
 */
const loginApi = async (user: IUser) => {
  try {
    const { headers } = await axiosInstance.post('/users/login', user, {
      withCredentials: true,
    });

    return headers;
  } catch (error) {
    throw error;
  }
};

export default loginApi;
