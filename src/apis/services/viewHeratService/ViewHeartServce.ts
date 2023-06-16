import { useQuery } from 'react-query';
import myPageApi from '../../api/myPageApi/myPageApi';

const ViewHeartService = () => {
  return useQuery('viewHeart', myPageApi);
};

export default ViewHeartService;
