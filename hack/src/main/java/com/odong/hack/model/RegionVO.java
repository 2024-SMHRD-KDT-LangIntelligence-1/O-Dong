package com.odong.hack.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegionVO {
    private String dongName; // 동 이름
    private double latitude; // 위도
    private double longitude; // 경도
}
