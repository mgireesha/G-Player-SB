package com.gmt.gp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Message;

public interface MessageRepository extends CrudRepository<Message, Long>{
    
}
