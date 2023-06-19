import authInstance from '../../../utils/authInstance';

const postCommentApi = async cardId => {
  try {
    const { data } = await authInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/comment/${cardId}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export default postCommentApi;
