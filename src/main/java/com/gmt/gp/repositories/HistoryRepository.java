package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.History;

public interface HistoryRepository extends CrudRepository<History, Long>{

    History getBySongId(long songId);

    List<History> findAllByOrderByLastPlayedTimeDesc();

    List<History> findTop30ByOrderByLastPlayedTimeDesc();
    
    
}
