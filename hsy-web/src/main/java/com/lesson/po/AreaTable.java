package com.lesson.po;

import com.lesson.base.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by zhubuqing on 2017/8/4.
 */
@Data
@Entity
public class AreaTable extends BaseEntity {
    private long menuNodeId; // 菜单节点ID

    private String areaTableName; // 表格名称

    private String areaTableEnglishName; // 表格英文名
}
