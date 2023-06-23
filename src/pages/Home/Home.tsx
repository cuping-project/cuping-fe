import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import pinIcon from '../../assets/img/pin.svg';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import heartFill from '../../assets/img/heart-fill.png';
import searchNone from '../../assets/img/search-none.png';
import { cardState } from '../../recoil/atom/cardState';
import { searchKeywordState } from '../../recoil/atom/searchKeywordState';
import { loginState } from '../../recoil/atom/loginState';
import { locationState } from '../../recoil/atom/locationState';
import showCardState from '../../recoil/atom/showCardState';
import myPageApi from '../../apis/api/myPageApi/myPageApi';
import nicknameState from '../../recoil/atom/nicknameState';
import {
  getBeanCardApi,
  searchBeanCardApi,
} from '../../apis/api/beanCardApi/beanCardApi';
import { LikeMutation } from '../../apis/services/LikeService/LikeService';
import { likeStatusState, likesCountState } from '../../recoil/atom/likeState';
import { isLoginModalState } from '../../recoil/atom/modalState';

const Home: React.FC = () => {
  // 로그인 상태 변수
  const [loggedin, setLoggedin] = useRecoilState(loginState);

  // 카드 상태 변수
  const [cards, setCards] = useRecoilState(cardState);

  // 검색어 상태 변수
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  // nickname 받아오기 위한 상태 변수
  const [nickname, setNickname] = useRecoilState(nicknameState);

  // 로그인 모달 관련된 변수
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);

  // 좋아요 버튼 상태를 담기 위한 상태 변수
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  const [likesCount, setLikesCount] = useRecoilState(likesCountState);

  // 로그인 모달 상태 변수
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 좋아요 순 버튼 토글
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(true);

  // 신맛, 쓴맛, 단맛, 탄맛, 디카페인 상태 변수
  const [isSshinSelected, setIsSshinSelected] = useState(false); // 신맛

  // 신맛 태그 클릭 토글
  const handleToggleShin = () => {
    alert('태그로 필터 기능은 준비 중 입니다.');
    setIsSshinSelected(!isSshinSelected);
  };

  // "좋아요 순" 버튼 클릭 시 토글
  const handleToggleFavorite = () => {
    setIsFavoriteSelected(!isFavoriteSelected);
  };

  //  메인페이지가 로딩되었을 때 로그인이 되어있는지 판단
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

  // nickname 받아오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await myPageApi();
        setNickname(response.data.data.nickname);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNickname();
  }, [nickname]);

  // 메인페이지를 처음 로딩 되었을때 카드를 받아옴
  useEffect(() => {
    const fetchBeanCard = async () => {
      try {
        const { data } = await getBeanCardApi();
        setCards(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBeanCard();
  }, []);

  // 검색버튼 클릭 시 검색어를 통해 카드를 받아옴
  const searchHandler = async () => {
    try {
      const response = await searchBeanCardApi(searchKeyword);
      console.log(response.data);
      setCards(response.data);
    } catch (error) {
      console.log(error);
    }
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
        console.log(data.data.likeCount);
        setLikesCount(data.data.likeCount);
        setLikeStatus(newLikeStatus);
      },
    });
  };

  // 메인페이지를 처음 로딩 되었을때 카드를 받아옴
  // GetBeanCardService();

  // 검색버튼 클릭 시 검색어를 통해 카드를 받아 옴
  // const searchHandler = () => {
  //   setShowCard(true);
  // };
  // SearchBeanCardService();

  return (
    <div className="full-conainer w-full h-[100vh]">
      <div className="body-container">
        <div className="Header">
          <Header />
        </div>
        <div
          className="contents-area
          mobile:max-w-[320px] d1440:max-w-[1220px] d1024:max-w-[960px] d1920:max-w-[1500px] tablet:max-w-[600px]
          mx-auto d1920:pt-[3.5rem] d1024:pt-[2.5rem] tablet:pt-[3rem] mobile:pt-[5rem]"
        >
          {/* ---------- 검색 네비게이터 ---------- */}
          <div className="search-bar d1920:mb-[4rem] mobile:mb-[2rem] relative ">
            <div className="flex d1920:w-[14rem] d1440:w-[10rem] mobile:w-[7rem] mobile:hidden mx-auto relative z-10">
              <div
                className="text-primary-color-orange d1920:pb-[1rem] mobile:pb-[0.1rem]
                flex d1920:text-[1.2rem] d1440:text-[1.2rem] mobile:text-[0.8rem]"
              >
                <img src={pinIcon} alt="" className="w-[14px]" />
                <button
                  onClick={() => {
                    alert('준비중입니다.');
                  }}
                  type="submit"
                >
                  서울특별시 강서구
                </button>
              </div>
            </div>
            {/* ---------- 검색창 ---------- */}
            <div
              className="relative flex justify-between items-center border-2 rounded-[15px] border-black
              mx-auto d1440:w-[50rem] d1024:w-[35rem] tablet:w-[20rem] mobile:w-[15rem] z-10"
            >
              <input
                type="text"
                className="search-bar-input my-2 d1920:p-[1rem] d1440:p-[1rem] d1024:p-[0.8rem]
                tablet:p-[0.7rem] mobile:px-[0.5rem] border-none w-full
                focus:outline-none d1920:text-[1.2rem] d1440:text-[1.2rem] mobile:text-[0.8rem]"
                placeholder="찾으시는 원두를 입력해 주세요."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    searchHandler();
                  }
                }}
              />
              <button
                className="search-btn w-[2.5rem] d1440:mr-[1.5rem] mobile:mr-[1rem]
                absolute right-0 d1920:text-[1.2rem] d1440:text-[1.2rem] mobile:text-[0.8rem]"
                onClick={searchHandler}
                type="submit"
              >
                검색
              </button>
            </div>
          </div>
          {cards.length === 0 ? (
            <div className="content-text flex justify-center mobile:text-[1.2rem] text-[3rem] mobile:mb-[2rem] content-none">
              <div className="text-primary-color-orange">`{searchKeyword}`</div>
              <div>에 대한 검색결과가 없습니다.</div>
            </div>
          ) : (
            <div
              className="content-text flex justify-center
            text-[3rem] d1440:text-[2.5rem] d1024:text-[2rem] tablet:text-[1.5rem] mobile:text-[1.2rem]
            mb-[4rem] mobile:mb-[2rem] content-none"
            >
              <div>지금&nbsp;</div>
              <div className="text-primary-color-orange">
                여기, 내 취향&nbsp;
              </div>
              <div>으로 찾는 원두</div>
            </div>
          )}

          <div className="card-contents d1920:min-w-[1440px] mx-auto">
            <div className="sorting-btn-area w-full grid grid-cols-2">
              <div className="sorting-btn-right flex">
                <button
                  type="submit"
                  className={`sorting-btn bg-primary-color-orange text-white border-1 m-2 px-2 py-1 rounded-[10px] ${
                    isFavoriteSelected ? '' : 'opacity-30'
                  }`}
                  onClick={handleToggleFavorite}
                >
                  좋아요 순
                </button>
              </div>

              <div className="sorting-btn-left flex justify-end">
                <button
                  type="submit"
                  className={`m-2 px-4 py-1 border-2 rounded-[10px] text-[12px] cursor-pointer ${
                    isSshinSelected
                      ? 'bg-primary-color-orange text-white'
                      : 'border-black opacity-20'
                  }`}
                  onClick={handleToggleShin}
                >
                  신맛
                </button>
              </div>
            </div>

            <div
              className="cards grid mx-auto d1920:min-w-[1440px] d1440:min-w-[1024px]
              grid-cols-3 tablet:grid-cols-2 d1024:grid-cols-3 mobile:grid-cols-1"
            >
              {/* // ----- Card ----- // */}
              {cards.length === 0 ? (
                <div className="col-start-2 row-start-2">
                  <img src={searchNone} alt="" />
                </div>
              ) : (
                [...cards]
                  .sort((a, b) => b.likesCount - a.likesCount)
                  .map(card => (
                    <Link
                      to={`/details/${card.id}`}
                      key={card.id}
                      className="card m-4 shadow-md border border-gray-300 rounded-[12px] cursor-pointer"
                    >
                      <div className="card-picture overflow-hidden">
                        <img
                          src={card.beanImage}
                          alt=""
                          className="w-full h-[14rem] object-cover rounded-[12px]"
                        />
                      </div>
                      <div className="card-name flex justify-between">
                        <div className="bean-name text-xl p-2 ml-3">
                          {card.origin} {card.beanName}
                        </div>
                        <div className="flex items-center justify-end p-2">
                          <div className="heart mx-2 cursor-pointer w-full flex items-center pr-[0.5rem] mr-[0.8rem]">
                            <img
                              src={heartFill}
                              className="mr-[0.5rem] w-[1.2rem] cursor-pointer"
                              alt="하트이미지"
                            />
                            <div className="text-[1.2rem]">
                              {card.likesCount}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-labels p-2 flex">
                        <div className="card-label border-2 rounded-[5px] px-2 m-2 text-[1rem]">
                          {card.hashTag}
                        </div>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
