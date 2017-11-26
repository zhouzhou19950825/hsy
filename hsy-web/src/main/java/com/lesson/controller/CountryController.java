package com.lesson.controller;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.lesson.po.Country;
import com.lesson.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/country")
public class CountryController {
    protected static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    /**
     * 根据大区域ID获取此大区域下的所有国家地区
     *
     * @param areaId
     * @return
     */
    @GetMapping("getCountryByAreaId")
    public List<Country> getCountryByAreaId(long areaId) {
        try {
            List<Country> countryList = countryService.getByAreaId(areaId);
            return countryList;
        } catch (Exception e) {
            LOGGER.info("getCountryByAreaId:" + e.getMessage());
        }
        return null;
    }
}
