package com.odong.hack.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.odong.hack.entity.MenuItemEntity;

@Repository
public interface MenuItemRepo extends JpaRepository<MenuItemEntity, Integer> {
    @Query("SELECT m FROM MenuItemEntity m WHERE m.name LIKE %:keyword% OR m.info LIKE %:keyword% OR m.ingred LIKE %:keyword%")
    List<MenuItemEntity> searchByKeyword(String keyword);

    @Query("SELECT m.name FROM MenuItemEntity m WHERE m.name LIKE %:query%")
    List<String> findMenuNamesByQuery(String query);

}
