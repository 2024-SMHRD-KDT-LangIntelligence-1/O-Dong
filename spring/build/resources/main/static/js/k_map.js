type = "text/javascript";
src =
  "//dapi.kakao.com/v2/maps/sdk.js?appkey=5ee6076af595f4d8884d46e046f17e2e&libraries=services";
// 지도 생성
var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도 중심좌표
    level: 3, // 초기 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 객체 생성
var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

// 클릭으로 생성된 마커 (하나만 유지)
var currentMarker = null;

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

  // 마커 클릭 이벤트: 정보창 열기
  var infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">클릭한 위치<br>${latlng.getLat()}, ${latlng.getLng()}</div>`,
  });
  kakao.maps.event.addListener(currentMarker, "click", function () {
    infowindow.open(map, currentMarker);
  });
});

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

              // 정보창 열기
              var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${item.address_name}</div>`,
              });
              infowindow.open(map, currentMarker);

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

      //   // 인포윈도우 표시
      //   var infowindow = new kakao.maps.InfoWindow({
      //     content: `<div style="padding:5px;">${address}</div>`,
      //   });
      //   infowindow.open(map, currentMarker);

      //   // 검색 마커 클릭 이벤트: 인포윈도우 유지
      //   kakao.maps.event.addListener(currentMarker, "click", function () {
      //     infowindow.open(map, currentMarker);
      //   });
    } else {
      alert("해당 주소를 찾을 수 없습니다.");
    }
  });
});
