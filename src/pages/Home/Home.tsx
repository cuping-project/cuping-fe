import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import pinIcon from '../../assets/img/pin.svg';
import styles from './Home.module.css';
import LoginModal from '../../components/Modal/LoginModal/LoginModal';
import Header from '../../components/Header/Header';
import heart from '../../assets/img/heart.png';
import heartFill from '../../assets/img/heart-fill.png';
import { ICard } from './types';
import { cardState } from '../../recoil/atom/cardState';
import {
  searchBeanCardApi,
  getBeanCardApi,
} from '../../apis/api/beanCardApi/beanCardApi';
import { searchKeywordState } from '../../recoil/atom/searchKeywordState';
import { loginState } from '../../recoil/atom/loginState';
import {
  GetBeanCardService,
  SearchBeanCardService,
} from '../../apis/services/BeanCardService/BeanCardService';
import { locationState } from '../../recoil/atom/locationState';

const Home: React.FC = () => {
  // 로그인 상태 변수
  const [loggedin, setLoggedin] = useRecoilState(loginState);

  // 카드 상태 변수
  const [cards, setCards] = useRecoilState(cardState);

  // 검색어 상태 변수
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  // 로그인 모달 관련된 변수
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // heart 관련된 기능
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const heartHandler = () => {
    setIsHeartPressed(!isHeartPressed);
  };

  const [location, setLocation] = useRecoilState(locationState);

  // 전체, 위치 버튼 클릭 시 토글
  const [isAllSelected, setIsAllSelected] = useState(true);

  // 신맛, 쓴맛, 단맛, 탄맛, 디카페인 상태 변수
  const [isSshinSelected, setIsSshinSelected] = useState(false); // 신맛
  const [isSsunSelected, setIsSsunSelected] = useState(false); // 쓴맛
  const [isTanSelected, setIsTanSelected] = useState(false); // 탄맛
  const [isDanSelected, setIsDanSelected] = useState(false); // 단맛
  const [isDeSelected, setIsDeSelected] = useState(false); // 디카페인

  // 모달 상태 함수
  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  // 신맛 태그 클릭 토글
  const handleToggleShin = () => {
    setIsSshinSelected(!isSshinSelected);
  };

  // 쓴맛 태그 클릭 토글
  const handleToggleSsun = () => {
    setIsSsunSelected(!isSsunSelected);
  };

  // 탄맛 태그 클릭 토글
  const handleToggleTan = () => {
    setIsTanSelected(!isTanSelected);
  };

  // 단맛 태그 클릭 토글
  const handleToggleDan = () => {
    setIsDanSelected(!isDanSelected);
  };

  // 디카페인 태그 클릭 토글
  const handleToggleDe = () => {
    setIsDeSelected(!isDeSelected);
  };

  // "전체" 버튼 클릭 시 토글
  const handleToggleAll = () => {
    setIsAllSelected(!isAllSelected);
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

  // 메인페이지를 처음 로딩 되었을때 카드를 받아옴
  // const { isLoading, isError } = GetBeanCardService();
  // if (isLoading) return <div>로딩중...!!!</div>;
  // if (isError) return <div>에러 발생함 !!!</div>;
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
  // const searchHandler = () => {
  //   SearchBeanCardService();
  // };

  // 검색버튼 클릭 시 검색어를 통해 카드를 받아옴
  const searchHandler = async () => {
    try {
      const response = await searchBeanCardApi(searchKeyword);
      setCards(response);
      setSearchKeyword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <div className="flex flex-col mx-[5rem] max-w-[1440px]">
        <Header />
        <hr />
        <div className="main-contents w-full flex justify-center items-center flex-col mt-[-5rem]">
          {/* ---------- 검색 네비게이터 ---------- */}
          <div className="search-bar mb-[4rem] relative">
            <div className="text-primary-color-orange pb-4 pl-2 flex space-x-2 d1024:justify-start justify-center">
              <img src={pinIcon} alt="" className="w-[14px] " />
              <button type="submit">서울특별시 강남구</button>
            </div>
            {/* ---------- 검색창 ---------- */}
            <input
              type="text"
              className="search-bar-input my-2 p-4 border-2 rounded-[15px] border-black
              flex justify-center d1440:w-[50rem] d1024:w-[30rem]"
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
              className="search-btn absolute right-[1.5rem] bottom-[1.7rem]"
              onClick={searchHandler}
              type="submit"
            >
              검색
            </button>
          </div>
          <div className="content-text flex text-5xl mb-[4rem]">
            <div>지금&nbsp;</div>
            <div className="text-primary-color-orange">여기, 내 취향&nbsp;</div>
            <div>으로 찾는 원두</div>
          </div>
          <div className="card-contents w-full">
            <div className="sorting-btn-area w-full grid grid-cols-2">
              <div className="sorting-btn-right flex">
                <button
                  type="submit"
                  className={`sorting-btn bg-primary-color-orange text-white border-1 m-2 px-2 py-1 rounded-[10px] ${
                    isAllSelected ? '' : 'opacity-30'
                  }`}
                  onClick={handleToggleAll}
                >
                  전체
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
                <button
                  type="submit"
                  className={`m-2 px-4 py-1 border-2 rounded-[10px] text-[12px] cursor-pointer ${
                    isSsunSelected
                      ? 'bg-primary-color-orange text-white'
                      : 'border-black opacity-20'
                  }`}
                  onClick={handleToggleSsun}
                >
                  쓴맛
                </button>
                <button
                  type="submit"
                  className={`m-2 px-4 py-1 border-2 rounded-[10px] text-[12px] cursor-pointer ${
                    isTanSelected
                      ? 'bg-primary-color-orange text-white'
                      : 'border-black opacity-20'
                  }`}
                  onClick={handleToggleTan}
                >
                  탄맛
                </button>
                <button
                  type="submit"
                  className={`m-2 px-4 py-1 border-2 rounded-[10px] text-[12px] cursor-pointer ${
                    isDanSelected
                      ? 'bg-primary-color-orange text-white'
                      : 'border-black opacity-20'
                  }`}
                  onClick={handleToggleDan}
                >
                  단맛
                </button>
                <button
                  type="submit"
                  className={`m-2 px-4 py-1 border-2 rounded-[10px] text-[12px] cursor-pointer ${
                    isDeSelected
                      ? 'bg-primary-color-orange text-white'
                      : 'border-black opacity-20'
                  }`}
                  onClick={handleToggleDe}
                >
                  디카페인
                </button>
              </div>
            </div>

            <div className="cards grid grid-cols-3">
              {/* // ----- Card ----- // */}
              {isAllSelected &&
                cards.map(card => (
                  <Link
                    to={`/details/${card.id}`}
                    key={card.id}
                    className="card m-4 shadow-md border border-gray-300 rounded-[12px] cursor-pointer"
                  >
                    {/* <div>{console.log(card)}</div> */}
                    <div className="card-picture overflow-hidden">
                      <img
                        src={card.beanImage}
                        alt=""
                        className="w-full h-[14rem] object-cover rounded-[12px]"
                      />
                    </div>
                    <div className="card-name grid grid-cols-2">
                      <div className="bean-name text-xl p-2 ml-3">
                        {card.beanOriginName} {card.beanName}
                      </div>
                      <div className="flex items-center justify-end p-2">
                        <div className="heart mx-2 cursor-pointer w-[1rem]">
                          <img src={heartFill} className="m-[0.2rem]" alt="" />
                        </div>
                        <div>{card.likesCount}</div>
                      </div>
                    </div>
                    <div className="card-labels p-2 flex">
                      <div className="card-label border-2 rounded-[5px] px-2 m-2 text-[1rem]">
                        {card.hashTag}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
