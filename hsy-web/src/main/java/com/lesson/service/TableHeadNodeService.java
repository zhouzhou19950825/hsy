package com.lesson.service;

import com.lesson.po.TableHeadNode;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface TableHeadNodeService {
    TableHeadNode addTableHeadNode(TableHeadNode tableHeadNode);

    void deleteTableHeadNode(long tableHeadNodeId);

    TableHeadNode updateTableHeadNode(TableHeadNode tableHeadNode);

    List<TableHeadNode> getByAreaTableId(long areaTableId);

    List<TableHeadNode> getByFatherId(long fatherId);

    TableHeadNode getById(Long id);

    List<TableHeadNode> getByMenuNodeId(long areaId);
}
