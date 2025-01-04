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
      scales: {
        x: {
          title: {
            display: true,
            text: "공통 메뉴",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "언급 빈도 합계",
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
      scales: {
        x: {
          title: {
            display: true,
            text: "공통 메뉴",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "언급 빈도",
          },
        },
      },
    },
  });
}
