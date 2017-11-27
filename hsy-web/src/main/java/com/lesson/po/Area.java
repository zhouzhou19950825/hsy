package com.lesson.po;

import com.lesson.base.entity.BaseEntity;
import lombok.Data;

import javax.persistence.*;

/**
 * Created by zhubuqing on 2017/8/4.
 */
@Data
@Entity
public class Area extends BaseEntity {
    private String areaName; // 大区域名字

    private String areaNum; // 大区域编号
}
