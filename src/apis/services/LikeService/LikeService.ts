import { useMutation } from 'react-query';
import { likePostApi } from '../../api/likeApi/likeApi';

const LikeMutation = () => {
  return useMutation(cardId => likePostApi(cardId), {
    onSuccess: data => {
      console.log(data);
    },
  });
};

export { LikeMutation };
