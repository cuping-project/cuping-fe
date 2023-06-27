import React, { useState, useRef } from 'react';
import grayLogo from '../../assets/img/grayCharacLogo.png';
import house from '../../assets/img/house.png';
import Header from '../../components/Header/Header';
import Menu from './components/Menu';
import UserHeader from './components/UserHeader';
import CafeInfo from './components/cafeInfo/CafeInfo';
import BeanAddModal from './components/modal/BeanAddModal';

const OwnerPage = () => {
  const [selected, setSelected] = useState<string>('내 정보 관리');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageURL, setSelectedImageURL] = useState<string>(grayLogo);
  const [addingCafe, setAddingCafe] = useState<boolean>(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('이미지?:', file);
      setSelectedFile(file);

      // Read the file and convert it to Base64 URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  // 카페 추가하기 버튼 핸들러
  const handleAddCafe = () => {
    setAddingCafe(true);
  };

  // handle user info update
  const handleUpdate = () => {};

  return (
    <div className="main-container w-full bg-[#f4f4f5] flex justify-center">
      <div className="biggest-container h-[100vh] w-full bg-[#f4f4f5">
        <div className="header-bg-container w-full bg-[#fff] flex justify-center mb-[3.125rem]">
          <div className="header-container w-[1440px]">
            <Header />
          </div>
        </div>

        <div className="contents-container max-w-[1440px] mx-auto bg-[#f5f5f4]">
          {/* ----- top ----- */}
          <UserHeader selectedImageURL={selectedImageURL} />
          <div className="max-w-[1440px] mx-auto ">
            <div className="contents-container w-full flex">
              <Menu setSelected={setSelected} />
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
                        <img
                          src={house}
                          alt=""
                          className="w-[18.56rem] h-[19.25rem]"
                        />
                      </div>
                      <div className="text-[1.25rem] ml-[1.5rem]">
                        <div className="mb-[3rem]">
                          10MB 이하의 jpg, jpeg, png 파일을 업로드 해주세요.
                        </div>
                        <div className="font-bold mb-3">
                          다음 사진은 사용이 불가하며 승인이 반려됩니다.
                        </div>
                        <div className="mb-3">
                          - 썸네일 이미지에 텍스트를 사용한 사진
                        </div>
                        <div className="mb-3">
                          - 인위적 홍보 문구가 포함된 사진
                        </div>
                        <div className="mb-3">
                          - 타인의 가게 등 저작권에 위배되는 사진
                        </div>
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
                    <BeanAddModal />
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
                ) : (
                  <div>
                    {/* ----- 메뉴 container ----- */}
                    {selected === '내 정보 관리' && (
                      <div className="my-info-container text-[2.25rem] mb-[2.5rem] pr-[6rem]">
                        내 정보 관리
                        <div className="container flex mt-[1.5rem]">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            ref={hiddenFileInput}
                          />
                          <button
                            type="submit"
                            onClick={handleClick}
                            className="w-[16rem] h-[16rem] mr-[5.375rem]"
                          >
                            <img
                              src={selectedImageURL}
                              alt="charac"
                              className="w-[16rem] h-[16rem] mr-[5.375rem] rounded-full"
                            />
                          </button>
                          {/* ----- 내정보 Input container ----- */}
                          <div className="input-container flex flex-col text-[1.25rem] ml-5">
                            <div className="text-[1.25rem] font-bold mb-[0.5rem]">
                              닉네임
                            </div>
                            <input
                              className="w-[27rem] h-[3.125rem] rounded-lg mb-[1.5rem]"
                              type="text"
                              placeholder="닉네임을 입력하세요. (최대 12자)"
                            />
                            <div className="text-[1.25rem] font-bold mb-[0.5rem]">
                              비밀번호
                            </div>
                            <input
                              className="w-[27rem] h-[3.125rem] rounded-lg mb-[1.5rem]"
                              type="text"
                              placeholder="비밀번호 입력(영문, 숫자 조합 최소 8자)"
                            />
                            <div className="text-[1.25rem] font-bold mb-[0.5rem]">
                              비밀번호 확인
                            </div>
                            <input
                              className="w-[27rem] h-[3.125rem] rounded-lg mb-[2.5rem]"
                              type="text"
                              placeholder="비밀번호를 다시 입력하세요."
                            />
                            <button
                              type="submit"
                              className="bg-primary-color-salgu text-white w-[27rem] h-[3.125rem] rounded-lg "
                            >
                              저장하기
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {selected === '카페 정보 관리' && (
                      <CafeInfo handleAddCafe={handleAddCafe} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
