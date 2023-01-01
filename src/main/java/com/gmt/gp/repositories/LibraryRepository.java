package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Library;

public interface LibraryRepository extends CrudRepository<Library, Long>{
    

    @Modifying
    @Query(value = "truncate table library",nativeQuery = true)
    void truncateMyTable();

    Library getBySongId(int songId);

    Library getBySongPath(String songPath);
    
    List<Library> getByAlbum(String album);

    List<Library> getByYear(int year);

    List<Library> getByGenre(String genre);

    List<Library> getByAlbumArtistOrderByYearAsc(String albumArtist);

    List<Library> findAllByOrderByTitleAsc();

    List<Library> findAllByOrderByAlbumAsc();

    @Query("SELECT l.artist AS ARTIST FROM Library AS l GROUP BY ARTIST")
    List<String> findAllByGroupByArtist();

    @Query("SELECT l.albumArtist AS ARTIST FROM Library AS l GROUP BY ARTIST")
    List<String> findAllByGroupByAlbumArtist();

    List<Library> getByArtistContains(String artist);

    List<Library> getByAlbumArtistOrderByAlbum(String albumArtist);

    List<Object> getByTitleContainsIgnoreCase(String searchKey);

}
