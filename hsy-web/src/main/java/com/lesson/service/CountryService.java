package com.lesson.service;

import com.lesson.po.Country;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface CountryService {
    Country addCountry(Country country);

    void deleteCountry(long countryId);

    Country updateCountry(Country country);

    List<Country> getByAreaId(long areaId);

    List<Country> listAll();
}
