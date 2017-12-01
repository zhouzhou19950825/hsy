package com.lesson.ServiceImpl;

import com.lesson.po.AreaTable;
import com.lesson.repository.AreaTableRepository;
import com.lesson.service.AreaTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("areaTableService")
public class AreaTableServiceImpl implements AreaTableService {
    @Autowired
    private AreaTableRepository areaTableRepository;

    @Override
    public AreaTable addAreaTable(AreaTable areaTable) {
        return areaTableRepository.save(areaTable);
    }

    @Override
    public void deleteAreaTable(long areaTableId) {
        areaTableRepository.delete(areaTableId);
    }

    @Override
    public AreaTable updateAreaTable(AreaTable areaTable) {
        return areaTableRepository.saveAndFlush(areaTable);
    }

    @Override
    public AreaTable getByMenuNodeId(long menuNodeId) {
        try {
            AreaTable areaTable = areaTableRepository.getByMenuNodeId(menuNodeId);
            return areaTable;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<AreaTable> findAll() {
        return areaTableRepository.findAll();
    }
}
