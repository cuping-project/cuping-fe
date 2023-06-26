import axiosInstance from '../../utils/axiosInstance';

const getBeanCardApi = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/beans/search?keyword=&sort=likes`,
    );

    return data;
  } catch (error) {
    console.log('✨ ‣ getBeanCardApi ‣ error:', error);
    throw error;
  }
};

const searchBeanCardApi = async keyword => {
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/beans/search?keyword=${keyword}`,
    );

    return data;
  } catch (error) {
    console.log('✨ ‣ SearchBeanCardApi ‣ error:', error);
  }
};

export { getBeanCardApi, searchBeanCardApi };
