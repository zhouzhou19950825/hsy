package com.lesson.repository;

import com.lesson.po.AreaTable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface AreaTableRepository extends JpaRepository<AreaTable, Long> {
    AreaTable getByMenuNodeId(long menuNodeId);
}
