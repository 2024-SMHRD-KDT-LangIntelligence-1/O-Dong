package com.odong.hack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.odong.hack.entity.MenuEntity;
import com.odong.hack.entity.RegionEntity;
import com.odong.hack.mapper.CafeRepo;
import com.odong.hack.mapper.MenuRepo;
import com.odong.hack.mapper.RegionRepo;

@Service
public class CafeService {
    private final MenuRepo menurepo;
    private final RegionRepo regionRepo;

    public CafeService(MenuRepo menurepo, RegionRepo regionRepo) {
        this.menurepo = menurepo;
        this.regionRepo = regionRepo;
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
        return regionRepo.findDongStartingWith(query);
    }

    // public List<String> getDongNamesByRegionNumbers(List<String> regionNumbers) {
    // return regionNumbers.stream()
    // .map(regionNumber -> {
    // Optional<RegionEntity> regionEntity =
    // regionRepo.findByRegionNumber(regionNumber);
    // return regionEntity.map(RegionEntity::getDong) // 법정동 이름 가져오기
    // .orElse("법정동 이름을 찾을 수 없습니다."); // 값이 없으면 기본 메시지
    // })
    // .collect(Collectors.toList()); // 결과를 리스트로 반환
    // }
    public List<String> getDongNamesByRegionNumbers(List<String> regionNumbers) {
        if (regionNumbers == null) {
            System.out.println("regionNumbers is null");
        } else {
            System.out.println("Received region numbers: " + regionNumbers);
        }
        return regionNumbers;
    }
}
