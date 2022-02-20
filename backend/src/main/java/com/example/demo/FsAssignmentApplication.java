package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.demo.repository.ProductsRepository;

@SpringBootApplication
@EnableMongoRepositories
public class FsAssignmentApplication {
	
	@Autowired
	ProductsRepository productsRepo;

	public static void main(String[] args) {
		SpringApplication.run(FsAssignmentApplication.class, args);
	}

}
