package com.odong.hack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.odong.hack.entity.MenuItemEntity;
import com.odong.hack.service.MenuItemService;

@RestController
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping("/searchByKeyword")
    public List<MenuItemEntity> searchByKeyword(String keyword) {
        return menuItemService.searchByKeyword(keyword);
    }
}
