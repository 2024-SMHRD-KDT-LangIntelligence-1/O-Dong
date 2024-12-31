package com.odong.hack.controller;
import com.odong.hack.model.SimilarDongRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class FlaskController {

    @PostMapping("/send")
    public ResponseEntity<String> sendDataToFlask(@RequestBody String inputData) {
        String flaskUrl = "http://localhost:5000/process"; // 플라스크 서버 URL

        // 요청 데이터 생성
        String requestBody = "{ \"input_data\": \"" + inputData + "\" }";

        // RestTemplate을 사용하여 플라스크에 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, requestBody, String.class);

        // 플라스크로부터 받은 응답 반환
        return ResponseEntity.ok("Flask response: " + response.getBody());
    }

    @PostMapping("/receive-similar-dongs")
    public ResponseEntity<String> receiveSimilarDongs(@RequestBody SimilarDongRequest request){
        System.out.print(request.getSimilarDongs());
        return ResponseEntity.ok("응답 성공");
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
    }
}