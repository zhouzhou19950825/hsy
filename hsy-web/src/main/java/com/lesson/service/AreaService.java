package com.lesson.service;

import com.lesson.po.Area;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface AreaService {
    Area addArea(Area area);

    void deleteArea(long areaId);

    Area updateArea(Area area);

    List<Area> listAll();
}
