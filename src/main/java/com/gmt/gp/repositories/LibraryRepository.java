package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Library;

public interface LibraryRepository extends CrudRepository<Library, Long> {

    @Modifying
    @Query(value = "truncate table library", nativeQuery = true)
    void truncateMyTable();

    Library getBySongId(long songId);

    Library getBySongPath(String songPath);

    List<Library> getByAlbum(String album);

    List<Library> getByYear(int year);

    List<Library> getByGenre(String genre);

    @Query("select count(*) as count, lib.genre as genre from Library lib group by lib.genre order by count desc")
    List<String> getGenresGroupByGenre();

    @Query("select distinct l.album from Library l where l.genre = :genre")
    List<String> getAlbumListByGenre(String genre);

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

    @Query("SELECT l.songId from Library as l order by l.title asc")
    List<Long> getAllLibraryIds();

    @Query("Select l from Library l where l.songId in (:songsId) order by l.title")
    List<Library> getSongsBySongIds(List<Long> songsId);

    List<Library> getByAlbumAndGenre(String album, String genre);

}
