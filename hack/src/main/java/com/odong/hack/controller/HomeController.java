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

  @GetMapping("/moon_index")
  public String moon() {
    return "moon_index";
  }

  @GetMapping("/moon")
  public String write() {
    return "moon";
  }

  @GetMapping("/gongzi")
  public String gongzi() {
    return "gongzi_index";
  }

  @GetMapping("/service")
  public String service() {
    return "service";
  }

}