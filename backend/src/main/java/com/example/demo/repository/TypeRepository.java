package com.example.demo.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.modal.Type;


public interface TypeRepository extends MongoRepository<Type, String> {
  List<Type> findAll();
}