package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Message;

public interface MessageRepository extends CrudRepository<Message, Long>{

    List<Message> getByType(String type);
    
}