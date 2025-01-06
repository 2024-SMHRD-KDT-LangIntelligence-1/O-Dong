package com.odong.hack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odong.hack.mapper.MenuItemRepo;
import com.odong.hack.entity.*;

@Service
public class MenuItemService {
    @Autowired
    private MenuItemRepo menuItemRepo;

    public List<MenuItemEntity> searchByKeyword(String keyword) {
        return menuItemRepo.searchByKeyword(keyword);
    }

    public List<String> getMenuSuggestions(String query) {
        // 쿼리가 null 이거나 공백인 경우 처리
        if (query == null || query.trim().isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }

        // Repository에서 메뉴 이름에 대해 자동완성 결과를 가져옴
        return menuItemRepo.findMenuNamesByQuery(query);
    }
}
