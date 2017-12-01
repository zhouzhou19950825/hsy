package com.lesson.ServiceImpl;

import com.lesson.po.TableHeadNode;
import com.lesson.repository.TableHeadNodeRepository;
import com.lesson.service.TableHeadNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("tableHeadNodeService")
public class TableHeadNodeServiceImpl implements TableHeadNodeService {
    @Autowired
    private TableHeadNodeRepository tableHeadNodeRepository;

    @Override
    public TableHeadNode addTableHeadNode(TableHeadNode tableHeadNode) {
        try {
            return tableHeadNodeRepository.save(tableHeadNode);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void deleteTableHeadNode(long tableHeadNodeId) {
        try {
            tableHeadNodeRepository.delete(tableHeadNodeId);
        } catch (Exception e) {
        }
    }

    @Override
    public TableHeadNode updateTableHeadNode(TableHeadNode tableHeadNode) {
        try {
            return tableHeadNodeRepository.saveAndFlush(tableHeadNode);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<TableHeadNode> getByAreaTableId(long areaTableId) {
        try {
            return tableHeadNodeRepository.getByAreaTableId(areaTableId);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<TableHeadNode> getByFatherId(long fatherId) {
        try {
            return tableHeadNodeRepository.getByFatherId(fatherId);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public TableHeadNode getById(Long id) {
        try {
            return tableHeadNodeRepository.getOne(id);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<TableHeadNode> getByMenuNodeId(long menuNodeId) {
        try {
            return tableHeadNodeRepository.getByMenuNodeId(menuNodeId);
        } catch (Exception e) {
        }
        return null;
    }
}
