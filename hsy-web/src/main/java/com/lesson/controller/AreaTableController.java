package com.lesson.controller;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.po.AreaTable;
import com.lesson.service.AreaTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/areaTable")
public class AreaTableController {
    protected static final Logger LOGGER = LoggerFactory.getLogger(AreaTableController.class);

    @Autowired
    private AreaTableService areaTableService;

    /**
     * 根据菜单ID查询表格
     *
     * @param menuNodeId
     * @return
     */
    @GetMapping("/getAreaTableByMenuNodeId")
    public AreaTable getAreaTableByMenuNodeId(long menuNodeId) {
        try {
            AreaTable areaTable = areaTableService.getByMenuNodeId(menuNodeId);
            return areaTable;
        } catch (Exception e) {
            LOGGER.info("getAreaTableByMenuNodeId:" + e.getMessage());
        }
        return null;
    }

    /**
     * 更新表格信息
     *
     * @param menuNodeId
     * @param areaTableName
     * @param areaTableEnglishName
     * @return
     */
    @GetMapping("/updateAreaTable")
    public AreaTable updateAreaTable(long menuNodeId, String areaTableName, String areaTableEnglishName) {
        try {
            AreaTable areaTable = areaTableService.getByMenuNodeId(menuNodeId);
            if (areaTable == null) {
                areaTable = new AreaTable();
                areaTable.setMenuNodeId(menuNodeId);
                areaTable.setAreaTableName(areaTableName);
                areaTable.setAreaTableEnglishName(areaTableEnglishName);
                areaTable = areaTableService.addAreaTable(areaTable);
            } else {
                areaTable.setAreaTableName(areaTableName);
                areaTable.setAreaTableEnglishName(areaTableEnglishName);
                areaTable = areaTableService.updateAreaTable(areaTable);
            }
            return areaTable;
        } catch (Exception e) {
            LOGGER.info("updateAreaTable:" + e.getMessage());
        }
        return null;
    }
}
