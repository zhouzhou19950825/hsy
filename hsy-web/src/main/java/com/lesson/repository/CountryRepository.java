package com.lesson.repository;

import com.lesson.po.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> getByAreaId(long areaId);
}
