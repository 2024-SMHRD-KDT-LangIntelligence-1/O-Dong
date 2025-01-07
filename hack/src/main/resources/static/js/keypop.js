// 메뉴 선택을 추적
const toggleButtons = document.querySelectorAll(".toggle-btn");

// 버튼 클릭 시 선택/해제
// document.querySelectorAll(".menu-category").forEach((category) => {
//   category.addEventListener("click", (event) => {
//     const button = event.target;
//     if (button.classList.contains("toggle-btn")) {
//       // 같은 카테고리 내 다른 버튼 선택 해제
//       category.querySelectorAll(".toggle-btn").forEach((btn) => {
//         btn.classList.remove("selected");
//       });
//       // 클릭한 버튼 선택
//       button.classList.add("selected");
//     }
//   });
// });
// toggleButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     button.classList.toggle("selected");
//   });
// });
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 모든 버튼의 'selected' 클래스 제거
    toggleButtons.forEach((btn) => btn.classList.remove("selected"));

    // 클릭한 버튼에 'selected' 클래스 추가
    button.classList.add("selected");
  });
});

// 기타 메뉴 추가 기능
const addMenuBtn = document.getElementById("addMenuBtn");
const newMenuInput = document.getElementById("newMenuInput");
const otherMenuList = document.getElementById("otherMenuList");

// 새 메뉴 추가
addMenuBtn?.addEventListener("click", () => {
  const newMenuName = newMenuInput.value.trim();

  if (newMenuName) {
    // 새 메뉴 항목 생성
    const newMenuItem = document.createElement("div");
    newMenuItem.classList.add("menu-item");

    // 버튼 생성
    const newMenuButton = document.createElement("button");
    newMenuButton.classList.add("toggle-btn");
    newMenuButton.textContent = newMenuName;

    // 클릭 시 토글 선택
    newMenuButton.addEventListener("click", () => {
      newMenuButton.classList.toggle("selected");
    });

    // 새 항목 DOM에 추가
    newMenuItem.appendChild(newMenuButton);
    otherMenuList.appendChild(newMenuItem);

    // 입력창 비우기
    newMenuInput.value = "";

    // 입력창과 버튼을 목록 아래로 유지
    otherMenuList.appendChild(newMenuInput.parentElement);
  }
});

// 기타 메뉴 목록 초기화 (DOM 정리)
function moveInputContainerToEnd() {
  const inputContainer = document.getElementById("input-container");
  if (inputContainer) {
    otherMenuList.appendChild(inputContainer);
  }
}

// // 선택된 메뉴 데이터
// const selectedMenus = {};

// // 메뉴 버튼 클릭 로직
// document.querySelectorAll(".menu-category").forEach((category) => {
//   category.addEventListener("click", (event) => {
//     const button = event.target;
//     if (button.classList.contains("toggle-btn")) {
//       // 같은 카테고리 내 선택된 메뉴 갱신
//       const categoryName = category.querySelector("h3").innerText;
//       category.querySelectorAll(".toggle-btn").forEach((btn) => {
//         btn.classList.remove("selected");
//       });
//       button.classList.add("selected");
//       selectedMenus[categoryName] = button.dataset.menu;
//     }
//   });
// });

// // 분석하기 버튼 클릭
// document.getElementById("Canalyzebutton").addEventListener("click", () => {
//   const resultsContainer = document.getElementById("analysis-results");
//   resultsContainer.innerHTML = ""; // 초기화

//   // 예시 데이터베이스
//   const database = {
//     커피류: ["아메리카노", "카페라떼", "바닐라 라떼", "콜드브루", "카푸치노"],
//     차류: ["얼그레이", "녹차", "캐모마일", "페퍼민트", "레몬 티"],
//     // 다른 카테고리도 추가 가능
//   };

//   // 결과 생성
//   Object.entries(selectedMenus).forEach(([category, menu]) => {
//     const similarMenus = database[category]
//       ? database[category].filter((item) => item !== menu).slice(0, 5)
//       : [];
//     const categoryResult = document.createElement("div");
//     categoryResult.classList.add("category-result");
//     categoryResult.innerHTML = `
//       <h4>${category} (${menu})</h4>
//       <ul>
//         ${similarMenus.map((item) => `<li>${item}</li>`).join("")}
//       </ul>
//     `;
//     resultsContainer.appendChild(categoryResult);
//   });

//   // 분석 결과 팝업 표시
//   document.getElementById("analysis-result-popup").style.display = "flex";
// });

// // 분석 결과 팝업 닫기
// document.getElementById("closeResultModalBtn").addEventListener("click", () => {
//   document.getElementById("analysis-result-popup").style.display = "none";
// });

// 선택된 메뉴를 저장할 객체
const selectedMenus = {};

// 메뉴 버튼 클릭 로직
document.querySelectorAll(".menu-category").forEach((category) => {
  const categoryName = category.querySelector("h3").innerText; // 카테고리 이름

  category.addEventListener("click", (event) => {
    const button = event.target;

    // 버튼 클릭 시 처리
    if (button.classList.contains("toggle-btn")) {
      // 같은 카테고리 내 다른 버튼 선택 해제
      category.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      // 클릭한 버튼 선택 및 저장
      button.classList.add("selected");
      selectedMenus[categoryName] = button.dataset.menu;
    }
  });
});

// 분석하기 버튼 클릭 시
// document.getElementById("Canalyzebutton").addEventListener("click", () => {
//   const coffeeResultsContainer = document.getElementById("coffee-results");
//   const teaResultsContainer = document.getElementById("tea-results");

//   // 기존 결과 초기화
//   coffeeResultsContainer.innerHTML = "";
//   teaResultsContainer.innerHTML = "";

//   // 예제 데이터베이스
//   const database = {
//     커피류: [
//       "아메리카노",
//       "카페라떼",
//       "에스프레소",
//       "플랫화이트",
//       "바닐라 라떼",
//       "카페모카",
//       "콜드브루",
//     ],
//     차류: ["얼그레이", "녹차", "캐모마일", "페퍼민트", "레몬 티"],
//   };

//   // 선택한 메뉴 기반 결과 생성
//   Object.entries(selectedMenus).forEach(([category, selectedMenu]) => {
//     const similarMenus = database[category]
//       ? database[category].filter((menu) => menu !== selectedMenu).slice(0, 5)
//       : [];

//     // 결과를 표시할 컨테이너 선택
//     const resultsContainer =
//       category === "커피류" ? coffeeResultsContainer : teaResultsContainer;

//     // 결과 추가
//     similarMenus.forEach((menu) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = menu;
//       resultsContainer.appendChild(listItem);
//     });
//   });

//   // 결과 팝업 표시
//   document.getElementById("analysis-result-popup").style.display = "block";
// });
