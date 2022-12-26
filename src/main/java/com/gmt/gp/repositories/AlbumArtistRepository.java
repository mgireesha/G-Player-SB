package com.gmt.gp.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.AlbumArtist;

public interface AlbumArtistRepository extends CrudRepository<AlbumArtist,Long>{
    @Modifying
    @Query(value = "truncate table album_artist",nativeQuery = true)
    void truncateMyTable();
}
