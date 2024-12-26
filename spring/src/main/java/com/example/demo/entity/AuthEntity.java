
package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import com.example.demo.model.AuthVO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity // JPA 엔터티로 선언
@Table(name = "t_user") // 데이터베이스 테이블 이름 지정
public class AuthEntity {
    public AuthEntity(AuthVO vo) {
        this.userName = vo.getUser_name();
        this.userId = vo.getUser_id();
        this.userPw = vo.getUser_pw();
        this.userPhone = vo.getUser_phone();
        this.userEmail = vo.getUser_email();
    }

    @Id // 자동 생성 전략
    @Column(name = "user_id")
    private String userId;

    // 회원 비밀번호
    @Column(name = "user_pw")
    private String userPw;

    // 회원 이름
    @Column(name = "user_name")
    private String userName;

    // 회원 전화번호
    @Column(name = "user_phone")
    private String userPhone;

    // 회원 이메일
    @Column(name = "user_email")
    private String userEmail;

    // 회원 구분
    @Column(name = "user_role")
    private String userRole;

    // 가입 일자
    @Column(name = "join_dt")
    private Timestamp joinDt;
}