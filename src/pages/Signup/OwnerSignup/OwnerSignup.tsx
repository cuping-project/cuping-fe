import React, { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SearchAddress from '../../../components/Modal/SearchAddress/SearchAddressModal';
import { ownerSignupApi } from '../../../apis/api/signupApi/signupApi';
import useInput from '../../../hooks/useInput';
import errorIcon from '../../../assets/img/warning.svg';
import checkIcon from '../../../assets/img/check.svg';
import {
  CheckUserIdService,
  SignupOwnerService,
} from '../../../apis/services/SignupService/SignupService';
import styles from './OwnerSignup.module.css';

// todo recoil로 상태관리 하기
const OwnerSignup = ({
  userId,
  handleChangeUserId,
  nickname,
  handleChangeNickname,
  password,
  handleChangePassword,
  passwordCheck,
  handleChangePasswordCheck,
  passwordCheckError,
}) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [storeName, storeNameRef, handleChangeStoreName] = useInput();
  const [detailAddress, detailAddressRef, setDetailAddress] = useInput();

  // 전화번호 하이픈 핸들러
  const insertHyphen = phoneNumber => {
    let formattedNumber = phoneNumber;
    if (formattedNumber.length > 3 && formattedNumber.length <= 7) {
      formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(
        3,
      )}`;
    } else if (formattedNumber.length > 7) {
      formattedNumber = `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(
        3,
        7,
      )}-${formattedNumber.slice(7)}`;
    }
    return formattedNumber;
  };

  const handleChangeStoreNumber = e => {
    const inputPhoneNumber = e.target.value;
    // 하이픈 제거
    const processedPhoneNumber = inputPhoneNumber.replace(/-/g, '');
    // 하이픈 삽입
    const formattedNumber = insertHyphen(processedPhoneNumber);
    setPhoneNumber(processedPhoneNumber); // 하이픈이 없는 숫자만 저장
    setFormattedPhoneNumber(formattedNumber); // 하이픈이 있는 형식화된 번호 저장
  };

  // 주소 검색 모달
  const [enrollCompany, setEnrollCompany] = useState({
    address: '',
    zonecode: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const handleInput = e => {
    setEnrollCompany({
      ...enrollCompany,
      [e.target.name]: e.target.value,
    });
  };
  const handleComplete = data => {
    setShowPopup(false);
    setEnrollCompany({
      ...enrollCompany,
      address: data.address,
      zonecode: data.zonecode,
    });
  };

  // 사업자 등록증 이미지 업로드
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const handleFileAddButton = () => {
    fileInputRef.current.click();
  };
  const handleFileChangeName = e => {
    setFileName(e.target.files[0].name);
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  // 아이디 중복 검사
  const { mutate: CheckUserMutate } = CheckUserIdService();
  const idCheckBtnClick = () => {
    if (!userId) {
      alert('아이디를 입력하세요.');
      return;
    }

    CheckUserMutate({ userId });
  };

  // 회원가입 로직
  const { mutate: SignupOwnerMutation } = SignupOwnerService();
  // 회원가입 버튼 핸들러
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('storeName', storeName);
    formData.append('storeAddress', `${enrollCompany.address}${detailAddress}`);
    formData.append('storeNumber', phoneNumber);
    formData.append('authImage', selectedFile);
    SignupOwnerMutation(formData);
  };

  return (
    <>
      <label htmlFor="idInput" className="text-sm text-gray-600 pb-1 block">
        <div className="font-semibold mb-1">아이디</div>
        <div className="flex items-center gap-2">
          <input
            value={userId}
            onChange={handleChangeUserId}
            id="idInput"
            type="text"
            placeholder="아이디 입력(5~12자)"
            className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
          />
          <button
            type="button"
            onClick={idCheckBtnClick}
            className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-[10rem] py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            중복확인
          </button>
        </div>
      </label>
      <label htmlFor="nkInput" className="text-sm text-gray-600 pb-1 block">
        <div className="font-semibold mb-1">닉네임</div>
        <div className="flex items-center gap-2">
          <input
            value={nickname}
            onChange={handleChangeNickname}
            id="nkInput"
            type="text"
            placeholder="닉네임을 입력하세요."
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
        </div>
      </label>
      <label htmlFor="pwInput" className="text-sm text-gray-600 pb-1 block">
        <div className="font-semibold mb-1">비밀번호</div>
        <input
          value={password}
          onChange={handleChangePassword}
          id="pwInput"
          type="password"
          placeholder="최소 8~12자, 알파벳 소문자, 숫자 및 특수문자"
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
      </label>
      <div className="relative">
        <label
          htmlFor="pwCheckInput"
          className="text-sm text-gray-600 pb-1 block"
        >
          <div className="font-semibold mb-1">비밀번호 확인</div>
          <input
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
            id="pwCheckInput"
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            className={`${
              passwordCheckError === '비밀번호가 일치합니다.'
                ? 'ring-green-500 ring-1 border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full'
                : 'ring-red-500 ring-1 border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full'
            }`}
          />
        </label>
        {passwordCheckError ? (
          <div className="flex items-center justify-between">
            <p
              className={`text-xs ${
                passwordCheckError === '비밀번호가 일치합니다.'
                  ? 'text-green-500'
                  : 'text-red-500'
              } flex items-center`}
            >
              {passwordCheckError}
            </p>
            <img
              src={
                passwordCheckError === '비밀번호가 일치합니다.'
                  ? checkIcon
                  : errorIcon
              }
              className="w-[18px] flex items-center"
              alt=""
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-xs text-green-500 flex items-center">
              {passwordCheckError}
            </p>
            <img
              src={checkIcon}
              className="w-[18px] flex items-center"
              alt=""
            />
          </div>
        )}
      </div>
      <label htmlFor="shopnameInput" className="text-sm text-gray-600 pb-1">
        <div className="font-semibold mb-1 mt-6">가게 이름</div>
        <input
          value={storeName}
          onChange={handleChangeStoreName}
          id="shopnameInput"
          type="text"
          placeholder="가게 이름을 입력해주세요."
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
      </label>
      <label htmlFor="addressInput" className="text-sm text-gray-600 pb-1">
        <div className="font-semibold mb-1 mt-2">가게 주소</div>
        <div className="flex items-center gap-2">
          <input
            id="addressInput"
            type="text"
            placeholder="우편번호"
            required
            name="address"
            onChange={handleInput}
            value={enrollCompany.zonecode}
            className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
          />
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-[10rem] py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            주소찾기
          </button>
          {showPopup && (
            <SearchAddress
              company={enrollCompany}
              setcompany={setEnrollCompany}
              onComplete={handleComplete}
              className="postmodal"
              autoClose
            />
          )}
        </div>
        <input
          value={enrollCompany.address}
          placeholder="주소"
          readOnly
          className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
        />
        <input
          type="text"
          value={detailAddress}
          onChange={setDetailAddress}
          placeholder="상세주소"
          className="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
        />
      </label>
      <label htmlFor="shopnumberInput" className="text-sm text-gray-600 pb-1">
        <div className="font-semibold mb-1 mt-2">가게 전화번호</div>
        <input
          value={formattedPhoneNumber}
          onChange={handleChangeStoreNumber}
          id="shopnumberInput"
          type="text"
          placeholder="가게 전화번호를 입력해주세요."
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
      </label>
      <label
        htmlFor="licenseInput"
        className="text-sm text-gray-600 pb-1 block"
      >
        <div className="font-semibold mb-1 mt-2">사업자등록증</div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            // value={selectedFile}
            id="licenseInput"
            type="file"
            hidden
            onChange={handleFileChange}
            className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
          />
          <input
            type="text"
            readOnly
            value={fileName}
            placeholder="이미지 업로드"
            className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
          />
          <button
            type="button"
            onClick={handleFileAddButton}
            className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-[10rem] py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            파일선택
          </button>
        </div>
      </label>
      <button
        type="submit"
        onClick={handleSubmit}
        className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-full py-2.5 mt-6 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block mr-2">회원가입 하기</span>
      </button>
    </>
    // 나머지 사장님 회원 등록 폼 요소들
  );
};
export default OwnerSignup;
