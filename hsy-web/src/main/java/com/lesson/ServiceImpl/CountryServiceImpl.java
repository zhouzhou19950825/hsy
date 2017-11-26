package com.lesson.ServiceImpl;

import com.lesson.po.Country;
import com.lesson.repository.CountryRepository;
import com.lesson.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhubuqing on 2017/11/16.
 */
@Service("countryService")
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryRepository countryRepository;

    @Override
    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public void deleteCountry(long countryId) {
        countryRepository.delete(countryId);
    }

    @Override
    public Country updateCountry(Country country) {
        return countryRepository.saveAndFlush(country);
    }

    @Override
    public List<Country> getByAreaId(long areaId) {
        return countryRepository.getByAreaId(areaId);
    }

    @Override
    public List<Country> listAll() {
        return countryRepository.findAll();
    }
}
