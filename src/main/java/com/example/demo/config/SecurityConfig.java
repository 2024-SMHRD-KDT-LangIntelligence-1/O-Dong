//package com.example.demo.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    http
//        .authorizeRequests()
//        .antMatchers("/login", "/css/**", "/js/**").permitAll()  // 로그인 페이지 및 정적 리소스 접근 허용
//        .anyRequest().authenticated()  // 나머지 요청은 인증 필요
//        .and()
//        .formLogin()
//        .loginPage("/login")  // 로그인 페이지 경로
//        .failureUrl("/login?error=true")  // 로그인 실패 시 리디렉션할 URL
//        .permitAll()
//        .and()
//        .logout()
//        .permitAll();
//  }
//}