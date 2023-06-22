import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { getBeanMap } from '../../apis/api/mapApi/mapApi';
import { cardIdMapState } from '../../recoil/atom/cardIdMapState';

const { kakao } = window;

const CafeKakaoMap = () => {
  const [cardId, setCardId] = useRecoilState(cardIdMapState);
  // const { isLoading, data } = useQuery('getmap', () => getBeanMap(cardId));

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.5677463315893, 126.8397655094666), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  }, []);
  return (
    <div>
      <div id="map" className="w-full h-[300px] relative" />
    </div>
  );
};

export default CafeKakaoMap;
