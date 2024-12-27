package com.odong.hack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  @GetMapping("/") // 홈 URL 처리
  public String index() {
    return "index"; // index.html 템플릿을 반환
  }

  @GetMapping("/district")
  public String district() {
    return "district";
  }

  @GetMapping("/sangpop")
  public String getSanpop() {
    return "sangpop"; // sanpop.html 템플릿을 반환
  }
}