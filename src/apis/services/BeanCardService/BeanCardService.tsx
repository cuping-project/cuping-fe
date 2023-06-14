import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import {
  getBeanCardApi,
  searchBeanCardApi,
} from '../../api/beanCardApi/beanCardApi';
import { cardState } from '../../../recoil/atom/cardState';
import { searchKeywordState } from '../../../recoil/atom/searchKeywordState';

const GetBeanCardService = () => {
  const [cards, setCards] = useRecoilState(cardState);
  return useQuery('beanCard', getBeanCardApi, {
    onSuccess: data => {
      setCards(data.data);
    },
  });
};

const SearchBeanCardService = () => {
  const [cards, setCards] = useRecoilState(cardState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  return useQuery('searchBeanCard', () => searchBeanCardApi(searchKeyword), {
    onSuccess: data => {
      setCards(data.data);
    },
  });
};

export { GetBeanCardService, SearchBeanCardService };
