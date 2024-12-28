package com.odong.hack.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_cafe2")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CafeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 자동 증가 설정
    @Column(name = "cafe_idx")
    private Long cafeIdx;

    @Column(name = "cafe_nm", length = 50, nullable = false)
    private String cafeNm;

    @Column(name = "cafe_addr", length = 50, nullable = false)
    private String cafeAddr;

    @Column(name = "cafe_cl", length = 50)
    private String cafeCl;

    @Column(name = "lat")
    private double lat;

    @Column(name = "lon")
    private double lon;

    // @Column(name = "cafe_img", length = 100)
    // private String cafeImg;

    @Column(name = "cafe_region", length = 50)
    private String cafeRegion;

    @Column(name = "cafe_unit")
    private String dong;

    @OneToMany(mappedBy = "cafe")
    private List<MenuEntity> menus;
}
