package com.lesson.ServiceImpl;

import com.lesson.po.Area;
import com.lesson.repository.AreaRepository;
import com.lesson.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("areaService")
public class AreaServiceImpl implements AreaService {
    @Autowired
    private AreaRepository areaRepository;

    @Override
    public Area addArea(Area area) {
        return areaRepository.save(area);
    }

    @Override
    public void deleteArea(long areaId) {
        areaRepository.delete(areaId);
    }

    @Override
    public Area updateArea(Area area) {
        return areaRepository.saveAndFlush(area);
    }

    @Override
    public List<Area> listAll() {
        return areaRepository.findAll();
    }
}
