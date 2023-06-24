import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../../components/Header/Header';
import Kakaomap from '../../components/KakaoMap/Kakaomap';
import heartFill from '../../assets/img/heart-fill.png';
import heart from '../../assets/img/heart.png';
import { cardIdMapState } from '../../recoil/atom/cardIdMapState';
import { visibleCafesState } from '../../recoil/atom/visibleCafesState';
import { loginState } from '../../recoil/atom/loginState';
import { likeStatusState, likesCountState } from '../../recoil/atom/likeState';
import { LikeMutation } from '../../apis/services/LikeService/LikeService';
import {
  isInfoCafeModalState,
  isLoginModalState,
  isMoreCafeModalState,
} from '../../recoil/atom/modalState';
import MoreCafeModal from '../../components/Modal/MoreCafeModal/MoreCafeModal';
import myPageApi from '../../apis/api/myPageApi/myPageApi';
import BeanComments from '../../components/BeanComments/BeanComments';
import beanPageIdState from '../../recoil/atom/beanPageIdState';
import InfoCafeModal from '../../components/Modal/InfoCafeModal/InfoCafeModal';
import { cardDetailApi } from '../../apis/api/cardDetailApi/cardDetailApi';

const Details: React.FC = () => {
  const navigate = useNavigate();
  // 로그인이 되었는지 확인하기 위한 상태 변수
  const [loggedin, setLoggedin] = useRecoilState(loginState);

  // 좋아요 버튼 상태를 담기 위한 상태 변수
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  const [likesCount, setLikesCount] = useRecoilState(likesCountState);

  // 현재 URL의 파라미터를 가져오기 위한 상태 변수
  const { id: pageId } = useParams();
  const [beanPageId, setBeanPageId] = useRecoilState(beanPageIdState);

  // 카드를 담기 위한 상태 변수
  const [card, setCard] = useState([]);

  // 로그인 모달 관련된 변수 ------------------------------------------
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  // ------------------------------------------------------------------
  // 카페 더보기 모달 관련된 변수 --------------------------------------
  const [isMoreCafeModalOpen, setIsMoreCafeModalOpen] =
    useRecoilState(isMoreCafeModalState);
  const openMoreCafeModal = () => {
    setIsMoreCafeModalOpen(true);
  };
  // ------------------------------------------------------------------
  // 카페 상세 정보 모달 관련된 변수
  const [, setIsInfoCafeModalOpen] = useRecoilState(isInfoCafeModalState);
  const openInfoCafeModal = () => {
    setIsInfoCafeModalOpen(true);
  };
  // ------------------------------------------------------------------

  const [, setCardId] = useRecoilState(cardIdMapState);
  setCardId(pageId);

  // 좋아요 기능
  const likeMutation = LikeMutation();
  const handleLike = cardId => {
    // 로그인 상태 체크
    if (!loggedin) {
      openLoginModal();
      return;
    }

    // 현재 좋아요 상태 반전
    const newLikeStatus = !likeStatus;
    likeMutation.mutate(cardId, {
      onSuccess: data => {
        setLikesCount(data.data.likeCount);
        setLikeStatus(newLikeStatus);
      },
    });
  };

  // 상세 데이터 가져오기
  const { isLoading, data } = useQuery(['cardDetail', pageId], async () => {
    const beanData = await cardDetailApi(pageId);

    setLikesCount(beanData.data.bean.likesCount);
    return beanData.data.bean;
  });

  const visibleCafes = useRecoilValue(visibleCafesState);
  const count = visibleCafes.length;

  // 메인페이지가 로딩되었을 때 로그인이 되어있는지 판단
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('ACCESS_KEY');
      if (accessToken) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };

    checkLoginStatus();
  }, [loggedin]);

  // 상세 데이터 가져오기 성공 시 카드 데이터를 담기
  useEffect(() => {
    if (data) {
      setCard(data);
      setBeanPageId(pageId);
    }
  }, [data, likesCount, pageId]);

  // 현재 좋아요 상태를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!loggedin) return;
      const response = await myPageApi();
      const heartList = response.data.data.heartList.map(bean => bean.id);

      setLikeStatus(heartList.includes(parseInt(pageId)));
    };

    fetchLikeStatus();
  }, [pageId, loggedin]);

  if (isLoading) return <div />;

  return (
    <div className="full-conainer w-full h-[100vh]">
      <div className="body-container">
        <div className="Header">
          <Header />
        </div>
        <hr />
        <div className="contents-area max-w-[1440px] mx-auto pt-[12rem]">
          {/* ----- top ----- */}
          <div className="top my-[5rem]">
            <div className="top-image w-full grid grid-cols-2 mx-auto mb-[50px]">
              {/* ----- top-left ----- */}
              <div className="top-left relative overflow-hidden h-[38rem] rounded-xl">
                <img
                  src={data.beanImage}
                  alt="원두이미지"
                  className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div />
              </div>
              {/* ----- top-right ----- */}
              <div className="top-right mx-auto">
                <div
                  className="border-[1px] border-black flex justify-center
              rounded-[0.5rem] px-[0.3rem] text-[1.4rem]"
                >
                  {data.hashTag}
                </div>
                <div className="flex justify-between my-[1rem]">
                  <div className="flex text-[2rem] font-semibold">
                    {data.origin} {data.beanName}
                  </div>
                  <div
                    className="flex justify-end items-center cursor-pointer"
                    onClick={() => handleLike(pageId)}
                    role="presentation"
                  >
                    {likeStatus ? (
                      <img
                        src={heartFill}
                        className="w-[1.4rem] h-[1.4rem] mx-[0.4rem]"
                        alt=""
                      />
                    ) : (
                      <img
                        src={heart}
                        className="w-[1.4rem] h-[1.4rem] mx-[0.4rem]"
                        alt=""
                      />
                    )}
                    <div>{likesCount}</div>
                  </div>
                </div>
                <div className="flex">
                  <img className="" src={data.beanGraph} alt="" />
                </div>
              </div>
            </div>
            <div className="top-text text-[1.4rem] mb-7">{data.beanInfo}</div>
          </div>

          {/* ----- middle ----- */}
          <div className="middle">
            <BeanComments />
          </div>

          {/* ----- bottom ----- */}
          <div className="bottom" />
          <div className="middle-title text-[2.5rem] flex">
            <div>근처에서 찾는 원두</div>
          </div>
          <div>
            <Kakaomap />
          </div>
          <div className="mb-[6rem]">
            <div className="flex justify-between mt-[2rem] mb-[2rem] text-xl font-bold items-center px-[1.2rem]">
              <div className="flex items-center">
                <div className="text-primary-color-orange">{count}</div>
                <div>개의 카페가 있습니다.</div>
              </div>
              {visibleCafes.length > 4 && (
                <div
                  className="border border-primary-color-orange text-primary-color-orange
                  py-[0.5rem] px-[1.25rem] rounded-xl cursor-pointer"
                  onClick={openMoreCafeModal}
                  role="presentation"
                >
                  + 더보기
                </div>
              )}
              <MoreCafeModal />
            </div>
            <div className="cardBox grid grid-cols-4 gap-[0.8125rem]">
              {visibleCafes.slice(0, 4).map(cafe => (
                <div
                  key={cafe.id}
                  className="cafeCard object-cover shadow-lg h-[20.825rem] rounded-2xl cursor-pointer"
                  onClick={() => {
                    alert('카페 자세히 보기는 준비중입니다.');
                  }}
                  role="presentation"
                >
                  <img
                    src={cafe.cafeImage}
                    alt=""
                    className="w-full h-[14.825rem] rounded-2xl object-cover"
                  />
                  <div className="px-[1.4375rem] pt-[0.9rem] pb-[1.28125rem] ">
                    <p className="text-xl font-bold h-[2.25rem] leading-[1.625rem]">
                      {cafe.cafeName}
                    </p>
                    <p className="text-[#868A91] leading-[1.3rem]">
                      {cafe.cafeAddress}
                    </p>
                  </div>
                </div>
              ))}
              <InfoCafeModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
