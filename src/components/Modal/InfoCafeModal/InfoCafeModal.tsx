import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
import { isInfoCafeModalState } from '../../../recoil/atom/modalState';
import Kakaomap from '../../KakaoMap/Kakaomap';
import Heart from '../../../assets/img/heart-fill.png';
import CafeKakaoMap from '../../CafeKakaoMap/CafeKakaoMap';

const { kakao } = window;

const InfoCafeModal = () => {
  const [isInfoCafeModalOpen, setIsInfoCafeModalOpen] =
    useRecoilState(isInfoCafeModalState);

  // 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsInfoCafeModalOpen(false);
    }
  };

  return (
    <div
      className={`modalContainer fixed inset-0 flex items-center justify-center z-[100] ${
        isInfoCafeModalOpen ? 'visible' : 'hidden'
      }`}
    >
      <div
        className="absolute z-[99] top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-10"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          className="absolute border-[2px] border-[#F45A00] p-[14px] rounded-[5px] w-[60rem] 
          overflow-y-auto top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white"
        >
          <div className="contentsArea w-[55rem] m-auto p-[1.5rem]">
            <div className="navbar mb-[2rem]">
              <div className="top flex justify-between items-center w-full">
                <div>
                  <IoIosArrowBack
                    className="cursor-pointer w-[1rem]"
                    onClick={handleOverlayClick}
                    role="presentation"
                  />
                </div>
                <div className="cursor-pointer" role="presentation">
                  <IoMdClose onClick={handleOverlayClick} />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[14rem] h-[14rem] mr-[4rem] border-2 border-black">
                사진
              </div>
              <div>
                <div className="mb-[3rem] text-[1.4rem]">카페명123</div>
                <div className="flex mb-3 items-center">
                  <div className="text-[1.2rem] mr-5">주소</div>
                  <div className="text-gray-500">
                    서울시 강동구 양재대로 123456
                  </div>
                </div>
                <div className="flex mb-3 items-center">
                  <div className="text-[1.2rem] mr-5">시간</div>
                  <div className="text-gray-500">
                    평일 08:00~22:00 | 주말 08:00~22:00
                  </div>
                </div>
                <div className="flex mb-3 items-center">
                  <div className="text-[1.2rem] mr-5">연락처</div>
                  <div className="text-gray-500">021-12312312-123135</div>
                </div>
                <div className="flex mb-3 items-center">
                  <div className="text-[1.2rem] mr-5">URL</div>
                  <div className="text-gray-500">www.instagram.com/</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex mb-[1rem]">
                <div className="text-orange-600">카페명</div>
                <div>의 위치</div>
              </div>
              <div className="w-full h-full">
                <CafeKakaoMap />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex">
                <div className="text-orange-600">카페명</div>
                <div>에 있는 원두</div>
              </div>
              <div className="grid grid-cols-4">
                <div className="m-[1.5rem] rounded-lg shadow-lg w-[10rem]">
                  <div className="border-[0.1rem] rounded-lg w-full h-[8rem] flex items-center justify-center">
                    사진
                  </div>
                  <div className="p-[0.75rem]">
                    <div className="flex justify-between items-center m-[0.2rem]">
                      <div className="text-[1.25rem]">원두명</div>
                      <div>
                        <img className="w-[1rem] " src={Heart} alt="" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-[1.5rem] rounded-lg shadow-lg w-[10rem]">
                  <div className="border-[0.1rem] rounded-lg w-full h-[8rem] flex items-center justify-center">
                    사진
                  </div>
                  <div className="p-[0.75rem]">
                    <div className="flex justify-between items-center m-[0.2rem]">
                      <div className="text-[1.25rem]">원두명</div>
                      <div>
                        <img className="w-[1rem] " src={Heart} alt="" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-[1.5rem] rounded-lg shadow-lg w-[10rem]">
                  <div className="border-[0.1rem] rounded-lg w-full h-[8rem] flex items-center justify-center">
                    사진
                  </div>
                  <div className="p-[0.75rem]">
                    <div className="flex justify-between items-center m-[0.2rem]">
                      <div className="text-[1.25rem]">원두명</div>
                      <div>
                        <img className="w-[1rem] " src={Heart} alt="" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-[1.5rem] rounded-lg shadow-lg w-[10rem]">
                  <div className="border-[0.1rem] rounded-lg w-full h-[8rem] flex items-center justify-center">
                    사진
                  </div>
                  <div className="p-[0.75rem]">
                    <div className="flex justify-between items-center m-[0.2rem]">
                      <div className="text-[1.25rem]">원두명</div>
                      <div>
                        <img className="w-[1rem] " src={Heart} alt="" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                      <div className="px-3 py-0.5 border-[0.1rem] font-normal text-[0.44rem] border-gray-600 rounded-md text-gray-600">
                        Label
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCafeModal;
