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

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_pw() {
        return user_pw;
    }

    public void setUser_pw(String user_pw) {
        this.user_pw = user_pw;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_phone() {
        return user_phone;
    }

    public void setUser_phone(String user_phone) {
        this.user_phone = user_phone;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public Timestamp getJoin_dt() {
        return join_dt;
    }

    public void setJoin_dt(Timestamp join_dt) {
        this.join_dt = join_dt;
    }

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
