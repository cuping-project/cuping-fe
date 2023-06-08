import React, { useEffect, useState } from 'react';

const { kakao } = window;

const Kakaomap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.5677463315893, 126.8397655094666), // 지도의 중심 좌표
      level: 4, // 지도의 확대 레벨
    };

    // 지도 생성
    const kakaoMap = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치
    const markerPosition = [
      {
        title: '츄러스1500',
        latlng: new kakao.maps.LatLng(37.5677463315893, 126.8397655094666),
      },
      {
        title: '연주집',
        latlng: new kakao.maps.LatLng(37.56439448587185, 126.83965950213272),
      },
    ];

    // 마커 이미지 설정
    const imageSrc = 'https://cdn-icons-png.flaticon.com/128/1047/1047462.png';
    const imageSize = new kakao.maps.Size(44, 49);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerlmage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    // 마커를 생성
    for (let i = 0; i < markerPosition.length; i++) {
      const marker = new kakao.maps.Marker({
        position: markerPosition[i].latlng,
        title: markerPosition[i].title,
        image: markerlmage,
        clickable: true,
      });

      marker.setMap(kakaoMap);

      const iwContent = '<div style="padding:5px;">민잼마 나 졸려</div>';
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(kakaoMap, marker);
      });
    }
  }, []);
  return (
    <div
      style={{
        width: '100%',
        display: 'inline-block',
        marginLeft: '5px',
        marginRight: '5px',
      }}
    >
      <div id="map" style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default Kakaomap;
