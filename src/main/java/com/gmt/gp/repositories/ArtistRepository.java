package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.gmt.gp.model.Artist;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
    @Modifying
    @Query(value = "truncate table artist", nativeQuery = true)
    void truncateMyTable();

    List<Artist> getByTypeOrderByArtistNameAsc(String type);

    Artist getByArtistNameAndType(String artistName, String type);

    List<Object> getByArtistNameContainsIgnoreCaseAndType(String searchKey, String artist);

    @Query("select artist from Artist artist where artist.artistName in :artistNames")
    List<Artist> getByArtistNames(@Param("artistNames") List<String> artistNames);

    Artist getByArtistId(long artistId);
}
