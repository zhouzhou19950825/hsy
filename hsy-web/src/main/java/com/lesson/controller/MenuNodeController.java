package com.lesson.controller;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.po.MenuNode;
import com.lesson.service.MenuNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menuNode")
public class MenuNodeController {
    protected static final Logger LOGGER = LoggerFactory.getLogger(MenuNodeController.class);

    @Autowired
    private MenuNodeService menuNodeService;

    /**
     * 根据大区域ID获取菜单节点
     *
     * @param areaId
     * @return
     */
    @GetMapping("/getMenuNodeByAreaId")
    public List<MenuNode> getMenuNodeByAreaId(long areaId) {
        try {
            return menuNodeService.getByAreaId(areaId);
        } catch (Exception e) {
            LOGGER.info("getMenuNodeByAreaId:" + e.getMessage());
            return null;
        }
    }

    /**
     * 添加菜单节点
     *
     * @param menuNode
     * @return
     */
    @GetMapping("/addMenuNode")
    public MenuNode addMenuNode(MenuNode menuNode) {
        try {
            return menuNodeService.addMenuNode(menuNode);
        } catch (Exception e) {
            LOGGER.info("addMenuNode:" + e.getMessage());
            return null;
        }
    }

    /**
     * 根据ID获取菜单信息
     *
     * @param id
     * @return
     */
    @GetMapping("/getMenuNodeById")
    public MenuNode getMenuNodeById(long id) {
        try {
            return menuNodeService.findOne(id);
        } catch (Exception e) {
            LOGGER.info("getMenuNodeById:" + e.getMessage());
            return null;
        }
    }

    /**
     * 更新菜单节点
     *
     * @param menuNodeId
     * @param menuNodeName
     * @return
     */
    @GetMapping("/updateMenuNode")
    public MenuNode updateMenuNode(long menuNodeId, String menuNodeName) {
        try {
            MenuNode menuNode = menuNodeService.findOne(menuNodeId);
            menuNode.setMenuNodeName(menuNodeName);
            menuNode = menuNodeService.updateMenuNode(menuNode);
            return menuNode;
        } catch (Exception e) {
            LOGGER.info("updateMenuNode:" + e.getMessage());
            return null;
        }
    }
}
