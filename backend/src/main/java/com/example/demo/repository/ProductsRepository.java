package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.*;

import com.example.demo.modal.Product;

public interface ProductsRepository extends MongoRepository<Product, String> {
    
    @Query("{_id: ?0}")
    public Optional<Product> findById(Long id);
    
    @Query(value="{_id: ?0}", delete = true)
    public Product deleteById (Long id);
    
    @Aggregation(pipeline = {"{ $match: { $expr: { $gte: [$validTill, { $subtract: [?0, $manufacturedDate] }] }}}", "{'$sort':{'manufacturedDate':-1}}"})
    public List<Product> findAllValid(Long currentDay);
    
    @Aggregation(pipeline = {"{ $match: {$and:[ {$expr: { $gte: [$validTill, { $subtract: [?0, $manufacturedDate] }] }}, {manufacturedDate : {?2: ?1}}, {type: { $regex: ?3}}]}}", "{'$sort':{'manufacturedDate':-1}}"})
    public List<Product> findValidByTypeAndMFD(Long currentDay, Long mfd, String mfd_op, String type);
    
    @Aggregation(pipeline = {"{ $match: { $expr: { $lt: [$validTill, { $subtract: [?0, $manufacturedDate] }] }}}", "{'$sort':{'manufacturedDate':-1}}"})
    public List<Product> findAllExpired(Long currentDay);
    
    @Aggregation(pipeline = {"{ $match: {$and:[ {$expr: { $lt: [$validTill, { $subtract: [?0, $manufacturedDate] }] }}, {manufacturedDate : {?2: ?1}}, {type: { $regex: ?3}}]}}", "{'$sort':{'manufacturedDate':-1}}"})
    public List<Product> findExpiredByTypeAndMFD(Long currentDay, Long mfd, String mfd_op, String type);
    
    public long count();

}


