import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import {
  getBeanCardApi,
  searchBeanCardApi,
} from '../../api/beanCardApi/beanCardApi';
import { cardState } from '../../../recoil/atom/cardState';
import { searchKeywordState } from '../../../recoil/atom/searchKeywordState';
import showCardState from '../../../recoil/atom/showCardState';

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
  const [showCard, setShowCard] = useRecoilState(showCardState);

  return useQuery('searchBeanCard', () => searchBeanCardApi(searchKeyword), {
    onSuccess: data => {
      setCards(data.data);
      setShowCard(false);
    },
    enabled: showCard,
  });
};

export { GetBeanCardService, SearchBeanCardService };
