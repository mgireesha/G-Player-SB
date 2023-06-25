package com.gmt.gp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gmt.gp.model.PlaylistItems;

public interface PlaylistRepository extends CrudRepository<PlaylistItems, Long> {

    List<PlaylistItems> getByPlaylist(String playlist);

    @Query("SELECT p.songId FROM PlaylistItems p where p.playlistId =:playlistId")
    List<Long> getSongIdsInPlaylist(long playlistId);

    List<PlaylistItems> getByPlaylistId(long playlistId);
}
