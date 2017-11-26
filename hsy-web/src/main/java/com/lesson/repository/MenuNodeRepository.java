package com.lesson.repository;

import com.lesson.po.MenuNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface MenuNodeRepository extends JpaRepository<MenuNode, Long> {
    List<MenuNode> getByAreaId(long areaId);
}
