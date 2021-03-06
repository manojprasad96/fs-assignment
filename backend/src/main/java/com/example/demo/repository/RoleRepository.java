package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.modal.ERole;
import com.example.demo.modal.Role;


public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}