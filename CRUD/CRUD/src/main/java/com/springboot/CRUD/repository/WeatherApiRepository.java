package com.springboot.CRUD.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springboot.CRUD.model.WeatherApi;

public interface WeatherApiRepository extends MongoRepository<WeatherApi,String>{

}
