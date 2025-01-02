// package com.odong.hack.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig extends WebSecurityConfigurerAdapter {

// @Override
// protected void configure(HttpSecurity http) throws Exception {
// http.cors().and().csrf().disable(); // CORS를 활성화하고 CSRF 비활성화
// http.authorizeRequests()
// .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // OPTIONS 요청을 허용
// .anyRequest().authenticated(); // 나머지 요청은 인증
// }
// }