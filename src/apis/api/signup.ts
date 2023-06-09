import instance from '../utils';
type Users = {
  userId: string;
  nickname: string;
  password: string;
};
type Owner = {
  userId: string;
  nickname: string;
  password: string;
  storeName: string;
  storeAddress: string;
  storeNumber: string;
  authImage: any;
};
type UserId = {
  userId: string;
};
// 회원가입
const userSignup = async (users: Users) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/user`,
      users,
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const ownerSignup = async (users: Owner) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/owner`,
      users,
    );
    return response;
  } catch (error) {
    return error;
  }
};
const adminSignup = async (users: Users) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/signup/admin`,
      users,
    );
    return response;
  } catch (error) {
    return error;
  }
};
// 회원가입 - 아이디 중복 검사
const checkUserId = async (userId: UserId) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_BE_SERVER}/users/checkId`,
      userId,
    );
    alert(`사용가능한 아이디입니다.`);
  } catch (error: any) {
    const errorCode = parseInt(error.response.status, 10);
    if (errorCode === 400) {
      alert(error.response.data.message);
    }
    return error;
  }
};
export { userSignup, ownerSignup, adminSignup, checkUserId };
