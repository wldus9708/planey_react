/* global kakao */

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// Styled components 정의
const MapContainer = styled.div`
  width: 100%; /* 뷰포트의 가로 크기에 맞게 조절 */
  height: 100%; /* 뷰포트의 세로 크기에 맞게 조절 */
`;


function KakaoMap(props) {
  const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=eb724f327a8ccf66e2c7528f1bba387a&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(33.4996, 126.5312);
        const options = {
          center,
          level: 8,
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
      });
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    const [width, height] = size;
    container.current.style.width = `${width}px`;
    container.current.style.height = `${height}px`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const positions = markerPositions.map(
      (pos) => new kakao.maps.LatLng(...pos)
    );

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null));

      // assign new markers
      return positions.map(
        (position) => new kakao.maps.Marker({ map: kakaoMap, position })
      );
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      kakaoMap.setBounds(bounds);
    }
  }, [kakaoMap, markerPositions]);

  return <MapContainer id="container" ref={container} />;
}

export default KakaoMap;