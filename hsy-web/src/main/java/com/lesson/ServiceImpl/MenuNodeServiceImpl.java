package com.lesson.ServiceImpl;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.controller.MenuNodeController;
import com.lesson.po.MenuNode;
import com.lesson.repository.MenuNodeRepository;
import com.lesson.service.MenuNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("menuNodeService")
public class MenuNodeServiceImpl implements MenuNodeService {
    protected static final Logger LOGGER = LoggerFactory.getLogger(MenuNodeServiceImpl.class);

    @Autowired
    private MenuNodeRepository menuNodeRepository;

    @Override
    public MenuNode addMenuNode(MenuNode menuNode) {
        return menuNodeRepository.save(menuNode);
    }

    @Override
    public void deleteMenuNode(long menuNodeId) {
        menuNodeRepository.delete(menuNodeId);
    }

    @Override
    public MenuNode updateMenuNode(MenuNode menuNode) {
        return menuNodeRepository.saveAndFlush(menuNode);
    }

    @Override
    public List<MenuNode> getByAreaId(long areaId) {
        return menuNodeRepository.getByAreaId(areaId);
    }

    @Override
    public MenuNode findOne(long menuNodeId) {
        return menuNodeRepository.findOne(menuNodeId);
    }

    @Override
    public List<MenuNode> menuNodeSearchBar(String menuNodeName) {
        List<MenuNode> menuNodeList = new ArrayList<MenuNode>();
        try {
            menuNodeList = menuNodeRepository.menuNodeSearchBar(menuNodeName);
            return menuNodeList;
        } catch (Exception e) {
            LOGGER.info("menuNodeSearchBar:" + e.getMessage());
            return null;
        }
    }
}
