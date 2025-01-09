# 스마트 인재 개발원 핵심 프로젝트 - 메뉴 어떠쇼(Show)☕️
by 오동로켓단

## 프로젝트 소개
네이버 플레이스 메뉴 + 상권 데이터 + 카카오 맵 API를 활용하여 만든 카페 메뉴 추천 서비스입니다.

## 팀원 소개
- 팀장 : 김수지 - 
- 팀원 : 오도영 - 
- 팀원 : 정규연 - 
- 팀원 : 정희석 -

## 개발 기간
- 24.12.23 - 25.01.08

### 개발 환경
<div align=center><h1>📚 STACKS</h1></div>

<div align=center> 
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
  <br>
  
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <br>
  
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">


</div>

---
### 주요 기능
1. 로그인
- 

2. 회원가입
- 

3. 유사 상권 비교
- 사용 데이터 : 소상공인 365 상권 데이터(원본 : 신한카드 월별 매출액 데이터, SKT 유동인구 데이터)
  - 서울 특별시, 광주 광역시, 부산 광역시, 인천 광역시의 2024.06월 데이터 사용
- 기능 : 사용자가 상권 이름(법정동 이름)을 입력하면 군집화 및 유사도 비교를 이용하여 해당 상권과 가장 유사한 상권 계산
  - 각 feature마다 단위 차이가 많이 발생하여 Normalizer를 통해 정규화를 진행
  - 군집화 : K-Means 군집화 사용
    - DBSCAN의 경우 이상치 군집(-1)에 대한 대응이 어려움
    - 상권의 성별, 연령 유동인구 데이터를 통해 군집화를 진행
    - Elbow Method 및 실루엣 계수를 통해 적절한 하이퍼 파라미터 값 k=3 도출
  - 유사도 분석 : 유클리디안 거리 알고리즘
    - K-Means 군집화 단일 사용 시 신뢰도가 낮다는 문제점을 보완
    - 입력한 상권과 동일 군집 내에서 월 평균 매출, 요일별 평균 매출액, 시간대 별 평균 매출액 데이터를 기반으로 유사도 분석
    - 동일 feature의 데이터 크기 차이가 유의미한 의미를 지니므로 크기에 영향을 받는 유클리디안 거리 알고리즘 사용

4. 상권 희소 메뉴
- 사용 데이터 : 카페 메뉴 데이터(네이버 플레이스 크롤링)
- 기능 : 사용자가 두 상권(분석할 상권, 비교할 상권)을 입력하면 비교 대상 상권 대비 분석 상권에 적은 메뉴를 분석 및 시각화
  - 파이썬의 Counter 모듈을 이용하여 메뉴 빈도 계산
  - 비교할 상권의 빈도수 상위 10-20%에 속하는 메뉴지만, 분석할 상권의 빈도 상위 0-30%에 속하지 않는 메뉴 탐색
    - 상위 10% 메뉴는 보편 메뉴로 취급하여 분석 X(ex-아메리카노)

5. 상권 공통 메뉴
- 사용 데이터 : 카페 메뉴 데이터(네이버 플레이스 크롤링)
- 기능 : 사용자가 두 상권(분석할 상권, 비교할 상권)을 입력하면 비교 대상 상권과 분석 상권에 모두 많은 메뉴를 분석 및 시각화
  - 파이썬의 Counter 모듈을 이용하여 메뉴 빈도 계산
  - 비교할 상권의 빈도수 상위 10-20%에 속하며 동시에 분석할 상권의 상위 0-25%에 속하는 메뉴 탐색
    - 상위 10% 메뉴는 보편 메뉴로 취급하여 분석 X(ex- 아메리카노)

6. 키워드 기반 메뉴 추천
- 사용 데이터 : 메뉴 설명 및 재료 데이터
- 기능 : 사용자가 불특정 메뉴의 특징(시원함, 상큼함 등)을 입력하면 특징과 메뉴 데이터의 이름, 설명 및 재료와 유사도 분석을 진행하여 가장 유사한 메뉴를 추천
  - 파이썬의 Kiwi 형태소 분석기를 이용하여 메뉴 설명 데이터 및 입력 키워드의 일반 명사, 어미, 외래어 추출
  - tf-idf를 이용해 텍스트 벡터를 수치 벡터화
    - 입력 키워드의 순서에 영향을 받지 않기 위해 코사인 유사도 사용(ex-시원한 복숭아 음료, 복숭아 음료 시원한 거)
  - 이후 코사인 유사도를 통해 가장 유사한 메뉴를 분석

7. 유사 메뉴 추천
- 사용 데이터 : 메뉴 설명 및 재료 데이터
- 기능 : 사용자가 분석하고자 하는 메뉴를 클릭 또는 추가하면 해당 메뉴와 설명, 재료가 유사한 메뉴를 추천
  - 파이썬의 Kiwi 형태소 분석기를 이용하여 메뉴 설명 데이터의 일반 명사, 어미, 외래어 추출
  - tf-idf를 이용해 텍스트 벡터를 수치 벡터화
    - 입력 키워드의 순서에 영향을 받지 않기 위해 코사인 유사도 사용(ex-시원한 복숭아 음료, 복숭아 음료 시원한 거)
  - 이후 코사인 유사도를 통해 가장 유사한 메뉴를 분석
  - 만약 입력한 데이터가 메뉴 데이터에 없을 경우 메뉴 이름과 입력 데이터를 tf-idf 처리 후 레벤슈타인 거리 알고리즘을 이용해 입력 데이터와 가장 흡사한 메뉴 설명 및 재료 데이터 내의 메뉴로 대체
