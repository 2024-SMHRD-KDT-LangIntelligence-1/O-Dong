package com.odong.hack.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CafeVO {
    private int cafeIdx; // Primary key
    private String cafeNm;
    private String cafeAddr;
    private String cafeCl;
    private double lat;
    private double lon;
    // private String cafeImg;
    private String cafeRegion;
}
