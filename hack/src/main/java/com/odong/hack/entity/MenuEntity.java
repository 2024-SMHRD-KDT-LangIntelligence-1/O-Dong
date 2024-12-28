package com.odong.hack.entity;

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
@Table(name = "t_menu2")
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_idx")
    private Long menuIdx;

    @Column(name = "cafe_idx", nullable = false)
    private int cafeIdx;

    @Column(name = "menu_nm", nullable = false)
    private String menuNm;

    @Column(name = "menu_price", nullable = false)
    private int menuPrice;

    // @Column(name = "menu_img")
    // private String menuImg;

    // @Column(name = "menu_ingredients")
    // private String menuIngredients;

    // @Column(name = "created_at", nullable = false)
    // private Timestamp createdAt;

    @Column(name = "dong")
    private String dong;

    @Column(name = "menu_keyword")
    private String menuKeyword;

    @Column(name = "1st_category")
    private String firstCategory;

    @Column(name = "2nd_category")
    private String secondCategory;

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private CafeEntity cafe;
}
