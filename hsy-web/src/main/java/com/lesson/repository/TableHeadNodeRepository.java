package com.lesson.repository;

import com.lesson.po.TableHeadNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface TableHeadNodeRepository extends JpaRepository<TableHeadNode, Long> {
    List<TableHeadNode> getByAreaTableId(long areaTableId);

    List<TableHeadNode> getByFatherId(long fatherId);

    List<TableHeadNode> getByMenuNodeId(long menuNodeId);
}
