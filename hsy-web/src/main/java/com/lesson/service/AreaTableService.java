package com.lesson.service;

import com.lesson.po.AreaTable;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface AreaTableService {
    AreaTable addAreaTable(AreaTable areaTable);

    void deleteAreaTable(long areaTableId);

    AreaTable updateAreaTable(AreaTable areaTable);

    AreaTable getByMenuNodeId(long menuNodeId);

    List<AreaTable> findAll();
}
