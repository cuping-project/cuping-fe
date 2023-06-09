import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import pinIcon from '../../assets/pin.svg';
import styles from './Home.module.css';
import LoginModal from '../../components/LoginModal/LoginModal';
import Header from '../../components/Header/Header';
import heart from '../../assets/heart.png';
import heartFill from '../../assets/heartFill.png';

interface Card {
  id: number;
  beanImage: string;
  beanOriginName: string;
  beanName: string;
  hashTag: string;
}

const Home: React.FC = () => {
  // 로그인이 되었는지 확인
  const [loggedin, setLoggedin] = useState(true);

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  // heart 관련된 기능
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const heartHandler = () => {
    setIsHeartPressed(!isHeartPressed);
  };

  // 카드를 받아와서 저장하는 곳
  const [cards, setCards] = useState<Card[]>([]);

  // 전체, 위치 버튼 클릭 시 토글
  const [isAllSelected, setIsAllSelected] = useState(true);

  // 신맛, 쓴맛, 단맛, 탄맛, 디카페인 상태 변수
  const [isSshinSelected, setIsSshinSelected] = useState(false); // 신맛
  const [isSsunSelected, setIsSsunSelected] = useState(false); // 쓴맛
  const [isTanSelected, setIsTanSelected] = useState(false); // 탄맛
  const [isDanSelected, setIsDanSelected] = useState(false); // 단맛
  const [isDeSelected, setIsDeSelected] = useState(false); // 디카페인

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

  // 검색어 상태 변수
  const [searchKeyword, setSearchKeyword] = useState('');

  // "전체" 버튼 클릭 시 토글
  const handleToggleAll = () => {
    setIsAllSelected(!isAllSelected);
  };

  // 전체 원두 카드를 가져오는 axios 함수
  const getCard = async (): Promise<Card[]> => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BE_SERVER}/main/beans/search?keyword=`,
      );
      return data;
    } catch (err) {
      console.log('✨ ‣ getCard ‣ err:', err);
      return [];
    }
  };

  // 검색 결과 가져오기
  const getSearchResults = async (): Promise<Card[]> => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BE_SERVER
        }/main/beans/search?keyword=${searchKeyword}`,
      );
      return data.data;
    } catch (err) {
      console.log('✨ ‣ getSearchResults ‣ err:', err);
    }
  };

  // react-query로 axios로 받아온 데이터 정제
  const { data, isLoading, isError } = useQuery<Card[]>('cards', getCard, {
    onSuccess: data => {
      setCards(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  if (isLoading) return <h2>로딩중...</h2>;
  if (isError) return <h2>에러...</h2>;

  // 검색 버튼 클릭 이벤트 처리
  const handleSearch = async () => {
    try {
      const searchResults = await getSearchResults();
      setCards(searchResults);
    } catch (err) {
      console.log('✨ ‣ handleSearch ‣ err:', err);
    }
  };

  return (
    <div className="main-container w-full">
      <div className="flex flex-col mx-[5rem]">
        <Header loggedin={loggedin} />
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
                  handleSearch();
                }
              }}
            />
            <button
              className="search-btn absolute right-[1.5rem] bottom-[1.7rem]"
              onClick={handleSearch}
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
                      <div className="flex justify-end p-2">
                        <div className="stars mx-2">⭐️ 3</div>
                        {loggedin ? (
                          isHeartPressed ? (
                            <div
                              className="heart mx-2 cursor-pointer w-[1.2rem]"
                              onClick={heartHandler}
                              role="presentation"
                            >
                              <img
                                src={heartFill}
                                className="m-[0.2rem]"
                                alt=""
                              />
                            </div>
                          ) : (
                            <div
                              className="heart mx-2 cursor-pointer w-[1.2rem]"
                              onClick={heartHandler}
                              role="presentation"
                            >
                              <img src={heart} className="m-[0.2rem]" alt="" />
                            </div>
                          )
                        ) : (
                          <div>
                            <button
                              type="submit"
                              onClick={openModal}
                              className="w-[1.2rem]"
                            >
                              <img src={heart} className="m-[0.2rem]" alt="" />
                            </button>
                            <LoginModal
                              isOpen={isLoginModalOpen}
                              closeModal={closeModal}
                            />
                          </div>
                        )}
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
