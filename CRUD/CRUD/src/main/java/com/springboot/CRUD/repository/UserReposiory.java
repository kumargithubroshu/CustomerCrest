package com.springboot.CRUD.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springboot.CRUD.model.User;

public interface UserReposiory extends MongoRepository<User, String>{

}
