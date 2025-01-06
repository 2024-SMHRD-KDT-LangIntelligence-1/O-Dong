package com.odong.hack.controller;

import com.odong.hack.model.SimilarDongRequest;
import com.odong.hack.service.CafeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FlaskController {

    @Autowired
    private CafeService cafeService;

    @PostMapping("/send")
    public ResponseEntity<String> sendDataToFlask(@RequestBody String inputData) {
        String flaskUrl = "http://localhost:5001/process"; // 플라스크 서버 URL

        // 요청 데이터 생성(카카오 api의 위도 경도 json 전송 형식)
        String requestBody = "{ \"input_data\": \"" + inputData + "\" }";

        // RestTemplate을 사용하여 플라스크에 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, requestBody, String.class);

        // 플라스크로부터 받은 응답 반환
        return ResponseEntity.ok("Flask response: " + response.getBody());
    }

    // 유사 상권 전송 받기
    @PostMapping("/receive-similar-dongs")
    public ResponseEntity<List<String>> receiveSimilarDongs(@RequestBody SimilarDongRequest request) {

        System.out.println(request);
        List<String> regionNumbers = request.getSimilarDongs(); // 클라이언트에서 받은 법정동 코드 리스트
        // System.out.println(regionNumbers);
        List<String> dongNames = cafeService.getDongNamesByRegionNumbers(regionNumbers); // 동 코드에
        System.out.println(dongNames);
        return ResponseEntity.ok(dongNames); // 법정동 이름 리스트 응답
    }

    // 뷰로부터 전달받은 키워드 플라스크로 전송
    @PostMapping("/send-keyword")
    public ResponseEntity<Map<String, Object>> sendKeyword(@RequestBody Map<String, String> requestData) {
        try {
            String keyword = requestData.get("keyword");

            String flaskUrl = "http://localhost:5001/analyze-keyword";
            RestTemplate restTemplate = new RestTemplate();

            // Flask로 요청 데이터 전송
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Flask 서버에서 응답을 받지 못했습니다.");
            }
            // Flask에서 받은 결과를 클라이언트에 그대로 전달
            Map<String, Object> flaskResponse = response.getBody();

            // 응답 반환
            return ResponseEntity.ok(flaskResponse);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // HTTP 오류 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "플라스크 서버와의 HTTP 오류 발생");
            errorResponse.put("details", e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        } catch (Exception e) {
            // 기타 예외 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("details", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // 키워드 추천 메뉴 받기
    @PostMapping("/receive-keyword-menu")
    public ResponseEntity<Map<String, Object>> receiveKeywordMenu(@RequestBody Map<String, Object> requestData) {
        System.out.println("Received request data: " + requestData); // 요청 데이터 출력

        String status = (String) requestData.get("status");
        if (status.equals("success")) {
            String keyword = (String) requestData.get("keyword");
            List<Map<String, Object>> recommanded = (List<Map<String, Object>>) requestData.get("recommanded");
            List<Map<String, Object>> menuInfo = (List<Map<String, Object>>) requestData.get("menuInfo");
            List<Map<String, Object>> menuIngred = (List<Map<String, Object>>) requestData.get("menuIngred");

            // 출력으로 받은 데이터 확인
            System.out.println("Keyword: " + keyword);
            System.out.println("Recommended: " + recommanded);
            System.out.println("Menu Info: " + menuInfo);
            System.out.println("Menu Ingredients: " + menuIngred);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("keyword", keyword);
            response.put("message", "데이터 전송 완료");
            response.put("recommanded", recommanded);
            response.put("menuInfo", menuInfo);
            response.put("menuIngred", menuIngred);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message", "데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // 유사 메뉴 분석을 위한 메뉴 전송
    @PostMapping("/send-menu")
    public ResponseEntity<Map<String, Object>> sendMenu(@RequestBody Map<String, String> requestData) {
        try {
            String menu = (String) requestData.get("menu");

            String flaskUrl = "http://localhost:5001/analyze-menu";
            RestTemplate restTemplate = new RestTemplate();

            // Flask로 요청 데이터 전송
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);

            Map<String, Object> flaskResponse = response.getBody();
            return ResponseEntity.ok(flaskResponse);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

    @PostMapping("/receive-similar-menus")
    public ResponseEntity<Map<String, Object>> receiveSimilarMenus(@RequestBody Map<String, Object> requestData) {
        String status = (String) requestData.get("status");
        if (status.equals("success")) {
            String menu = (String) requestData.get("menu");
            List<String> similarMenus = (List<String>) requestData.get("similarMenus");

            System.out.println("입력 메뉴: " + menu);
            System.out.println("유사 메뉴: " + similarMenus);
            List<String> menuInfo = (List<String>) requestData.get("menuInfo");
            List<String> menuIngred = (List<String>) requestData.get("menuIngred");

            System.out.println("입력 메뉴: " + menu);
            System.out.println("유사 메뉴: " + similarMenus);
            System.out.println("유사 메뉴 설명: " + menuInfo);
            System.out.println("유사 메뉴 재료: " + menuIngred);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "데이터 전송 성공");
            response.put("similarMenus", similarMenus);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message", "데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/send-sanggueon-gongtong")
    public ResponseEntity<Map<String, Object>> sendSanggueonGongtong(@RequestBody Map<String, Object> requestData) {
        try {
            String sang1 = (String) requestData.get("sang1");
            String sang2 = (String) requestData.get("sang2");

            String flaskUrl = "http://localhost:5001/sanggueon-gongtong";
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);
            Map<String, Object> flaskResponse = response.getBody();
            return ResponseEntity.ok(flaskResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/receive-sanggueon-gongtong")
    public ResponseEntity<Map<String, Object>> receiveSanggueonGongtong(@RequestBody Map<String, Object> requestData) {
        String status = (String) requestData.get("status");
        if (status.equals("success")) {
            String sang1 = (String) requestData.get("sang1");
            String sang2 = (String) requestData.get("sang2");

            List<String> gongtongMenus = (List<String>) requestData.get("gongtongMenus");
            List<String> menuInfo = (List<String>) requestData.get("menuInfo");
            List<String> menuIngred = (List<String>) requestData.get("menuIngred");
            List<Integer> sang1MenuCnt = (List<Integer>) requestData.get("sang1MenuCnt");
            List<Integer> sang2MenuCnt = (List<Integer>) requestData.get("sang2MenuCnt");

            System.out.println("상권1 :" + sang1 + " / 상권2 :" + sang2);
            System.out.println("공통 메뉴: " + gongtongMenus);
            System.out.println("공통 메뉴 설명: " + menuInfo);
            System.out.println("공통 메뉴 재료: " + menuIngred);
            System.out.println("상권 1에서 공통 메뉴 비율: " + sang1MenuCnt);
            System.out.println("상권 2에서 공통 메뉴 비율: " + sang2MenuCnt);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "데이터 전송 성공");
            response.put("sang1", sang1);
            response.put("sang2", sang2);
            response.put("gontongMenus", gongtongMenus);
            response.put("menuInfo", menuInfo);
            response.put("menuIngred", menuIngred);
            response.put("sang1MenuCnt", sang1MenuCnt);
            response.put("sang2MenuCnt", sang2MenuCnt);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message", "데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/send-sanggueon-only")
    public ResponseEntity<Map<String, Object>> sendSanggueonOnly(@RequestBody Map<String, Object> requestData) {
        try {
            String sang1 = (String) requestData.get("sang1");
            String sang2 = (String) requestData.get("sang2");

            String flaskUrl = "http://127.0.0.1:5001/sanggueon-only";
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);
            Map<String, Object> flaskResponse = response.getBody();
            return ResponseEntity.ok(flaskResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/recieve-sanggueon-only")
    public ResponseEntity<Map<String, Object>> receiveSanggueonOnly(@RequestBody Map<String, Object> requestData) {
        String status = (String) requestData.get("status");
        if (status.equals("success")) {
            String sang1 = (String) requestData.get("sang1");
            String sang2 = (String) requestData.get("sang2");
            List<String> onlyMenus = (List<String>) requestData.get("onlyMenus");
            List<Integer> sang1MenuCnt = (List<Integer>) requestData.get("sang1MenuCnt");
            List<Integer> sang2MenuCnt = (List<Integer>) requestData.get("sang2MenuCnt");
            List<String> menuInfo = (List<String>) requestData.get("menuInfo");
            List<String> menuIngred = (List<String>) requestData.get("menuIngred");

            System.out.println(String.format("상권1: %s, 상권2: %s", sang1, sang2));
            System.out.println(String.format("상권 2에만 많은 메뉴: %s", onlyMenus));
            System.out.println(String.format("상권 1에서 판매되는 수: %s", sang1MenuCnt));
            System.out.println(String.format("상권 1에서 판매되는 수: %s", sang2MenuCnt));
            System.out.println(String.format("메뉴 설명: %s", menuInfo));
            System.out.println(String.format("메뉴 재료: %s", menuIngred));

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("sang1", sang1);
            response.put("sang2", sang2);
            response.put("onlyMenus", onlyMenus);
            response.put("sang1MenuCnt", sang1MenuCnt);
            response.put("sang2MenuCnt", sang2MenuCnt);
            response.put("menuInfo", menuInfo);
            response.put("menuIngred", menuIngred);
            response.put("message", "데이터 전송 성공");
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message", "데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    @PostMapping("/send-yusa-dong")
    public ResponseEntity<Map<String, Object>> sendDong(@RequestBody Map<String, Object> requestData) {
        try{
            String dong = (String) requestData.get("dong");

            String flaskUrl = "http://localhost:5001/yusa-dong-search";
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);
            Map<String, Object> flaskResponse = response.getBody();
            return ResponseEntity.ok(flaskResponse);
        }catch(Exception e){
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
    }
}