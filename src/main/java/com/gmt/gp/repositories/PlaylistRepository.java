package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.Playlist;

public interface PlaylistRepository extends CrudRepository<Playlist, Long> {

    List<Playlist> getByPlaylist(String playlist);

    @Query("SELECT p.songId FROM Playlist p where p.playlist =:playlist")
    List<Long> getBySongIdsInPlaylist(String playlist);
}
