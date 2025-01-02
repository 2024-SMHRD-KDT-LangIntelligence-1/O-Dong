// 전역 변수 선언
var map, marker;
var selectedLat = null; // 클릭한 위치의 위도
var selectedLng = null;
var latlng1 = null; // 클릭한 위치의 경도

var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(35.1505169672014, 126.91611949915585), // 초기 지도 중심좌표
    level: 3, // 초기 확대 레벨
  };

map = new kakao.maps.Map(mapContainer, mapOption); // 지도 객체 생성
var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성
var places = new kakao.maps.services.Places();

// 클릭으로 생성된 마커 (하나만 유지)
var currentMarker = null;
var cafeMarkers = [];
var currentCircle = null; // 반경 500m 다각형

// 지도 클릭 이벤트: 클릭 시 새로운 마커 추가
kakao.maps.event.addListener(map, "click", async function (mouseEvent) {
  var latlng = mouseEvent.latLng;
  latlng1 = latlng;
  var lat = mouseEvent.latLng.getLat(); // 클릭된 위도
  var lng = mouseEvent.latLng.getLng(); // 클릭된 경도

  // 위도, 경도를 전역 변수에 저장
  selectedLat = lat;
  selectedLng = lng;

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
  var message = "클릭한 위치의 위도: " + lat + ", ";
  message += "경도: " + lng;
  document.getElementById("clickLatlng").innerHTML = message;

  // 반경 500m 다각형 생성
  createCircle(latlng);

  // 마커 클릭 이벤트: 정보창 열기
  var infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">클릭한 위치<br>${lat}, ${lng}</div>`,
  });
  kakao.maps.event.addListener(currentMarker, "click", function () {
    infowindow.open(map, currentMarker);
  });

  // 기존 카페 마커 삭제
  clearCafeMarkers();

  // 주변 카페 검색
  searchNearbyCafes(latlng);
  console.log(await getDongNameByCoordinates(lat, lng));
  getTop5MenuByDong(await getDongNameByCoordinates(lat, lng));

  // fetch("http://localhost:5000/send-coordinates", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ latitude: lat, longitude: lng }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Response from Flask:", data);
  //   })
  //   .catch((error) => console.error("Error:", error));
});

// 위도 경도 기반 동 이름 찾아줌
async function getDongNameByCoordinates(latitude, longitude) {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "KakaoAK 015412fbc48c3a4e31b1926b6adb667e",
      },
    });

    const data = await response.json();

    if (data && data.documents && data.documents.length > 0) {
      const address = data.documents[0].address;
      const dongName = address.region_3depth_name; // 동 이름
      return dongName;
    } else {
      throw new Error("동 이름을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
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
      const menuListElement = document.getElementById("top5MenuList");
      menuListElement.innerHTML = "";

      data.forEach((menu, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                  <span class="rank">${index + 1}</span>
                  <span class="category">${menu.name}</span>
              `;
        menuListElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching top 5 menu:", error));
}

// 주변 카페 검색
function searchNearbyCafes(latlng) {
  clearCafeMarkers();

  places.keywordSearch(
    "카페",
    function (data, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < data.length; i++) {
          var cafe = data[i];

          var imageSrc = "/images/image1.png";
          var imageSize = new kakao.maps.Size(40, 40);
          var imageOption = { offset: new kakao.maps.Point(20, 40) };

          var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          var cafeMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(cafe.y, cafe.x),
            map: map,
            title: cafe.place_name,
            image: markerImage,
          });

          cafeMarkers.push(cafeMarker);

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
      location: latlng,
      radius: 500,
    }
  );
}

// 기존 카페 마커 삭제 함수
function clearCafeMarkers() {
  for (var i = 0; i < cafeMarkers.length; i++) {
    cafeMarkers[i].setMap(null);
  }
  cafeMarkers = [];
}

// 반경 500m 다각형 생성 함수
function createCircle(latlng) {
  if (currentCircle) {
    currentCircle.setMap(null);
  }

  currentCircle = new kakao.maps.Circle({
    center: latlng,
    radius: 500,
    strokeWeight: 5,
    strokeColor: "gray",
    strokeOpacity: 0.5,
    strokeStyle: "solid",
    fillColor: "lightgray",
    fillOpacity: 0.5,
  });

  currentCircle.setMap(map);

  kakao.maps.event.addListener(currentCircle, "click", function () {
    alert("반경 500m 다각형 클릭됨!");
  });
}

// document.getElementById("search-btn").addEventListener("click", () => {
//   map.setCenter(36.44476571317521, 127.83459341375278);
//   map.level(12);
//   fetch("http://localhost:5000/send-coordinates", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({ latitude: lat, longitude: lng }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Response from Flask:", data);
//     })
//     .catch((error) => console.error("Error:", error));
// });

// DB기반 검색 id : search-location,dsearch-location

// 맵 api기반 검색 id : search-location2
var closeModalBtn = document.getElementById("closereModalBtn");

closeModalBtn.onclick = function () {
  document.getElementById("re-popup").style.display = "none";
};
