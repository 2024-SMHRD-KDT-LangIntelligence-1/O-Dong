package com.odong.hack.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuVO {
    private int menuIdx;
    private int cafeIdx;
    private String menuNm;
    private int menuPrice;
    private String menuImg;
    private String menuIngredients;
    private Timestamp createdAt;
    private String menuKeyword;
    private String firstCategory;
    private String secondCategory;
}
