import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../components/Header/Header';
import beanImage from '../../assets/bean-image.png';
import beanDetail from '../../assets/detail.png';
import profileImage from '../../assets/detail-profile-card.png';

const Details: React.FC = () => {
  // 로그인이 되었는지 확인
  const [loggedin, setLoggedin] = useState(false);

  // 메인페이지가 로딩되었을 때 로그인이 되어있는지 판단
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="container w-full">
      <Header loggedin={loggedin} />
      <hr />
      <div className="inner-container w-[1440px] mx-auto">
        {/* ----- top ----- */}
        <div className="top my-[5rem]">
          <div className="top-image w-full grid grid-cols-2 mx-auto mb-[50px]">
            {/* ----- top-left ----- */}
            <div className="top-left mx-auto">
              <img src={beanImage} alt="원두이미지" className="w-[41.25rem]" />
            </div>
            {/* ----- top-right ----- */}
            <div className="top-right mx-auto">
              <img src={beanDetail} alt="원두이미지" className="w-[546px]" />
            </div>
          </div>
          <div className="top-text text-[30px] mb-7">
            버본(Bourbon)은 아라비카(Arabica)의 가장 오래된 변종 중 하나이고
            산토스(Santos)는 브라질 상파울루 항구 이름으로 주로 커피를 무역하던
            곳이다. 열매를 맺기 시작한지 3년~4년된 커피나무에서는 작고 단단한
            생두를 생산하는데 이 때 수확한 것을 버본 산토스(Bourbon Santos)라고
            한다. 주로 5월~9월에 수확하며 자연 당도의 유지를 위해 건식법(Dry
            Method)을 이용한다. 결점두가 4개 이하일 때 최고 등급인 No.2로
            구분한다. 생두는 노란빛을 띠는 황색이며 로스팅(Roasting)은
            시티(City)와 풀 시티(Full City) 로스팅 중간쯤으로 하는 것이
            일반적이다. 향이 뛰어나고 단맛과 신맛, 쓴맛이 골고루 조화를 이루며
            식었을 때 신맛이 더욱 강해진다.
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
          <div className="middle-top w-full flex justify-between">
            <div className="middle-title text-[2.5rem] flex">
              <div className="text-primary-color-orange">26</div>
              <div>건의 커핑 노트</div>
            </div>
            <div
              className="middle-review-button cursor-pointer border-[0.07rem] flex items-center font-semibold
            border-primary-color-orange rounded-xl m-2 py-1 px-4 text-primary-color-orange text-[1.25rem]"
            >
              + 리뷰 추가하기
            </div>
          </div>
          <div className="middle-card-area grid grid-cols-2">
            {/* card */}
            <div className="middle-card flex border-[0.07rem] border-gray-200 m-3 p-5 rounded-xl">
              <div className="card-picture mr-5 min-w-[60px] flex-shrink-0">
                <img src={profileImage} alt="프로필 카드" />
              </div>
              <div className="card-contents">
                <div className="card-nickname">커핑커핑닉네임</div>
                <div className="flex mb-2">
                  <div className="card-star mr-4">⭐️⭐️⭐️⭐️⭐️</div>
                  <div className="card-days text-[0.8rem] flex items-end">
                    2023. 06. 01
                  </div>
                </div>
                <div className="card-text">아침에 커피향이 정말 좋습니다.</div>
              </div>
            </div>
            {/* card */}
            <div className="middle-card flex border-[0.07rem] border-gray-200 m-3 p-5 rounded-xl">
              <div className="card-picture mr-5 min-w-[4rem] flex-shrink-0">
                <img src={profileImage} alt="프로필 카드" />
              </div>
              <div className="card-contents">
                <div className="card-nickname">커핑커핑닉네임</div>
                <div className="flex mb-2">
                  <div className="card-star mr-4">⭐️⭐️⭐️⭐️⭐️</div>
                  <div className="card-days text-[0.8rem] flex items-end">
                    2023. 06. 01
                  </div>
                </div>
                <div className="card-text">
                  아침에 커피향이 정말 좋습니다. 확실히 다른 원두보다 향과 맛이
                  진한 것 같습니다. 맛있게 마셨습니다.
                </div>
              </div>
            </div>
            {/* card */}
            <div className="middle-card flex border-[0.07rem] border-gray-200 m-3 p-6 rounded-xl">
              <div className="card-picture mr-5 min-w-[60px] flex-shrink-0">
                <img src={profileImage} alt="프로필 카드" />
              </div>
              <div className="card-contents">
                <div className="card-nickname">커핑커핑닉네임</div>
                <div className="flex mb-2">
                  <div className="card-star mr-4">⭐️⭐️⭐️⭐️⭐️</div>
                  <div className="card-days text-[0.8rem] flex items-end">
                    2023. 06. 01
                  </div>
                </div>
                <div className="card-text">
                  로스팅 정도에 따라 맛이 다른가 봅니다. 신맛은 산미라고 하나
                  봐요. 좋은 원두가 비싼 건지 비싼 원두가 좋은 건지 모르겠지만
                  아무튼 원두의 종류는 다양하고 향이 좋습니다.
                </div>
              </div>
            </div>
          </div>
          <div className="page-nation w-full flex justify-center">
            <div
              className="page-number flex items-center justify-center w-[2.5rem] h-[2.5rem] border-[0.07rem]
              border-primary-color-orange m-2 rounded-[50%] text-center"
            >
              1
            </div>
            <div
              className="page-number flex items-center justify-center w-[2.5rem] h-[2.5rem] border-[0.07rem]
              border-primary-color-orange m-2 rounded-[50%] text-center"
            >
              2
            </div>
          </div>
        </div>

        {/* ----- bottom ----- */}
        <div className="bottom" />
      </div>
    </div>
  );
};

export default Details;
