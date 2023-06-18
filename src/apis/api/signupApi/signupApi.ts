import axiosInstance from '../../utils/axiosInstance';
import { IUsers, IOwner } from './types';

/**
 * 일반회원의 회원가입을 시도하는 함수
 *
 * 회원가입 성공시 `response`를 반환
 * @param users `userId`와 `nickname`, `password`를 담은 객체
 * @returns 회원가입 성공시 resopnse를 반환
 */
const userSignupApi = async (users: IUsers) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/user`,
      users,
    );
    return response;
  } catch (error) {
    alert(error.response.data.message);
    throw error;
  }
};

/**
 * 사장회원의 회원가입을 시도하는 함수
 *
 * 회원가입 성공시 `response`를 반환
 * @param users `userId`와 `nickname`, `password`를 담은 객체
 * @returns 회원가입 성공시 resopnse를 반환
 */
const ownerSignupApi = async (users: IOwner) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/owner`,
      users,
    );
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * 관리자의 회원가입을 시도하는 함수
 *
 * 회원가입 성공시 `response`를 반환
 * @param users `userId`와 `nickname`, `password`를 담은 객체
 * @returns 회원가입 성공시 resopnse를 반환
 */
const adminSignupApi = async (users: IUsers) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/admin`,
      users,
    );
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * 아이디 중복체크를 시도하는 함수
 *
 * @param userId 유저 아이디
 * @returns 중복된 아이디가 없으면 `true`를 반환
 */
const checkUserIdApi = async userId => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/checkId`,
      userId,
    );
    return response;
  } catch (error) {
    alert(error.response.data.message);
    throw error;
  }
};

export { userSignupApi, ownerSignupApi, adminSignupApi, checkUserIdApi };
