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
}
