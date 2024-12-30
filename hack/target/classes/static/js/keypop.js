// 팝업창 열기/닫기
const openModalBtn = document.getElementById("openModalBtn");
const popup = document.getElementById("myModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// 메뉴 선택을 추적
const toggleButtons = document.querySelectorAll(".toggle-btn");

// 버튼 클릭 시 선택/해제
document.querySelectorAll(".menu-category").forEach((category) => {
  category.addEventListener("click", (event) => {
    const button = event.target;
    if (button.classList.contains("toggle-btn")) {
      // 같은 카테고리 내 다른 버튼 선택 해제
      category.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });
      // 클릭한 버튼 선택
      button.classList.add("selected");
    }
  });
});
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
  });
});

// 팝업창 열기
openModalBtn?.addEventListener("click", () => {
  popup.style.display = "flex";
});

// 팝업창 닫기
closeModalBtn?.addEventListener("click", () => {
  popup.style.display = "none";
});

// 배경 클릭 시 모달 닫기
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
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

// 선택된 메뉴 데이터
const selectedMenus = {};

// 메뉴 버튼 클릭 로직
document.querySelectorAll(".menu-category").forEach((category) => {
  category.addEventListener("click", (event) => {
    const button = event.target;
    if (button.classList.contains("toggle-btn")) {
      // 같은 카테고리 내 선택된 메뉴 갱신
      const categoryName = category.querySelector("h3").innerText;
      category.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      selectedMenus[categoryName] = button.dataset.menu;
    }
  });
});

// 분석하기 버튼 클릭
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

// 분석하기 버튼 클릭 시
document.getElementById("Canalyzebutton").addEventListener("click", () => {
  const coffeeResultsContainer = document.getElementById("coffee-results");
  const teaResultsContainer = document.getElementById("tea-results");

  // 기존 내용 초기화
  coffeeResultsContainer.innerHTML = "";
  teaResultsContainer.innerHTML = "";

  // 데이터베이스 예시
  const database = {
    커피류: ["아메리카노", "카페라떼", "바닐라 라떼", "콜드브루", "카푸치노"],
    차류: ["얼그레이", "녹차", "캐모마일", "페퍼민트", "레몬 티"],
  };

  // 선택된 메뉴와 유사한 메뉴 가져오기
  Object.entries(selectedMenus).forEach(([category, menu]) => {
    const similarMenus = database[category]
      ? database[category].filter((item) => item !== menu).slice(0, 5)
      : [];

    const resultsContainer =
      category === "커피류" ? coffeeResultsContainer : teaResultsContainer;
    similarMenus.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      resultsContainer.appendChild(listItem);
    });
  });

  // 팝업 표시
  document.getElementById("analysis-result-popup").style.display = "block";
});

// 팝업 닫기 버튼
document.getElementById("closeResultModalBtn").addEventListener("click", () => {
  document.getElementById("analysis-result-popup").style.display = "none";
});
