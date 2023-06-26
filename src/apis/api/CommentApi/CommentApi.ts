import { useRecoilState } from 'recoil';
import authInstance from '../../utils/authInstance';
import axiosInstance from '../../utils/axiosInstance';

const getCommentApi = async cardId => {
  const region = '서울 강서구';
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/bean/${cardId}?address=${region}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const postCommentApi = async (cardId, content) => {
  const region = '서울 강서구';
  try {
    const { data } = await authInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/comment/${cardId}`,
      {
        content,
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getCommentApi, postCommentApi };
