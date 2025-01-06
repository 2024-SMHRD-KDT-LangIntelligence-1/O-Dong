package com.odong.hack.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

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
@Table(name = "t_cafe_menu")
public class MenuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cafe_menu_idx")
    private Integer cafeMenuIdx;

    // @Column(name = "cafe_idx", nullable = false)
    // private Integer cafeIdx;

    @Column(name = "menu_nm", length = 300, nullable = false)
    private String menuName;

    @Column(name = "menu_price", precision = 10, scale = 0, nullable = true)
    private BigDecimal menuPrice;

    @Column(name = "dong", length = 100, nullable = false)
    private String dong;

    @Column(name = "first_category", length = 300, nullable = false)
    private String firstCategory;

    @Column(name = "second_category", length = 300, nullable = true)
    private String secondCategory;

    @Column(name = "menu_keyword", length = 300, nullable = true)
    private String menuKeyword;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "cafe_idx", nullable = false) // CafeEntity의 cafeIdx와 연결
    private CafeEntity cafe;
}
