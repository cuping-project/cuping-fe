import { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Post from '../../components/Modal/Post';

function OwnerSignUpForm({
  userId,
  handleChangeUserId,
  nickname,
  handleChangeNickname,
  password,
  handleChangePassword,
  passwordCheck,
  handleChangePasswordCheck,
  passwordCheckError,
}) {
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

  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef();
  const handleFileAddButton = () => {
    fileInputRef.current.click();
  };
  const handleFileChangeName = e => {
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <label htmlFor="idInput" className="text-sm text-gray-600 pb-1 block">
        <div className="font-semibold mb-1">아이디</div>
        <div className="flex items-center gap-2">
          <input
            value={userId}
            // onChange={handleChangeUserId}
            id="idInput"
            type="text"
            placeholder="아이디 입력(5~12자)"
            className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
          />
          <button
            type="button"
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
            // onChange={handleChangeNickname}
            id="nkInput"
            type="text"
            placeholder="닉네임을 입력하세요."
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
          <button
            type="button"
            className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-[10rem] py-2 mb-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            중복확인
          </button>
        </div>
      </label>
      <label htmlFor="pwInput" className="text-sm text-gray-600 pb-1 block">
        <div className="font-semibold mb-1">비밀번호</div>
        <input
          value={password}
          onChange={handleChangePassword}
          id="pwInput"
          type="password"
          placeholder="비밀번호 입력(영문,숫자 조합 최소8자)"
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
              passwordCheckError
                ? 'ring-red-500 ring-1 border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full'
                : 'border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            }`}
          />
        </label>
        {passwordCheckError && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="absolute text-red-500 right-1 bottom-1"
              viewBox="0 0 1792 1792"
            >
              <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
            </svg>
            <p className="absolute text-xs text-red-500 -bottom-[0.001rem]">
              {passwordCheckError}
            </p>
          </>
        )}
      </div>
      <label htmlFor="addressInput" className="text-sm text-gray-600 pb-1">
        <div className="font-semibold mb-1">가게 주소</div>
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
            <Post
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
          placeholder="상세주소"
          className="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
        />
      </label>
      <label htmlFor="shopnumberInput" className="text-sm text-gray-600 pb-1">
        <div className="font-semibold mb-1">가게 전화번호</div>
        <input
          // value={}
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
        <div className="font-semibold mb-1">사업자등록증</div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            id="licenseInput"
            type="file"
            hidden
            onChange={handleFileChangeName}
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
        // onClick={}
        className="transition duration-200 bg-primary-color-salgu hover:bg-primary-color-orange text-white w-full py-2.5 mt-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block mr-2">회원가입 하기</span>
      </button>
    </>

    // 나머지 사장님 회원 등록 폼 요소들
  );
}

export default OwnerSignUpForm;
