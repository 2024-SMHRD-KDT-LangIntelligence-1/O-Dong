// 첫 번째 차트: 상권 공통 메뉴
function drawCommonMenuChart(data) {
  if (!Array.isArray(data.sang1MenuCnt) || !Array.isArray(data.sang2MenuCnt)) {
    console.error("sang1MenuCnt 또는 sang2MenuCnt가 배열이 아닙니다.");
    return;
  }

  if (data.sang1MenuCnt.length !== data.sang2MenuCnt.length) {
    console.error("sang1MenuCnt와 sang2MenuCnt의 길이가 다릅니다.");
    return;
  }

  const canvas = document.getElementById("chartmodal-myChart1");
  if (!canvas) {
    console.error("chartmodal-myChart1 canvas 요소를 찾을 수 없습니다.");
    return;
  }

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.gongtongMenus, // 메뉴 이름
      datasets: [
        {
          label: "언급 빈도 합계",
          data: data.sang1MenuCnt.map(
            (cnt, idx) => cnt + data.sang2MenuCnt[idx]
          ), // sang1과 sang2의 합계
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16, // 범례 폰트 크기
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "공통 메뉴",
            font: {
              size: 14, // X축 제목 폰트 크기
            },
          },
          ticks: {
            font: {
              size: 12, // X축 레이블 폰트 크기
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "언급 빈도 합계",
            font: {
              size: 14, // Y축 제목 폰트 크기
            },
          },
          ticks: {
            font: {
              size: 12, // Y축 레이블 폰트 크기
            },
          },
        },
      },
    },
  });
}

// 두 번째 차트: 상권 직접 비교
function drawComparisonChart(data) {
  const canvas = document.getElementById("chartmodal-myChart2");
  if (!canvas) {
    console.error("chartmodal-myChart2 canvas 요소를 찾을 수 없습니다.");
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.gongtongMenus,
      datasets: [
        {
          label: data.sang1,
          data: data.sang1MenuCnt,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: data.sang2,
          data: data.sang2MenuCnt,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16, // 범례 폰트 크기
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "공통 메뉴",
            font: {
              size: 14, // X축 제목 폰트 크기
            },
          },
          ticks: {
            font: {
              size: 12, // X축 레이블 폰트 크기
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "언급 빈도",
            font: {
              size: 14, // Y축 제목 폰트 크기
            },
          },
          ticks: {
            font: {
              size: 12, // Y축 레이블 폰트 크기
            },
          },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".chartmodal");
  const closeButton = document.querySelector(".chartmodal-close-button");

  // 모달 열기 예제 (선택 사항)
  function openModal() {
    modal.style.display = "block";
  }

  // 닫기 버튼 클릭 시 모달 닫기
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // 모달 외부 클릭 시 모달 닫기
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 필요하면 모달 열기 호출
  // openModal();
});
