package com.odong.hack.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.odong.hack.entity.AuthEntity;
import com.odong.hack.mapper.AuthRepo;
import com.odong.hack.model.AuthVO;

import jakarta.servlet.http.HttpSession;

@Controller
public class AuthController {
    @Autowired
    AuthRepo repo;

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.html 페이지 반환
    }

    @PostMapping("member/login.do")
    public String login(String user_id, String user_pw, HttpSession session, RedirectAttributes redirectAttributes) {
        // 로그인 처리 로직 (예: DB 확인)
        AuthEntity enti = repo.findByUserIdAndUserPw(user_id, user_pw);
        if (enti == null) {
            // 로그인 실패 처리
            redirectAttributes.addFlashAttribute("error", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return "redirect:/login"; // 로그인 페이지로 리다이렉트
        }
        session.setAttribute("member", enti);
        System.out.println(session.getAttribute("member"));

        return "redirect:/";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup"; // signup.html 페이지 반환
    }

    @PostMapping("member/signup.do")
    public String signup(AuthVO vo) {
        // 회원가입 처리 로직 (예: DB에 사용자 정보 저장)
        AuthEntity en = new AuthEntity(vo);
        repo.save(en);
        return "redirect:/login"; // 회원가입 후 로그인 페이지로 리다이렉트
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        System.out.println(session.getAttribute("member"));

        session.removeAttribute("member");

        return "redirect:/";
    }

    @GetMapping("/overlay.do")
    @ResponseBody
    public boolean overlay(String user_id) {
        return repo.existsByUserId(user_id);
    }
}
