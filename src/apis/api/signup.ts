import instance from '../utils';

type Users = {
  userId: string;
  nickname: string;
  password: string;
};

type UserId = {
  userId: string;
};

// 회원가입

const userSignup = async (users: Users) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_SERVER_URL}/users/signup/user`,
      users,
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ownerSignup = async (users: Users) => {
  try {
    const response = await instance.post(
      `${import.meta.env.VITE_SERVER_URL}/users/signup/owner`,
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
      `${import.meta.env.VITE_SERVER_URL}/users/signup/admin`,
      users,
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 회원가입 - 아이디 중복 검사

const checkUserId = async () => {
  try {
    const userId = 'adsf';
    const response = await instance.post(
      `${import.meta.env.VITE_SERVER_URL}/users/checkId`,
      userId,
    );

    console.log('이건 이거야', response);
    // if (response.data.message === '사용중인 아이디입니다.')
    //   return response.data.message;
    // if (response.data.message === '사용가능한 아이디입니다.')
    //   return response.data.message;
  } catch (error) {
    return error;
  }
};

export { userSignup, ownerSignup, adminSignup, checkUserId };
