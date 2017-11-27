package com.lesson.po;

import com.lesson.base.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by zhubuqing on 2017/8/4.
 */
@Data
@Entity
public class AreaTableData extends BaseEntity {
    private long countryId; // 国家地区名

    private long tableHeadNodeId; // 表格头部节点ID

    private long menuNodeId; // 菜单节点ID

    private String content; // 数据内容
}
