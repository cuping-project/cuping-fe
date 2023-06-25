import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cardIdMapState } from '../../recoil/atom/cardIdMapState';

const { kakao } = window;

const CafeKakaoMap = ({ x, y }) => {
  const [cardId, setCardId] = useRecoilState(cardIdMapState);

  useEffect(() => {
    const mapContainer2 = document.getElementById('map2'); // 지도를 표시할 div
    const mapOption2 = {
      center: new kakao.maps.LatLng(Number(x), Number(y)), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map2 = new kakao.maps.Map(mapContainer2, mapOption2); // 지도를 생성합니다
    const markerPosition2 = new kakao.maps.LatLng(Number(x), Number(y));
    const marker2 = new kakao.maps.Marker({
      position: markerPosition2,
    });

    marker2.setMap(map2);
  }, [x, y]);
  return (
    <div>
      <div id="map2" className="w-full h-[300px] relative " />
    </div>
  );
};

export default CafeKakaoMap;
