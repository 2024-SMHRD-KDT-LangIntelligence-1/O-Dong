package com.odong.hack.mapper;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odong.hack.entity.*;

public interface AuthRepo extends JpaRepository<AuthEntity, String> {
    AuthEntity findByUserIdAndUserPw(String user_id, String user_pw);
}
