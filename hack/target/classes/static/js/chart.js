// 첫 번째 차트: 상권 공통 메뉴
// function drawCommonMenuChart(data) {
//   if (!Array.isArray(data.sang1MenuCnt) || !Array.isArray(data.sang2MenuCnt)) {
//     console.error("sang1MenuCnt 또는 sang2MenuCnt가 배열이 아닙니다.");
//     return;
//   }

//   if (data.sang1MenuCnt.length !== data.sang2MenuCnt.length) {
//     console.error("sang1MenuCnt와 sang2MenuCnt의 길이가 다릅니다.");
//     return;
//   }

//   const canvas = document.getElementById("chartmodal-myChart1");
//   if (!canvas) {
//     console.error("chartmodal-myChart1 canvas 요소를 찾을 수 없습니다.");
//     return;
//   }

//   const ctx = canvas.getContext("2d");

//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: data.gongtongMenus, // 메뉴 이름
//       datasets: [
//         {
//           label: "언급 빈도 합계",
//           data: data.sang1MenuCnt.map(
//             (cnt, idx) => cnt + data.sang2MenuCnt[idx]
//           ), // sang1과 sang2의 합계
//           backgroundColor: "rgba(75, 192, 192, 0.5)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           labels: {
//             font: {
//               size: 16, // 범례 폰트 크기
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: "공통 메뉴",
//             font: {
//               size: 14, // X축 제목 폰트 크기
//             },
//           },
//           ticks: {
//             font: {
//               size: 12, // X축 레이블 폰트 크기
//             },
//           },
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: "언급 빈도 합계",
//             font: {
//               size: 14, // Y축 제목 폰트 크기
//             },
//           },
//           ticks: {
//             font: {
//               size: 12, // Y축 레이블 폰트 크기
//             },
//           },
//         },
//       },
//     },
//   });
// }

// 두 번째 차트: 상권 직접 비교
// function drawComparisonChart(data) {
//   const canvas = document.getElementById("chartmodal-myChart2");
//   if (!canvas) {
//     console.error("chartmodal-myChart2 canvas 요소를 찾을 수 없습니다.");
//     return;
//   }

//   const ctx = canvas.getContext("2d");
//   ctx.font = "30px Arial";
//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: data.gongtongMenus,
//       datasets: [
//         {
//           label: data.sang1,
//           data: data.sang1MenuCnt,
//           backgroundColor: "rgba(54, 162, 235, 0.5)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//         {
//           label: data.sang2,
//           data: data.sang2MenuCnt,
//           backgroundColor: "rgba(255, 99, 132, 0.5)",
//           borderColor: "rgba(255, 99, 132, 1)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           labels: {
//             font: {
//               size: 16, // 범례 폰트 크기
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: "공통 메뉴",
//             font: {
//               size: 14, // X축 제목 폰트 크기
//             },
//           },
//           ticks: {
//             font: {
//               size: 12, // X축 레이블 폰트 크기
//             },
//           },
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: "언급 빈도",
//             font: {
//               size: 14, // Y축 제목 폰트 크기
//             },
//           },
//           ticks: {
//             font: {
//               size: 12, // Y축 레이블 폰트 크기
//             },
//           },
//         },
//       },
//     },
//   });
// }

function drawStackedChart(data) {
  const canvas = document.getElementById("chartmodal-myChart2");
  if (!canvas) {
    console.error("chartmodal-myChart2 canvas 요소를 찾을 수 없습니다.");
    return;
  }

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.onlyMenus, // X축 레이블로 onlyMenus 사용
      datasets: [
        {
          label: data.sang1,
          data: data.sang1MenuCnt, // 첫 번째 상권 데이터
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: data.sang2,
          data: data.sang2MenuCnt, // 두 번째 상권 데이터
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
          stacked: true, // x축 스택 활성화
          title: {
            display: true,
            text: "메뉴",
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
          stacked: true, // y축 스택 활성화
          beginAtZero: true,
          title: {
            display: true,
            text: "주문 횟수",
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

function drawChart2(data) {
  const canvas = document.getElementById("chartmodal-myChart2");
  if (!canvas) {
    console.error("chartmodal-myChart2 canvas 요소를 찾을 수 없습니다.");
    return;
  }

  const ctx = canvas.getContext("2d");

  const chart = new Chart(ctx, {
    type: "bar", // 차트 타입을 'bar'로 설정
    data: {
      labels: data.onlyMenus, // Y축 데이터 (메뉴 이름)
      datasets: [
        {
          label: data.sang1, // 첫 번째 데이터셋
          data: data.sang1MenuCnt, // 상권1의 X축 데이터
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1, // 색상 설정
        },
        {
          label: data.sang2, // 두 번째 데이터셋
          data: data.sang2MenuCnt, // 상권2의 X축 데이터
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1, // 색상 설정
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.dataset.label + ": " + tooltipItem.raw; // 툴팁 표시 형식
            },
          },
        },
        legend: {
          display: true, // 범례 표시
        },
      },
      scales: {
        x: {
          stacked: true, // X축 스택 활성화
          title: {
            display: true,
            text: "주문 횟수", // X축 제목
          },
          beginAtZero: true, // X축의 시작을 0부터
        },
        y: {
          stacked: true, // Y축 스택 활성화
          title: {
            display: true,
            text: "메뉴", // Y축 제목
          },
        },
      },
      indexAxis: "y", // 가로형 차트로 변경
    },
  });
}
function drawCommonMenuChart(data) {
  // 데이터 유효성 검사
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

  // Chart.js를 사용해 바 차트 생성
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

  // 설명 업데이트
  const descriptionDiv = document.getElementById("chartDescription");
  if (descriptionDiv) {
    const mostMentionedMenu = findMostMentionedMenu(data);
    const sang1 = data.sang1 || "상권1"; // sang1 이름
    const sang2 = data.sang2 || "상권2"; // sang2 이름

    descriptionDiv.innerHTML = `
      <strong>${sang1}, ${sang2} 상권</strong>에서 언급 빈도가 높은 메뉴는
      <strong>‘${mostMentionedMenu}’</strong>입니다!
    `;
  }
}

// 가장 많이 언급된 메뉴를 찾는 함수
function findMostMentionedMenu(data) {
  const totalMentions = data.sang1MenuCnt.map(
    (cnt, idx) => cnt + data.sang2MenuCnt[idx]
  );
  const maxMentionsIndex = totalMentions.indexOf(Math.max(...totalMentions));
  return data.gongtongMenus[maxMentionsIndex];
}

function findMostMentionedMenu(data) {
  const totalMentions = data.sang1MenuCnt.map(
    (cnt, idx) => cnt + data.sang2MenuCnt[idx]
  );
  const maxMentionsIndex = totalMentions.indexOf(Math.max(...totalMentions));
  return data.gongtongMenus[maxMentionsIndex];
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
