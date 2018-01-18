package com.lesson.repository;

import com.lesson.po.MenuNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface MenuNodeRepository extends JpaRepository<MenuNode, Long> {
    List<MenuNode> getByAreaId(long areaId);

    @Query(value = "select menuNode from MenuNode menuNode where menuNode.isLeaf = '1' and menuNode.menuNodeName like %?1%")
    List<MenuNode> menuNodeSearchBar(String menuNodeName);
}
