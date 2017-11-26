package com.lesson.service;

import com.lesson.po.AreaTableData;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface AreaTableDataService {
    AreaTableData addAreaTableData(AreaTableData areaTableData);

    void deleteAreaTableData(long areaTableDataId);

    AreaTableData updateAreaTableData(AreaTableData areaTableData);

    List<AreaTableData> getByCountryId(long countryId);

    List<AreaTableData> getByTableHeadNodeId(long tableHeadNodeId);

    AreaTableData getByCountryIdAndTableHeadNodeId(long countryId, long tableHeadNodeId);
}
