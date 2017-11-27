package com.lesson.service;

import com.lesson.po.MenuNode;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface MenuNodeService {
    MenuNode addMenuNode(MenuNode menuNode);

    void deleteMenuNode(long menuNodeId);

    MenuNode updateMenuNode(MenuNode menuNode);

    List<MenuNode> getByAreaId(long areaId);

    MenuNode findOne(long menuNodeId);
}
