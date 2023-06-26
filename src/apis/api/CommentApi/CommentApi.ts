import { error } from 'console';
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

const deleteCommentApi = async id => {
  try {
    const { data } = await authInstance.delete(
      `${import.meta.env.VITE_BE_SERVER}/comment/${id}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('댓글 삭제 에러');
  }
};

const editCommentApi = async (id, updatedContent) => {
  try {
    const { data } = await authInstance.put(
      `${import.meta.env.VITE_BE_SERVER}/comment/${id}`,
      {
        content: updatedContent,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('댓글 수정 에러');
  }
};

export { getCommentApi, postCommentApi, editCommentApi, deleteCommentApi };
