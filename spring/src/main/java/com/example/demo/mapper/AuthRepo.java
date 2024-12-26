package com.example.demo.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.AuthEntity;

public interface AuthRepo extends JpaRepository<AuthEntity, String> {
    AuthEntity findByUserIdAndUserPw(String user_id, String user_pw);
}
