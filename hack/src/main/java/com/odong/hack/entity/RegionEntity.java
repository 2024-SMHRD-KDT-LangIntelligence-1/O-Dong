package com.odong.hack.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity // JPA 엔터티로 선언
@Table(name = "t_region")
public class RegionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_idx")
    private Integer dongIdx;

    @Column(name = "region", nullable = false, length = 100)
    private String region;

    @Column(name = "region_number", nullable = false)
    private String regionNumber;

    @Column(name = "dong", nullable = false, length = 100)
    private String dong;

    @Column(name = "sales", precision = 17, scale = 5)
    private BigDecimal sales;

    @Column(name = "sales_cnt", precision = 17, scale = 5)
    private BigDecimal salesCnt;

    @Column(name = "week_sales", precision = 17, scale = 5)
    private BigDecimal weekSales;

    @Column(name = "weekends_sales", precision = 17, scale = 5)
    private BigDecimal weekendsSales;

    @Column(name = "monday_sales", precision = 17, scale = 5)
    private BigDecimal mondaySales;

    @Column(name = "tuesday_sales", precision = 17, scale = 5)
    private BigDecimal tuesdaySales;

    @Column(name = "wednesday_sales", precision = 17, scale = 5)
    private BigDecimal wednesdaySales;

    @Column(name = "thursday_sales", precision = 17, scale = 5)
    private BigDecimal thursdaySales;

    @Column(name = "friday_sales", precision = 17, scale = 5)
    private BigDecimal fridaySales;

    @Column(name = "saturday_sales", precision = 17, scale = 5)
    private BigDecimal saturdaySales;

    @Column(name = "sunday_sales", precision = 17, scale = 5)
    private BigDecimal sundaySales;

    @Column(name = "floating00to06", precision = 17, scale = 5)
    private BigDecimal floating00to06;

    @Column(name = "floating06to11", precision = 17, scale = 5)
    private BigDecimal floating06to11;

    @Column(name = "floating11to14", precision = 17, scale = 5)
    private BigDecimal floating11to14;

    @Column(name = "floating14to17", precision = 17, scale = 5)
    private BigDecimal floating14to17;

    @Column(name = "floating17to21", precision = 17, scale = 5)
    private BigDecimal floating17to21;

    @Column(name = "floating21to24", precision = 17, scale = 5)
    private BigDecimal floating21to24;

    public RegionEntity(String regionNumber, String dong) {
        this.regionNumber = regionNumber; // 법정동 코드
        this.dong = dong; // 이름
    }
}
