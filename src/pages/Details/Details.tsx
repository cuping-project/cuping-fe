import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import Header from '../../components/Header/Header';
import Kakaomap from '../../components/KakaoMap/Kakaomap';
import heartFill from '../../assets/img/heart-fill.png';
import heart from '../../assets/img/heart.png';
import coffeeGraph from '../../assets/img/coffee-graph.png';
import cafe1 from '../../assets/img/cafe-image01.jpg';
import cafe2 from '../../assets/img/cafe-image02.jpg';
import { loginState } from '../../recoil/atom/loginState';
import { likeStatusState, likesCountState } from '../../recoil/atom/likeState';
import { LikeMutation } from '../../apis/services/LikeService/LikeService';
import {
  isLoginModalState,
  isMoreCafeModalState,
} from '../../recoil/atom/modalState';
import MoreCafeModal from '../../components/Modal/MoreCafeModal/MoreCafeModal';
import myPageApi from '../../apis/api/myPageApi/myPageApi';
import BeanComments from '../../components/BeanComments/BeanComments';
import beanPageIdState from '../../recoil/atom/beanPageIdState';

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
  }, []);

  // 로그인 모달 관련된 변수
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 카페 더보기 모달 관련된 변수
  const [isMoreCafeModalOpen, setIsMoreCafeModalOpen] =
    useRecoilState(isMoreCafeModalState);

  const openMoreCafeModal = () => {
    setIsMoreCafeModalOpen(true);
  };

  // 좋아요 기능
  const likeMutation = LikeMutation();
  const handleLike = cardId => {
    // 로그인 상태 체크
    if (!loggedin) {
      openLoginModal();
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
    const response = await axios.get(
      `${import.meta.env.VITE_BE_SERVER}/main/bean/${pageId}?address=`,
    );

    setLikesCount(response.data.data.bean.likesCount);
    return response.data.data;
  });

  useEffect(() => {
    if (data) {
      setCard(data);
      setBeanPageId(pageId);
    }
  }, [data]);

  // 현재 좋아요 상태를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const response = await myPageApi();
      const { heartList } = response?.data.data;
      // console.log(heartList);
      setLikeStatus(heartList.includes(parseInt(pageId)));
    };

    fetchLikeStatus();
  }, [pageId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <div className="flex flex-col mx-[5rem] max-w-[1440px]">
        <div onClick={() => navigate('/')} role="presentation">
          <Header />
        </div>
        <hr />
        <div className="inner-container w-full justify-center mx-auto">
          {/* ----- top ----- */}
          <div className="top my-[5rem]">
            <div className="top-image w-full grid grid-cols-2 mx-auto mb-[50px]">
              {/* ----- top-left ----- */}
              <div className="top-left mx-auto overflow-hidden h-[41.5rem]">
                <img
                  src={data.bean.beanImage}
                  alt="원두이미지"
                  className="w-full h-[41.25rem] object-cover"
                  style={{ objectFit: 'contain' }}
                />
                <div />
              </div>
              {/* ----- top-right ----- */}
              <div className="top-right mx-auto">
                <div
                  className="border-[1px] border-black flex justify-center
              rounded-[0.5rem] px-[0.3rem] text-[1.4rem]"
                >
                  {data.bean.hashTag}
                </div>
                <div className="flex justify-between my-[1rem]">
                  <div className="flex text-[2rem] font-semibold">
                    {data.bean.origin} {data.bean.beanName}
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
                  <img className="" src={coffeeGraph} alt="" />
                </div>
              </div>
            </div>
            <div className="top-text text-[1.4rem] mb-7">
              {data.bean.beanInfo}
            </div>
            <button
              className="moreText border-2 rounded-lg w-full text-[22px] text-gray-500 p-1.5 "
              type="button"
            >
              더보기
            </button>
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
            <div className="flex justify-between mt-[2rem] mb-[2rem] text-xl font-bold">
              <div>
                <span className="text-primary-color-orange">2</span>
                개의 카페가 있습니다.
              </div>
              <div
                className="border border-primary-color-orange text-primary-color-orange
                py-[0.5rem] px-[1.25rem] rounded-xl cursor-pointer"
                onClick={openMoreCafeModal}
                role="presentation"
              >
                + 더보기
              </div>
              <MoreCafeModal />
            </div>
            <div className="cardBox grid grid-cols-4 gap-[0.8125rem]">
              <div className="cafeCard object-cover shadow-lg h-[20.825rem] rounded-2xl">
                <img
                  src={cafe1}
                  alt=""
                  className="w-full h-[14.825rem] rounded-2xl"
                />
                <div className="px-[1.4375rem] pt-[0.9rem] pb-[1.28125rem] ">
                  <p className="text-xl font-bold h-[2.25rem] leading-[1.625rem]">
                    카페우드진
                  </p>
                  <p className="text-[#868A91] leading-[1.3rem]">
                    마곡중앙6로 45 리더스퀘어 113호 A ,B동 사이
                  </p>
                </div>
              </div>
              <div className="cafeCard object-cover shadow-lg h-[20.825rem] rounded-2xl">
                <img
                  src={cafe2}
                  alt=""
                  className="w-full h-[14.825rem] rounded-2xl"
                />
                <div className="px-[1.4375rem] pt-[0.9rem] pb-[1.28125rem] ">
                  <p className="text-xl font-bold h-[2.25rem] leading-[1.625rem]">
                    소카크
                  </p>
                  <p className="text-[#868A91] leading-[1.3rem]">
                    서울 강서구 마곡동로 56 1층 103호
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
