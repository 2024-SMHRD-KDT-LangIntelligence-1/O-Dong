package com.odong.hack.mapper;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.odong.hack.entity.RegionEntity;

public interface RegionRepo extends JpaRepository<RegionEntity, Integer> {

    @Query("SELECT DISTINCT m.dong FROM RegionEntity m WHERE m.dong = :dong")
    List<String> findExactDong(String dong);

    @Query("SELECT DISTINCT m.dong FROM RegionEntity m WHERE m.dong LIKE CONCAT(:dong, '%')")
    List<String> findDongStartingWith(String dong);

    @Query("SELECT r.dong FROM RegionEntity r WHERE r.regionNumber IN :regionNumbers")
    List<String> findDongNamesByRegionNumbers(List<String> regionNumbers);
}
