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
kakao.maps.event.addListener(map, "click", async function (mouseEvent) {
  var latlng = mouseEvent.latLng;
  var lat = mouseEvent.latLng.getLat(); // 클릭된 위도
  var lng = mouseEvent.latLng.getLng(); // 클릭된 경도
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
  console.log(getDongNameByCoordinates(lat, lng));
  getTop5MenuByDong(await getDongNameByCoordinates(lat, lng));
});

//위도 경도 기반 동 이름 찾아줌
async function getDongNameByCoordinates(latitude, longitude) {
  // Kakao REST API의 Reverse Geocoding URL
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

  try {
    // REST API 호출 (Fetch API 사용)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "KakaoAK 015412fbc48c3a4e31b1926b6adb667e", // 'KakaoAK'와 함께 API 키를 넣어야 합니다.
      },
    });

    const data = await response.json();

    if (data && data.documents && data.documents.length > 0) {
      // 첫 번째 결과에서 동 이름을 추출
      const address = data.documents[0].address;
      const dongName = address.region_3depth_name; // 동 이름
      return dongName; // dongName 반환
    } else {
      throw new Error("동 이름을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error; // 에러가 발생하면 다시 던져 상위에서 처리할 수 있도록 함
  }
}

// 메뉴 Top 5 표시
function displayMenuList(menuList) {
  var menuDiv = document.getElementById("menu-list");
  menuDiv.innerHTML = "<h3>메뉴 Top 5</h3>";
  var ul = document.createElement("ul");

  menuList.forEach(function (menu) {
    var li = document.createElement("li");
    li.textContent = `${menu.menu} - ${menu.count}회 주문`;
    ul.appendChild(li);
  });

  menuDiv.appendChild(ul);
}

// 서버로 동 이름을 보내 상위 5개 메뉴 조회
function getTop5MenuByDong(dongName) {
  console.log(dongName);
  fetch(`/top-5-menu-by-dong?dong=${dongName}`)
    .then((response) => response.json())
    .then((data) => {
      // top5-list ul 요소 선택
      const menuListElement = document.getElementById("top5MenuList");

      // 기존에 있는 메뉴 리스트를 지웁니다.
      menuListElement.innerHTML = "";

      // 상위 5개 메뉴를 ul에 동적으로 추가
      data.forEach((menu, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                  <span class="rank">${index + 1}</span>
                  <span class="category">${menu.name}</span>
              `;
        menuListElement.appendChild(listItem);
      });

      // 팝업을 보이도록 설정 (옵션)
      // document.getElementById("re-popup").style.display = "block";
    })
    .catch((error) => console.error("Error fetching top 5 menu:", error));
}

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

          // 마커 이미지 설정
          // var imageSrc = "/images/free-icon-cafe-1223145.png"; // 마커 아이콘 이미지 URL
          var imageSrc = "/images/image1.png";
          var imageSize = new kakao.maps.Size(40, 40); // 아이콘 크기
          var imageOption = { offset: new kakao.maps.Point(20, 40) }; // 마커 이미지의 앵커 위치

          var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 카페 위치 마커
          var cafeMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(cafe.y, cafe.x),
            map: map,
            title: cafe.place_name, // 카페 이름
            image: markerImage, // 커스텀 마커 이미지 설정
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
// function createCircle(latlng) {
//   // 이전 다각형 제거
//   if (currentCircle) {
//     currentCircle.setMap(null);
//   }

//   // 새로운 다각형 생성
//   currentCircle = new kakao.maps.Circle({
//     center: latlng, // 클릭한 좌표를 중심으로 설정
//     radius: 500, // 반경 500m
//     strokeWeight: 5, // 선 두께
//     strokeColor: "#FFAE00", // 선 색상
//     strokeOpacity: 1, // 선 투명도
//     strokeStyle: "solid", // 선 스타일
//     fillColor: "#FFCF80", // 채우기 색상
//     fillOpacity: 1, // 채우기 투명도
//   });

//   // 다각형 지도에 추가
//   currentCircle.setMap(map);

//   // 다각형 클릭 이벤트 추가
//   kakao.maps.event.addListener(currentCircle, "click", function () {
//     alert("반경 500m 다각형 클릭됨!");
//   });
// }
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
    strokeColor: "gray", // 선 색상
    strokeOpacity: 0.5, // 선 투명도
    strokeStyle: "solid", // 선 스타일
    fillColor: "lightgray", // 채우기 색상
    fillOpacity: 0.5, // 채우기 투명도
  });

  // 다각형 지도에 추가
  currentCircle.setMap(map);

  // 다각형 클릭 이벤트 추가
  kakao.maps.event.addListener(currentCircle, "click", function () {
    alert("반경 500m 다각형 클릭됨!");
  });
}
