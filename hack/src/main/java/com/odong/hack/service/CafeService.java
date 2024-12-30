package com.odong.hack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.odong.hack.entity.MenuEntity;
import com.odong.hack.mapper.CafeRepo;
import com.odong.hack.mapper.MenuRepo;

@Service
public class CafeService {
    private final MenuRepo menurepo;

    public CafeService(MenuRepo menurepo) {
        this.menurepo = menurepo;
    }

    public List<Map<String, Object>> getTop5MenusByDong(String dong) {
        List<Object[]> results = menurepo.findTop5MenusByDong(dong);
        System.out.println(results);
        // 결과 처리: 메뉴 이름과 카운트를 반환
        return results.stream().map(item -> {
            Map<String, Object> menuMap = new HashMap<>();
            menuMap.put("name", item[0]); // 메뉴 이름
            menuMap.put("count", item[1]); // 메뉴 등장 횟수
            return menuMap;
        }).collect(Collectors.toList());
    }

    public List<String> searchExactDong(String dong) {
        return menurepo.findExactDong(dong);
    }

    // 동 이름으로 시작하는 항목 검색
    public List<String> searchDongStartingWith(String query) {
        return menurepo.findDongStartingWith(query);
    }
}
