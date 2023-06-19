import React from 'react';
import house from '../../../../assets/img/house.png';

// Cafe Edit Component
const CafeEdit = ({ addingCafe }) => (
  <div className="contents-container text-[2.25rem] mx-auto ">
    {addingCafe ? (
      <div className="ml-[7rem]">
        <div>카페 정보 관리</div>
        <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            카페 이름
            <span className="text-red-600 text-[1.7rem]">*</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
        </div>
        <div className="flex flex-row mb-[1rem] ">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            영업 시간
            <span className="text-red-600 text-[1.7rem]">*</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
        </div>
        <div className="cafeImage  text-[1.5rem] font-bold mr-[3.375rem]">
          카페 이미지
          <span className="text-red-600 text-[1.7rem]">*</span>
        </div>
        <div className="flex">
          <div className="w-[27rem] h-[27rem] bg-[#D9D9D9] flex justify-center items-center">
            <img src={house} alt="" className="w-[18.56rem] h-[19.25rem]" />
          </div>
          <div className="text-[1.25rem] ml-[1.5rem]">
            <div className="mb-[3rem]">
              10MB 이하의 jpg, jpeg, png 파일을 업로드 해주세요.
            </div>
            <div className="font-bold mb-3">
              다음 사진은 사용이 불가하며 승인이 반려됩니다.
            </div>
            <div className="mb-3">- 썸네일 이미지에 텍스트를 사용한 사진</div>
            <div className="mb-3">- 인위적 홍보 문구가 포함된 사진</div>
            <div className="mb-3">- 타인의 가게 등 저작권에 위배되는 사진</div>
            <div>- 카페와 관련이 없는 사진</div>
            <button
              type="button"
              className="bg-primary-color-orange w-[9.37rem] h-[3rem]
          text-white rounded-lg text-[1.5rem] mt-[6.63rem]"
            >
              파일 선택
            </button>
          </div>
        </div>
        <div className="flex flex-row mb-[1rem] mt-[2rem]">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            카페 주소
            <span className="text-red-600 text-[1.7rem]">*</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
          <button
            type="button"
            className="bg-primary-color-orange w-[8.125rem] h-[3rem]
          text-white rounded-lg text-[1.5rem] ml-[1rem]"
          >
            주소찾기
          </button>
        </div>
        <div>
          <input
            className="cafeAddressInput w-[42.5rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] ml-[9.625rem] mb-[1rem] "
          />
          <input
            className="cafeAddressInput w-[42.5rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] ml-[9.625rem] mb-[1rem] "
          />
        </div>
        <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            전화 번호
            <span className="text-red-600 text-[1.7rem]">*</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
        </div>
        <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
          <div className="text-[1.5rem] font-bold mr-[1.125rem]">
            사업자등록증
            <span className="text-red-600 text-[1.7rem]">*</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
          <button
            type="button"
            className="bg-primary-color-orange w-[8.125rem] h-[3rem]
          text-white rounded-lg text-[1.5rem] ml-[1rem]"
          >
            파일 선택
          </button>
        </div>
        <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            URL<span className="font-normal">&#40;선택&#41;</span>
          </div>
          <input
            className="w-[33.375rem] h-[3.125rem] bg-white 
      rounded-lg border border-[#dcddd5] "
          />
        </div>
        {/* ----- 원두 추가 모달 ----- */}
        <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
          <div className="text-[1.5rem] font-bold mr-[3.375rem]">
            사용 원두
            <span className="text-red-600 text-[1.7rem] ">*</span>
          </div>
        </div>
        <div>
          <div
            className="h-[19.875rem] w-[18.625rem] border-2 
      border-dashed border-gray-200 rounded-lg flex justify-center items-center mb-[2rem]"
          >
            <button type="button" className="text-[1.25rem]">
              + 원두 추가하기
            </button>
          </div>
        </div>
        {/* ----- 카페 등록 저장 버튼----- */}
        <div className="flex flex-row mb-[10rem]">
          <button
            type="button"
            className="bg-white text-primary-color-salgu
        w-[27rem] h-[4rem] border rounded-lg text-[1.5rem]"
          >
            임시저장
          </button>
          <button
            type="button"
            className="bg-primary-color-salgu text-white text-[1.5rem]
        w-[27rem] h-[4rem] border rounded-lg ml-[1.25rem]"
          >
            등록요청
          </button>
        </div>
      </div>
    ) : null}
  </div>
);

export default CafeEdit;
