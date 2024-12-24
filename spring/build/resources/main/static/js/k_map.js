// 지도 생성
var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도 중심좌표
    level: 3, // 초기 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 객체 생성
var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성
var places = new kakao.maps.services.Places();

// 클릭으로 생성된 마커 (하나만 유지)
var currentMarker = null;
var cafeMarkers = [];
var currentCircle = null; // 반경 500m 다각형

// 지도 클릭 이벤트: 클릭 시 새로운 마커 추가
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  var latlng = mouseEvent.latLng;

  // 이전 마커가 존재하면 제거
  if (currentMarker) {
    currentMarker.setMap(null);
  }

  // 새로운 마커 생성
  currentMarker = new kakao.maps.Marker({
    position: latlng,
    map: map,
  });

  // 클릭한 위치의 좌표 표시
  var message = "클릭한 위치의 위도: " + latlng.getLat() + ", ";
  message += "경도: " + latlng.getLng();
  document.getElementById("clickLatlng").innerHTML = message;

  // 반경 500m 다각형 생성
  createCircle(latlng);

  // 마커 클릭 이벤트: 정보창 열기
  var infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">클릭한 위치<br>${latlng.getLat()}, ${latlng.getLng()}</div>`,
  });
  kakao.maps.event.addListener(currentMarker, "click", function () {
    infowindow.open(map, currentMarker);
  });

  // 기존 카페 마커 삭제
  clearCafeMarkers();

  // 주변 카페 검색
  searchNearbyCafes(latlng);
});

// 주변 카페 검색 함수
function searchNearbyCafes(latlng) {
  // 1000m 반경 내 카페 검색
  clearCafeMarkers();

  places.keywordSearch(
    "카페",
    function (data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 카페에 마커 추가
        for (var i = 0; i < data.length; i++) {
          var cafe = data[i];

          // 카페 위치 마커
          var cafeMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(cafe.y, cafe.x),
            map: map,
            title: cafe.place_name, // 카페 이름
          });

          // 카페 마커를 배열에 추가
          cafeMarkers.push(cafeMarker);

          // 마커에 클릭 이벤트 추가
          var cafeInfoWindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${cafe.place_name}<br>${cafe.address_name}</div>`,
          });

          kakao.maps.event.addListener(cafeMarker, "click", function () {
            cafeInfoWindow.open(map, cafeMarker);
          });
        }
      }
    },
    {
      location: latlng, // 마커 클릭 위치를 중심으로 검색
      radius: 500, // 500m 내에서 검색
    }
  );
}

// 반경 500m 다각형 생성 함수
function createCircle(latlng) {
  // 이전 다각형 제거
  if (currentCircle) {
    currentCircle.setMap(null);
  }

  // 새로운 다각형 생성
  currentCircle = new kakao.maps.Circle({
    center: latlng, // 클릭한 좌표를 중심으로 설정
    radius: 500, // 반경 500m
    strokeWeight: 5, // 선 두께
    strokeColor: "#FFAE00", // 선 색상
    strokeOpacity: 1, // 선 투명도
    strokeStyle: "solid", // 선 스타일
    fillColor: "#FFCF80", // 채우기 색상
    fillOpacity: 1, // 채우기 투명도
  });

  // 다각형 지도에 추가
  currentCircle.setMap(map);

  // 다각형 클릭 이벤트 추가
  kakao.maps.event.addListener(currentCircle, "click", function () {
    alert("반경 500m 다각형 클릭됨!");
  });
}
// 기존 카페 마커 삭제 함수
function clearCafeMarkers() {
  for (var i = 0; i < cafeMarkers.length; i++) {
    cafeMarkers[i].setMap(null); // 지도에서 제거
  }
  cafeMarkers = []; // 배열 초기화
}

// 반경 500m 다각형 생성 함수
function createCircle(latlng) {
  // 이전 다각형 제거
  if (currentCircle) {
    currentCircle.setMap(null);
  }

  // 새로운 다각형 생성
  currentCircle = new kakao.maps.Circle({
    center: latlng, // 클릭한 좌표를 중심으로 설정
    radius: 500, // 반경 500m
    strokeWeight: 5, // 선 두께
    strokeColor: "#FFAE00", // 선 색상
    strokeOpacity: 0, // 선 투명도
    strokeStyle: "solid", // 선 스타일
    fillColor: "#FFCF80", // 채우기 색상
    fillOpacity: 0, // 채우기 투명도
  });

  // 다각형 지도에 추가
  currentCircle.setMap(map);

  // 다각형 클릭 이벤트 추가
  kakao.maps.event.addListener(currentCircle, "click", function () {
    alert("반경 500m 다각형 클릭됨!");
  });
}

// 주소 검색 이벤트
document
  .getElementById("search-location")
  .addEventListener("input", function () {
    var keyword = this.value;

    if (keyword.length > 0) {
      // 주소 검색을 위한 카카오 API 호출
      geocoder.addressSearch(keyword, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색 결과가 있으면 결과 목록 표시
          var searchResults = document.getElementById("search-results");
          searchResults.innerHTML = ""; // 이전 결과 지우기

          result.forEach(function (item) {
            var listItem = document.createElement("div");
            listItem.textContent = item.address_name;
            listItem.style.padding = "5px";
            listItem.style.cursor = "pointer";
            listItem.onclick = function () {
              // 목록 클릭 시 해당 위치로 이동하고 마커 추가
              var coords = new kakao.maps.LatLng(item.y, item.x);
              map.setCenter(coords);

              // 기존 마커 제거
              if (currentMarker) {
                currentMarker.setMap(null);
              }

              // 새로운 마커 생성
              currentMarker = new kakao.maps.Marker({
                position: coords,
                map: map,
              });

              // 클릭한 위치의 위도, 경도 표시
              var message = "위도: " + item.y + ", 경도: " + item.x;
              document.getElementById("clickLatlng").innerHTML = message;

              // 다각형 생성
              createCircle(coords);

              // 결과 목록 숨기기
              searchResults.innerHTML = "";
            };
            searchResults.appendChild(listItem);
          });
        }
      });
    } else {
      // 입력값이 없으면 목록 지우기
      document.getElementById("search-results").innerHTML = "";
    }
  });

// 검색 버튼 클릭 이벤트
document.getElementById("search-btn").addEventListener("click", function () {
  var address = document.getElementById("search-location").value;

  // 주소로 좌표 검색
  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 지도 중심 이동
      map.setCenter(coords);

      // 이전 검색 마커가 있으면 제거
      if (currentMarker) {
        currentMarker.setMap(null);
      }

      // 검색된 위치에 새 마커 추가
      currentMarker = new kakao.maps.Marker({
        position: coords,
        map: map,
      });

      // 다각형 생성
      createCircle(coords);
    } else {
      alert("해당 주소를 찾을 수 없습니다.");
    }
  });
});
