import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import myPageApi from '../../../../apis/api/myPageApi/myPageApi';
import heartFill from '../../../../assets/img/heart-fill.png';

const FavoriteBeansList = () => {
  // 받아올 찜 한 목록을 담는 Card 변수
  const [favoriteCard, setFavoriteCard] = useState([]);

  // 찜한 목록 가져오기
  const { data: fetchCardData } = useQuery(['favoriteBeans'], async () => {
    const response = await myPageApi();
    return response.data.data.heartList;
  });

  useEffect(() => {
    if (fetchCardData) {
      setFavoriteCard(fetchCardData);
    }
  }, [fetchCardData]);

  return (
    <div className="w-full">
      <div className="text-3xl m-3">찜한 원두</div>
      <div className="grid grid-cols-3">
        {favoriteCard.map(bean => (
          <Link to={`/details/${bean.id}`} key={bean.id} className="">
            <div className="card border-none m-[1.2rem] bg-white rounded-xl shadow-md">
              <div className="h-[14rem] overflow-hidden relative rounded-xl">
                <img
                  className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src={bean.beanImage}
                  alt=""
                />
              </div>
              <div className="m-[1rem]">
                <div className="flex justify-between items-center">
                  <div className="text-[1.2rem]">
                    {bean.origin} {bean.beanName}
                  </div>
                  <div>
                    <img className="w-[1.2rem]" src={heartFill} alt="" />
                  </div>
                </div>
                <div className="flex gap-2 mt-[1rem] pb-[1rem] text-[0.8rem]">
                  <div className="border-[0.1rem] px-[0.4rem]  border-black rounded-md opacity-50">
                    Label
                  </div>
                  <div className="border-[0.1rem] px-[0.4rem] border-black rounded-md opacity-50">
                    Label
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBeansList;
