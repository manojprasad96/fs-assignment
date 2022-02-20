package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.*;

import com.example.demo.modal.User;

public interface UsersRepository extends MongoRepository<User, String> {
    
    @Query(value="{username: '?0', password: '?1'}", fields= "{password:0}")
    public Optional<User> findByUsernameAndPassword(String username, String password);
    
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

}


