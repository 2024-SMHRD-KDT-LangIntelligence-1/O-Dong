package com.odong.hack.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odong.hack.entity.CafeEntity;

public interface CafeRepo extends JpaRepository<CafeEntity, Long> {
    List<CafeEntity> findByDong(String dong);
}
