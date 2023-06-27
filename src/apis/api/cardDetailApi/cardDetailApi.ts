import axiosInstance from '../../utils/axiosInstance';

const cardDetailApi = async (pageId, city, district) => {
  try {
    const region = `${city} ${district}`;
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
