import axiosInstance from '../../utils/axiosInstance';

const cardDetailApi = async pageId => {
  try {
    const region = '서울 강서구';
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/bean/${pageId}?address=${region}`,
    );

    return data;
  } catch (error) {
    console.log('✨ 💥 cardDetailApi 💥 error:', error);
    throw error;
  }
};

export { cardDetailApi };
