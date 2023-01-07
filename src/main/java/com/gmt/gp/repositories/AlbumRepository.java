package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Album;

public interface AlbumRepository extends CrudRepository<Album, Long>{

    @Modifying
    @Query(value = "truncate table album",nativeQuery = true)
    void truncateMyTable();
    
    Iterable<Album> findAllByOrderByAlbumNameAsc();

    Album getByAlbumId(Long id);

    Album getByAlbumName(String albumName);

    List<Album> getByAlbumArtist(String albumArtist);

    List<Object> getByAlbumNameContainsIgnoreCase(String searchKey);
    
}
