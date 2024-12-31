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

    public int getMenuIdx() {
        return menuIdx;
    }

    public void setMenuIdx(int menuIdx) {
        this.menuIdx = menuIdx;
    }

    public int getCafeIdx() {
        return cafeIdx;
    }

    public void setCafeIdx(int cafeIdx) {
        this.cafeIdx = cafeIdx;
    }

    public String getMenuNm() {
        return menuNm;
    }

    public void setMenuNm(String menuNm) {
        this.menuNm = menuNm;
    }

    public int getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(int menuPrice) {
        this.menuPrice = menuPrice;
    }

    public String getMenuImg() {
        return menuImg;
    }

    public void setMenuImg(String menuImg) {
        this.menuImg = menuImg;
    }

    public String getMenuIngredients() {
        return menuIngredients;
    }

    public void setMenuIngredients(String menuIngredients) {
        this.menuIngredients = menuIngredients;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getMenuKeyword() {
        return menuKeyword;
    }

    public void setMenuKeyword(String menuKeyword) {
        this.menuKeyword = menuKeyword;
    }

    public String getFirstCategory() {
        return firstCategory;
    }

    public void setFirstCategory(String firstCategory) {
        this.firstCategory = firstCategory;
    }

    public String getSecondCategory() {
        return secondCategory;
    }

    public void setSecondCategory(String secondCategory) {
        this.secondCategory = secondCategory;
    }

    private String menuKeyword;
    private String firstCategory;
    private String secondCategory;
}
