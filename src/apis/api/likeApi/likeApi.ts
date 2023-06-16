import authInstance from '../../utils/authInstance';

/**
 * 좋아요 API
 */
const likePostApi = async cardId => {
  try {
    const { data } = await authInstance.post(
      `${import.meta.env.VITE_BE_SERVER}/likes/${cardId}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { likePostApi };
