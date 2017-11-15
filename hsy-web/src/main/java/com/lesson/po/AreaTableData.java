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

    private String tableHeadNodeId; // 表格头部节点ID
}
