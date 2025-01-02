package com.odong.hack.controller;

import com.odong.hack.model.SimilarDongRequest;
import com.odong.hack.service.CafeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        // System.out.println(request.getSimilarDongs());
        // return ResponseEntity.ok("응답 성공");
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

            String flaskUrl = "http://127.0.0.1:5001/analyze-keyword";
            RestTemplate restTemplate = new RestTemplate();

            // Flask로 요청 데이터 전송
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestData, Map.class);

            // Flask에서 받은 결과를 클라이언트에 그대로 전달
            Map<String, Object> flaskResponse = response.getBody();

            // 응답 반환
            return ResponseEntity.ok(flaskResponse);

        } catch (Exception e) {
            // 예외 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "플라스크 서버에 연결하지 못했습니다.");
            errorResponse.put("details", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // 키워드 추천 메뉴 받기
    @PostMapping("/receive-keyword-menu")
    public ResponseEntity<Map<String, Object>> receiveKeywordMenu(@RequestBody Map<String, Object> requestData) {
        String status = (String) requestData.get("status");
        if(status.equals("success")) {
            String keyword = (String) requestData.get("keyword");
            List<Map<String, Object>> recommanded = (List<Map<String, Object>>) requestData.get("recommanded");

            System.out.println("입력 키워드: " + keyword);
            System.out.println("추천 메뉴 리스트: " + recommanded);

            // 응답 성공
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "데이터 전송 완료");
            return ResponseEntity.ok(response);
        } else{
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message", "데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

    // 유사 메뉴 분석을 위한 메뉴 전송
    @PostMapping("/send-menu")
    public ResponseEntity<Map<String, Object>> sendMenu(@RequestBody Map<String, String> requestData) {
        try{
            String menu = (String) requestData.get("menu");

            String flaskUrl = "http://127.0.0.1:5001/analyze-menu";
            RestTemplate restTemplate = new RestTemplate();

            // Flask로 요청 데이터 전송
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

    @PostMapping("/receive-similar-menus")
    public ResponseEntity<Map<String, Object>> receiveSimilarMenus(@RequestBody Map<String, Object> requestData) {
        String status = (String) requestData.get("status");
        if(status.equals("success")) {
            String menu = (String) requestData.get("menu");
            List<String> similarMenus = (List<String>)requestData.get("similarMenus");

            System.out.println("입력 메뉴: "+ menu);
            System.out.println("유사 메뉴: "+similarMenus);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "데이터 전송 성공");
            return ResponseEntity.ok(response);
        }else{
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", status);
            errorResponse.put("message","데이터 전송 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
    }
}