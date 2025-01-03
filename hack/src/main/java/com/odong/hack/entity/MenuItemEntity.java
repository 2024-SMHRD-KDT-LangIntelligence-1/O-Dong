package com.odong.hack.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity // JPA 엔터티로 선언
@Table(name = "t_menu_info_img")
public class MenuItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "menu")
    private String name; // 메뉴 이름
    @Column(name = "info")
    private String info; // 설명
    @Column(name = "ingred")
    private String ingred; // 재료
    @Column(name = "tokenized_info")
    private String tokenizedInfo;
    @Column(name = "img")
    private String img;
}
