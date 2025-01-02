// package com.odong.hack.service;

// import org.springframework.web.client.RestTemplate;

// import com.odong.hack.model.RegionVO;
// import org.json.JSONObject;
// import org.springframework.http.ResponseEntity;

// public class RegionService {

// private static final String KAKAO_API_KEY = "YOUR_KAKAO_API_KEY"; // 카카오 API
// 키

// public String getCoordinatesFromKakaoAPI(String dongName) {
// String url = "https://dapi.kakao.com/v2/local/search/address.json?query=" +
// dongName;

// // RestTemplate 객체로 GET 요청
// RestTemplate restTemplate = new RestTemplate();
// restTemplate.getInterceptors().add((request, body, execution) -> {
// request.getHeaders().set("Authorization", "KakaoAK " + KAKAO_API_KEY);
// return execution.execute(request, body);
// });

// // 카카오 API로부터 응답 받기
// ResponseEntity<String> response = restTemplate.getForEntity(url,
// String.class);

// // 응답 데이터 파싱
// JSONObject jsonResponse = new JSONObject(response.getBody());
// if (jsonResponse.getJSONArray("documents").length() > 0) {
// JSONObject firstResult =
// jsonResponse.getJSONArray("documents").getJSONObject(0);
// double latitude = firstResult.getJSONObject("address").getDouble("y");
// double longitude = firstResult.getJSONObject("address").getDouble("x");

// // 위도와 경도 반환
// return "Latitude: " + latitude + ", Longitude: " + longitude;
// } else {
// return "위도/경도를 찾을 수 없습니다.";
// }
// }
// }