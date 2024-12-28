package com.odong.hack.mapper;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.odong.hack.entity.MenuEntity;

public interface MenuRepo extends JpaRepository<MenuEntity, Long> {
    // 동 이름별로 메뉴 빈도수 카운팅 후 상위 5개 메뉴 조회
    @Query(value = "SELECT m.menu_nm, COUNT(m.menu_nm) AS count " +
            "FROM t_menu2 m " +
            "WHERE m.dong = :dong " +
            "GROUP BY m.menu_nm " +
            "ORDER BY count DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5MenusByDong(String dong);
}
