import axiosInstance from '../../utils/axiosInstance';

const cardDetailApi = async pageId => {
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/bean/${pageId}?address=`,
    );

    return data;
  } catch (error) {
    console.log('✨ 💥 cardDetailApi 💥 error:', error);
    throw error;
  }
};

export { cardDetailApi };
