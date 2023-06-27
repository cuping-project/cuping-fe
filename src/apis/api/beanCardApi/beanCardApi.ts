import axiosInstance from '../../utils/axiosInstance';

const getBeanCardApi = async sort => {
  try {
    const { data } = await axiosInstance.get(
      `${
        import.meta.env.VITE_BE_SERVER
      }/main/beans/search?keyword=&sort=${sort}`,
    );

    return data;
  } catch (error) {
    console.log('✨ ‣ getBeanCardApi ‣ error:', error);
    throw error;
  }
};

const searchBeanCardApi = async (sortSelected, keyword, filters = []) => {
  try {
    let sort = sortSelected;
    if (sort === '') {
      sort = 'abc';
    }
    const filterParams = filters.map(filter => `&filter=${filter}`).join('');
    const { data } = await axiosInstance.get(
      `${
        import.meta.env.VITE_BE_SERVER
      }/main/beans/search?keyword=${keyword}&sort=${sort}${filterParams}`,
    );

    return data;
  } catch (error) {
    console.log('✨ ‣ SearchBeanCardApi ‣ error:', error);
  }
};

export { getBeanCardApi, searchBeanCardApi };
