package com.odong.hack.mapper;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.odong.hack.entity.MenuEntity;

public interface MenuRepo extends JpaRepository<MenuEntity, Integer> {
    // 동 이름별로 메뉴 빈도수 카운팅 후 상위 5개 메뉴 조회
    @Query(value = "SELECT m.menu_keyword, COUNT(m.menu_keyword) AS count " +
            "FROM t_cafe_menu m " +
            "WHERE m.dong = :dong " +
            "GROUP BY m.menu_keyword " +
            "ORDER BY count DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5MenusByDong(String dong);

    @Query("SELECT DISTINCT m.dong FROM MenuEntity m WHERE m.dong = :dong")
    List<String> findExactDong(String dong);

    @Query("SELECT DISTINCT m.dong FROM MenuEntity m WHERE m.dong LIKE CONCAT(:dong, '%')")
    List<String> findDongStartingWith(String dong);

}
