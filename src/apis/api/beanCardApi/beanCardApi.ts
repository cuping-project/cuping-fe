import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { useRecoilState } from 'recoil';
import { searchKeywordState } from '../../../recoil/atom/searchKeywordState';

const getBeanCardApi = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/beans/search?keyword=`,
    );
    console.log('✨ ‣ getBeanCardApi ‣ data:', data);
    return data;
  } catch (error) {
    console.log('✨ ‣ getBeanCardApi ‣ error:', error);
    throw error;
  }
};

const searchBeanCardApi = async searchKeyword => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_BE_SERVER
      }/main/beans/search?keyword=${searchKeyword}`,
    );
    return data.data;
  } catch (error) {
    console.log('✨ ‣ SearchBeanCardApi ‣ error:', error);
  }
};

export { getBeanCardApi, searchBeanCardApi };
