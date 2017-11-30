package com.lesson.controller;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.po.AreaTableData;
import com.lesson.service.AreaTableDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/areaTableData")
public class AreaTableDataController {
    protected static final Logger LOGGER = LoggerFactory.getLogger(AreaTableDataController.class);

    @Autowired
    private AreaTableDataService areaTableDataService;

    /**
     * 根据国家ID和叶子节点ID获取或添加数据
     *
     * @param countryId
     * @param tableHeadNodeId
     * @param menuNodeId
     * @return
     */
    @GetMapping("/getAreaTableDataByCountryIdAndTableHeadNodeId")
    public AreaTableData getAreaTableDataByCountryIdAndTableHeadNodeId(long countryId, long tableHeadNodeId, long menuNodeId) {
        try {
            AreaTableData areaTableData = areaTableDataService.getByCountryIdAndTableHeadNodeId(countryId, tableHeadNodeId);
            if (areaTableData != null) {
                return areaTableData;
            } else {
                areaTableData = new AreaTableData();
                areaTableData.setCountryId(countryId);
                areaTableData.setTableHeadNodeId(tableHeadNodeId);
                areaTableData.setMenuNodeId(menuNodeId);
                areaTableData = areaTableDataService.addAreaTableData(areaTableData);
                return areaTableData;
            }
        } catch (Exception e) {
            LOGGER.info("getAreaTableDataByCountryIdAndTableHeadNodeId:" + e.getMessage());
        }
        return null;
    }

    /**
     * 更新数据
     *
     * @param countryId
     * @param tableHeadNodeId
     * @param menuNodeId
     * @param content
     * @return
     */
    @GetMapping("/updateAreaTableData")
    public AreaTableData updateAreaTableData(long countryId, long tableHeadNodeId, long menuNodeId, String content) {
        try {
            AreaTableData areaTableData = areaTableDataService.getByCountryIdAndTableHeadNodeId(countryId, tableHeadNodeId);
            if (areaTableData != null) {
                areaTableData.setContent(content);
                areaTableData = areaTableDataService.updateAreaTableData(areaTableData);
            } else {
                areaTableData = new AreaTableData();
                areaTableData.setCountryId(countryId);
                areaTableData.setTableHeadNodeId(tableHeadNodeId);
                areaTableData.setMenuNodeId(menuNodeId);
                areaTableData.setContent(content);
                areaTableData = areaTableDataService.addAreaTableData(areaTableData);
            }
            return areaTableData;
        } catch (Exception e) {
            LOGGER.info("updateAreaTableData:" + e.getMessage());
        }
        return null;
    }

    /**
     * 根据节点删除数据
     *
     * @param tableHeadNodeId
     * @return
     */
    @GetMapping("/deleteAreaTableData")
    public String deleteAreaTableData(long tableHeadNodeId) {
        try {
            List<AreaTableData> areaTableDataList = areaTableDataService.getByTableHeadNodeId(tableHeadNodeId);
            for (int i = 0; i < areaTableDataList.size(); i++) {
                areaTableDataService.deleteAreaTableData(areaTableDataList.get(i).getId());
            }
            return "SUCCESS";
        } catch (Exception e) {
            LOGGER.info("deleteAreaTableData:" + e.getMessage());
        }
        return null;
    }

    /**
     * 根据菜单节点ID删除数据
     *
     * @param menuNodeId
     * @return
     */
    @GetMapping("/deleteAreaTableDataByMenuNodeId")
    public String deleteAreaTableDataByMenuNodeId(long menuNodeId) {
        try {
            List<AreaTableData> areaTableDataList = areaTableDataService.getByMenuNodeId(menuNodeId);
            for (int i = 0; i < areaTableDataList.size(); i++) {
                areaTableDataService.deleteAreaTableData(areaTableDataList.get(i).getId());
            }
            return "SUCCESS";
        } catch (Exception e) {
            LOGGER.info("deleteAreaTableDataByMenuNodeId:" + e.getMessage());
        }
        return null;
    }
}
