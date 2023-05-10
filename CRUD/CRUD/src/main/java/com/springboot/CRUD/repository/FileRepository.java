package com.springboot.CRUD.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.springboot.CRUD.model.FileInfo;

@Repository
public interface FileRepository extends MongoRepository<FileInfo, String> {

}
