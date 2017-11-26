package com.lesson.repository;

import com.lesson.po.AreaTableData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface AreaTableDataRepository extends JpaRepository<AreaTableData, Long> {
    List<AreaTableData> getByCountryId(long countryId);

    List<AreaTableData> getByTableHeadNodeId(long tableHeadNodeId);

    AreaTableData getByCountryIdAndTableHeadNodeId(long countryId, long tableHeadNodeId);
}
