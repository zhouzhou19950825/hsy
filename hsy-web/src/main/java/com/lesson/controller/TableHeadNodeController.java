package com.lesson.controller;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.po.TableHeadNode;
import com.lesson.service.TableHeadNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tableHeadNode")
public class TableHeadNodeController {
    protected static final Logger LOGGER = LoggerFactory.getLogger(TableHeadNodeController.class);

    @Autowired
    private TableHeadNodeService tableHeadNodeService;

    /**
     * 根据表ID获取所有的表头节点
     *
     * @param areaTableId
     * @return
     */
    @GetMapping("/getAllTableHeadNodeByAreaTableId")
    public List<TableHeadNode> getAllTableHeadNodeByAreaTableId(long areaTableId) {
        try {
            return tableHeadNodeService.getByAreaTableId(areaTableId);
        } catch (Exception e) {
            LOGGER.info("getAllTableHeadNodeByAreaTableId:" + e.getMessage());
        }
        return null;
    }

    /**
     * 根据菜单节点
     *
     * @param menuNodeId
     * @return
     */
    @GetMapping("/getAllTableHeadNodeByMenuNodeId")
    public List<TableHeadNode> getAllTableHeadNodeByMenuNodeId(long menuNodeId) {
        try {
            return tableHeadNodeService.getByMenuNodeId(menuNodeId);
        } catch (Exception e) {
            LOGGER.info("getAllTableHeadNodeByMenuNodeId:" + e.getMessage());
        }
        return null;
    }

    /**
     * 添加表头节点
     *
     * @param tableHeadNode
     * @return
     */
    @GetMapping("/addTableHeadNode")
    public TableHeadNode addTableHeadNode(TableHeadNode tableHeadNode) {
        try {
            tableHeadNode = tableHeadNodeService.addTableHeadNode(tableHeadNode);
            if (tableHeadNode != null) {
                return tableHeadNode;
            }
        } catch (Exception e) {
            LOGGER.info("addTableHeadNode:" + e.getMessage());
        }
        return null;
    }

    /**
     * 更新表头节点
     *
     * @param id
     * @param isLeaf
     * @return
     */
    @GetMapping("/updateTableHeadNode")
    public TableHeadNode updateTableHeadNode(long id, int isLeaf) {
        try {
            TableHeadNode t = tableHeadNodeService.getById(id);
            t.setIsLeaf(isLeaf);
            t = tableHeadNodeService.updateTableHeadNode(t);
            if (t != null) {
                return t;
            }
        } catch (Exception e) {
            LOGGER.info("updateTableHeadNode:" + e.getMessage());
        }
        return null;
    }

    /**
     * 删除节点
     *
     * @param id
     * @return
     */
    @GetMapping("/deleteTableHeadNode")
    public String deleteTableHeadNode(long id) {
        try {
            tableHeadNodeService.deleteTableHeadNode(id);
            return "SUCCESS";
        } catch (Exception e) {
            LOGGER.info("deleteTableHeadNode:" + e.getMessage());
        }
        return null;
    }

    /**
     * 根据菜单节点ID删除表格头节点
     *
     * @param menuNodeId
     * @return
     */
    @GetMapping("/deleteTableHeadNodeByMenuNodeId")
    public String deleteTableHeadNodeByMenuNodeId(long menuNodeId) {
        try {
            List<TableHeadNode> tableHeadNodeList = tableHeadNodeService.getByMenuNodeId(menuNodeId);
            for (int i = 0; i < tableHeadNodeList.size(); i++) {
                tableHeadNodeService.deleteTableHeadNode(tableHeadNodeList.get(i).getId());
            }
            return "SUCCESS";
        } catch (Exception e) {
            LOGGER.info("deleteTableHeadNodeByMenuNodeId:" + e.getMessage());
        }
        return null;
    }
}
