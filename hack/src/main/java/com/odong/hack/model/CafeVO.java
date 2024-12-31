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

    public int getCafeIdx() {
        return cafeIdx;
    }

    public void setCafeIdx(int cafeIdx) {
        this.cafeIdx = cafeIdx;
    }

    public String getCafeNm() {
        return cafeNm;
    }

    public void setCafeNm(String cafeNm) {
        this.cafeNm = cafeNm;
    }

    public String getCafeAddr() {
        return cafeAddr;
    }

    public void setCafeAddr(String cafeAddr) {
        this.cafeAddr = cafeAddr;
    }

    public String getCafeCl() {
        return cafeCl;
    }

    public void setCafeCl(String cafeCl) {
        this.cafeCl = cafeCl;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public String getCafeRegion() {
        return cafeRegion;
    }

    public void setCafeRegion(String cafeRegion) {
        this.cafeRegion = cafeRegion;
    }
}
