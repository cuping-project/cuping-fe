import axiosInstance from '../../utils/axiosInstance';

const getBeanMap = async (card_id, city, district) => {
  try {
    const region = `${city} ${district}`;
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BE_SERVER
      }/main/bean/${card_id}?address=${region}`,
    );

    // console.log('🍩 💛 getBeanMap 💛 response:', response.data.data.cafeList);
    return response.data.data.cafeList;
  } catch (error) {
    console.log('🍩 💛 getBeanMap 💛 error:', error);
  }
};

export { getBeanMap };
