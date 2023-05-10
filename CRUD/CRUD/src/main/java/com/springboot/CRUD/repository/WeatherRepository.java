package com.springboot.CRUD.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springboot.CRUD.model.Weather;

public interface WeatherRepository extends MongoRepository<Weather, String>{

}
