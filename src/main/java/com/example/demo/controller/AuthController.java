package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.html 페이지 반환
    }
    // // @GettMapping(value = "/login")
    // // public String loginPage() {
    // // return "login"; // login.html 페이지 반환
    // // }

    // // @PostMapping("/login")
    // // public String login(@RequestParam String username, @RequestParam String
    // password) {
    // // // 로그인 처리 로직 (예: DB 확인)
    // // if () {
    // // return "redirect:/"; // 로그인 성공 시 홈으로 리다이렉트
    // // } else {
    // // return "redirect:/login?error"; // 로그인 실패 시 에러 표시
    // // }
    // // }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup"; // signup.html 페이지 반환
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String username, @RequestParam String password, @RequestParam String email) {
        // 회원가입 처리 로직 (예: DB에 사용자 정보 저장)
        return "redirect:/login"; // 회원가입 후 로그인 페이지로 리다이렉트
    }
}
