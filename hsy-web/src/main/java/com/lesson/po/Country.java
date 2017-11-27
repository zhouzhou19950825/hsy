package com.lesson.po;

import com.lesson.base.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by zhubuqing on 2017/8/4.
 */
@Data
@Entity
public class Country extends BaseEntity {
    private long areaId; // 大区域名字

    private String countryName; // 国家或地区名字

    private String countryNum; // 国家或地区编号
}
