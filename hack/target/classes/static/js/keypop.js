// 팝업창 열기/닫기
const openModalBtn = document.getElementById("openModalBtn");
const popup = document.getElementById("myModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// 메뉴 선택을 추적
const toggleButtons = document.querySelectorAll(".toggle-btn");

// 버튼 클릭 시 선택/해제
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
