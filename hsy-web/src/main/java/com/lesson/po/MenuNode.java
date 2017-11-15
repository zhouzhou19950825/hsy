package com.lesson.po;

import com.lesson.base.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by zhubuqing on 2017/8/4.
 */
@Data
@Entity
public class MenuNode extends BaseEntity {
    private String menuNodeName; // 菜单节点名字

    private long fatherId; // 上级节点ID

    private int level; // 层级

    private int isLeaf; // 是否叶子节点

    private String url; // URL

    private long areaId; // 大区域ID
}
