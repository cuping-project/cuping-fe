import React from 'react';
import cafeProfile from '../../../../assets/img/profile-cafe.png';
import moreDots from '../../../../assets/img/moreThreeDot.png';

// Cafe Info Component
const CafeInfo = ({ handleAddCafe }) => (
  <div className="cafe info-container ">
    <div className="cafe info-container text-[2.25rem] font-normal mb-[1.5rem]">
      카페 정보 관리
    </div>
    <div className="flex flex-col">
      <div
        className="my-cafe-box w-[62.625rem] h-[9rem] bg-white rounded-lg 
                        flex flex-row items-center justify-between"
      >
        <img
          src={cafeProfile}
          alt=""
          className="w-[5rem] h-[5rem] ml-[4.41rem]"
        />
        <div className="text-[2.25rem] font-bold">no-name</div>
        <div className="text-[1.5rem] ml-[7rem] mr-[11.25rem]">
          서울시 강남구 역삼동
        </div>
        <button
          type="button"
          className="text-[1.25rem] w-[4.25rem] h-[2.215rem] bg-black text-white rounded-lg "
        >
          등록중
        </button>
        <img
          src={moreDots}
          alt="카페 정보 삭제 버튼"
          className="mr-[4.41rem]"
        />
      </div>
      <div
        className="cafe-add-container w-[62.625rem] h-[9rem] mt-[1rem] 
  border-2 border-dashed border-gray-200 rounded-lg 
  flex flex-row items-center justify-center text-[#858991]"
      >
        <button type="button" className="" onClick={handleAddCafe}>
          + 카페 추가 신청
        </button>
      </div>
    </div>
  </div>
);

export default CafeInfo;
