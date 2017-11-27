package com.lesson.ServiceImpl;

import com.lesson.po.AreaTableData;
import com.lesson.repository.AreaTableDataRepository;
import com.lesson.service.AreaTableDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("areaTableDataService")
public class AreaTableDataServiceImpl implements AreaTableDataService {
    @Autowired
    private AreaTableDataRepository areaTableDataRepository;

    @Override
    public AreaTableData addAreaTableData(AreaTableData areaTableData) {
        return areaTableDataRepository.save(areaTableData);
    }

    @Override
    public void deleteAreaTableData(long areaTableDataId) {
        areaTableDataRepository.delete(areaTableDataId);
    }

    @Override
    public AreaTableData updateAreaTableData(AreaTableData areaTableData) {
        return areaTableDataRepository.saveAndFlush(areaTableData);
    }

    @Override
    public List<AreaTableData> getByCountryId(long countryId) {
        return areaTableDataRepository.getByCountryId(countryId);
    }

    @Override
    public List<AreaTableData> getByTableHeadNodeId(long tableHeadNodeId) {
        return areaTableDataRepository.getByTableHeadNodeId(tableHeadNodeId);
    }

    @Override
    public AreaTableData getByCountryIdAndTableHeadNodeId(long countryId, long tableHeadNodeId) {
        return areaTableDataRepository.getByCountryIdAndTableHeadNodeId(countryId, tableHeadNodeId);
    }
}
