import axiosInstance from '../../utils/axiosInstance';

const getBeanMap = async card_id => {
  try {
    const location = '강서';
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BE_SERVER
      }/main/bean/${card_id}?address=${location}`,
    );

    // console.log('🍩 💛 getBeanMap 💛 response:', response.data.data.cafeList);
    return response.data.data.cafeList;
  } catch (error) {
    console.log('🍩 💛 getBeanMap 💛 error:', error);
  }
};

export { getBeanMap };
