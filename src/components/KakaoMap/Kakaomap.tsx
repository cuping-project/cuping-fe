import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getBeanMap } from '../../apis/api/mapApi/mapApi';
import { locationState } from '../../recoil/atom/locationState';
import { cardIdMapState } from '../../recoil/atom/cardIdMapState';
import { visibleCafesState } from '../../recoil/atom/visibleCafesState';
import { selectedLocationState } from '../../recoil/atom/selectedLocationState';

const { kakao } = window;
let currentInfowindow = null;

const Kakaomap = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const [cardId, setCardId] = useRecoilState(cardIdMapState);
  const [visibleCafes, setVisibleCafes] = useRecoilState(visibleCafesState);
  // 선택 지역 전역 변수로 관리
  const selectedLocation = useRecoilValue(selectedLocationState);
  console.log('🍩 💛 Kakaomap 💛 selectedLocation:', selectedLocation);

  const [map, setMap] = useState(null);

  const { isLoading, data } = useQuery('getmap', () =>
    getBeanMap(cardId, selectedLocation.city, selectedLocation.district),
  );

  // 인포윈도우 한개씩만 띄우는 함수
  const openInfoWindow = (newInfowindow, map, marker) => {
    // 이미 열려있는 iw가 있을경우, 이전 iw를 닫음
    if (currentInfowindow) {
      currentInfowindow.close();
    }
    newInfowindow.open(map, marker);
    currentInfowindow = newInfowindow;
  };

  useEffect(() => {
    if (isLoading || !data) return;

    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.5677463315893, 126.8397655094666), // 지도의 중심 좌표
      level: 4, // 지도의 확대 레벨
    };

    if (data && data.length > 0) {
      options.center = new kakao.maps.LatLng(
        Number(data[0].y),
        Number(data[0].x),
      ); // 데이터가 있으면 첫번째 데이터의 정보를 가져와서 설정
    }

    // 지도 생성
    const kakaoMap = new kakao.maps.Map(container, options);

    // 지도의 변경 상황에 따라 현재 보이는 영역에 있는 카페 정보를 저장
    const onMapUpdated = () => {
      // 지도 영역 가져오기
      const bounds = kakaoMap.getBounds();
      // 카페의 위경도값을 가지고 지도영역에 포함되는지 확인
      const newVisibleCafes = data.filter(cafe => {
        const cPos = new kakao.maps.LatLng(Number(cafe.y), Number(cafe.x));
        return bounds.contain(cPos);
      });

      // Recoil 상태 업데이트
      setVisibleCafes(newVisibleCafes);
    };

    // 초기 카페 정보 가져오기
    onMapUpdated();

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커가 표시될 위치
    const markerPositions = data.map(item => {
      return new kakao.maps.LatLng(Number(item.y), Number(item.x));
    });

    // 마커 이미지 설정
    const imageSrc = 'https://cdn-icons-png.flaticon.com/128/1047/1047462.png';
    const imageSize = new kakao.maps.Size(44, 49);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    data.forEach((cafe, index) => {
      const marker = new kakao.maps.Marker({
        position: markerPositions[index],
        image: markerImage,
        clickable: true,
      });

      marker.setMap(kakaoMap);

      // 인포윈도우 그리기
      const iwContent = `
    <div style="width: 300px; padding: 5px; margin: 5px; border-radius: 8px; background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);">
      <div style="position: relative; width: 100%; height: 150px; overflow: hidden;">
        <img src="${cafe.cafeImage}" style="object-fit: cover; position: absolute; top: 50%; left: 50%;
        width: 100%; height: 100%; transform: translate(-50%, -50%); border-radius: 6px;" />
      </div>
      <div style="margin: 10px;">
        <h4 style="font-size: 1.2rem;">${cafe.cafeName}</h4>
        <p style="font-size: 0.8rem; color: #888; margin: 10px 0;">${cafe.cafeAddress}</p>
      </div>
    </div> 
    `;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });

      // Add event listener for each marker
      kakao.maps.event.addListener(marker, 'click', () => {
        openInfoWindow(infowindow, kakaoMap, marker);
        const iwContainer = infowindow.getContent();
        const iwCloseButton = iwContainer.querySelector('button');

        // Add event listener for the close button
        if (iwCloseButton) {
          iwCloseButton.onmousedown = () => {
            infowindow.close();
          };
        }
      });
    });

    kakao.maps.event.addListener(kakaoMap, 'dragend', onMapUpdated);
    kakao.maps.event.addListener(kakaoMap, 'zoom_changed', onMapUpdated);
  }, [isLoading, data]);

  if (isLoading) return <div>로딩중</div>;
  return (
    <div className="w-full inline-block ml-[5px] mr-[5px]]">
      <div id="map" className="w-full h-[500px]" />
    </div>
  );
};

export default Kakaomap;
