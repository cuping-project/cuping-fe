import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './CitySelectModal.module.css';
import { isCitySelectModalState } from '../../../recoil/atom/modalState';
import { citySearchApi } from '../../../apis/api/citySearchApi/citySearchApi';
import { selectedLocationState } from '../../../recoil/atom/selectedLocationState';
import arrowDown from '../../../assets/img/arrow-down.svg';

const CitySelectModal: React.FC = () => {
  const navigate = useNavigate();
  const [isCitySelectModalOpen, setIsCitySelectModalOpen] = useRecoilState(
    isCitySelectModalState,
  );
  const [cityData, setCityDate] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useRecoilState(
    selectedLocationState,
  );

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsCitySelectModalOpen(false);
    }
  };

  // 모달창을 처음 켰을때 주소를 받아옴
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const { data } = await citySearchApi();
        setCityDate(data);

        // 중복 없는 city 배열 생성
        const unique = data.reduce((result, item) => {
          return result.includes(item.city) ? result : [...result, item.city];
        }, []);
        setUniqueCities(unique);
        setSelectedCity(unique[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, []);

  const handleSearchClick = () => {
    setSelectedLocation({ city: selectedCity, district: selectedDistrict });
    setIsCitySelectModalOpen(false);
  };

  return (
    <div
      className={`${styles.modalContainer} ${
        isCitySelectModalOpen ? 'visible' : 'hidden'
      }`}
    >
      <div
        className={styles.modalWrapper}
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div className={styles.modalContent}>
          <div className={styles.contentArea}>
            <div className={styles.textArea}>
              <p className={styles.textTitle}>현재 위치를 확인하세요.</p>
              <p className={styles.textTitle}>지역을 선택해 주시기 바랍니다.</p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <select
                  className={`${styles.loginCancel} w-32 h-[3rem] pl-[1.2rem] pr-8 py-2 rounded-lg relative
                  bg-white border-2 border-gray-400 focus:border-blue-500 shadow appearance-none`}
                  value={selectedCity}
                  onChange={e => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  {uniqueCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <img
                  className="absolute w-[1rem] top-[1rem] right-[3rem]"
                  src={arrowDown}
                  alt=""
                />
              </div>
              <div className="relative">
                <select
                  className={`${styles.loginCancel} w-32 h-[3rem] pl-[1.2rem] pr-8 py-2 rounded-lg relative
                  bg-white border-2 border-gray-400 focus:border-blue-500 shadow appearance-none`}
                  onChange={e => {
                    setSelectedDistrict(e.target.value);
                  }}
                >
                  {cityData
                    .filter(item => item.city === selectedCity)
                    .map((item, index) => (
                      <option key={index} value={item.district}>
                        {item.district}
                      </option>
                    ))}
                </select>
                <img
                  className="absolute w-[1rem] top-[1rem] right-[3rem]"
                  src={arrowDown}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.loginAnswer}>
              <div
                role="presentation"
                className={styles.loginOk}
                onClick={handleSearchClick}
              >
                조회하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelectModal;
