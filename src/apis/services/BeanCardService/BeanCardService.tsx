import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { getBeanCardApi } from '../../api/beanCardApi/beanCardApi';
import { cardState } from '../../../recoil/atom/cardState';
import { searchKeywordState } from '../../../recoil/atom/searchKeywordState';

const GetBeanCardService = () => {
  const [cards, setCards] = useRecoilState(cardState);
  return useQuery('beanCard', getBeanCardApi, {
    onSuccess: data => {
      setCards(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });
};

// const SearchBeanCardService = () => {
//   const [cards, setCards] = useRecoilState(cardState);
//   const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
//   return useQuery('searchBeanCard', SearchBeanCardApi, {
//     onSuccess: data => {
//       setCards(data);
//       setSearchKeyword('');
//     },
//     onError: error => {
//       console.log(error);
//     },
//     enabled: true,
//   });
// };

export { GetBeanCardService };
