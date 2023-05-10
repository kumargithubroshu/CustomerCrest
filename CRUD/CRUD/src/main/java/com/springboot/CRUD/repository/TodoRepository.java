package com.springboot.CRUD.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.CRUD.model.TodoDTO;

@Repository
public interface TodoRepository extends MongoRepository<TodoDTO, String>  
{

//	@Query("{'todo': ?0")
	@Query
	Optional<TodoDTO> findByTodo(String todo);
}
