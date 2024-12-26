package com.odong.hack.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthVO {

    private String user_id;

    // 회원 비밀번호
    private String user_pw;

    // 회원 이름
    private String user_name;

    // 회원 전화번호
    private String user_phone;

    // 회원 이메일
    private String user_email;

    // 회원 구분
    private String user_role;

    // 가입 일자
    private Timestamp join_dt;
}
