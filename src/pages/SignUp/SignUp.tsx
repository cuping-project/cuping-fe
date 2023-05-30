import React from 'react';
import styles from './SignUp.module.css';

function SignUp() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        {/* <h1 className="font-bold text-center text-2xl mb-5">Cupping</h1> */}
        <div className="bg-white divide-y divide-gray-200 border-4 border-orange-200">
          <div className="px-7 py-10">
            <div className="p-3">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="transition duration-200 border bg-gray-200 border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md focus:text-orange-400 focus:font-semibold focus:bg-white font-normal text-center inline-block"
                >
                  일반 회원 등록
                </button>
                <button
                  type="button"
                  className="transition duration-200 border bg-gray-200 border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md focus:text-orange-400 focus:font-semibold focus:bg-white font-normal text-center inline-block"
                >
                  사장님 회원 등록
                </button>
              </div>
            </div>
            <p className="font-semibold text-sm text-gray-600 pb-1 block">
              아이디
            </p>
            <input
              type="text"
              placeholder="아이디 입력(5~12자)"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <p className="font-semibold text-sm text-gray-600 pb-1 block">
              닉네임
            </p>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <p className="font-semibold text-sm text-gray-600 pb-1 block">
              비밀번호
            </p>
            <input
              type="password"
              placeholder="비밀번호 입력(영문,숫자 조합 최소8자)"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <p className="font-semibold text-sm text-gray-600 pb-1 block">
              비밀번호 확인
            </p>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="button"
              className="transition duration-200 bg-orange-400 hover:bg-orange-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">회원가입 하기</span>
            </button>
            <div className="border-t border-gray-200 my-5 mt-10" />
            <button
              type="button"
              className="transition duration-200 bg-yellow-400 hover:bg-yellow-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              카카오톡 간편 가입하기
            </button>
            <div className="mt-10 text-center">
              <span className="font-semibold text-sm">
                이미 커핑 회원이세요?
              </span>
              <span className="font-semibold text-sm ml-2 text-orange-600 tracking-tighter">
                로그인 하러 가기
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
