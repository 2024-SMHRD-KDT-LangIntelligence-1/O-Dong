package com.odong.hack.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.odong.hack.service.CafeService;

@RestController
public class CafeController {
    private final CafeService cafeService;

    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    @GetMapping("/top-5-menu-by-dong")
    public List<Map<String, Object>> getTop5MenusByDong(String dong) {
        // System.out.println(cafeService.getTop5MenusByDong(dong));
        return cafeService.getTop5MenusByDong(dong);
    }

    @GetMapping("/autocomplete")
    public List<String> autocomplete(String query) {
        return cafeService.searchDongStartingWith(query);
    }

    // 정확히 일치하는 동 검색
    @GetMapping("/search")
    public List<String> search(String dong) {
        return cafeService.searchExactDong(dong);
    }
}
