package com.gmt.gp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PlaylistItems {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String playlist;
    private long playlistId;
    private String songPath;
    private String albumName;
    private long albumId;
    private long songId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlaylist() {
        return playlist;
    }

    public void setPlaylist(String playlist) {
        this.playlist = playlist;
    }

    public String getSongPath() {
        return songPath;
    }

    public void setSongPath(String songPath) {
        this.songPath = songPath;
    }

    public PlaylistItems() {
    }

    public PlaylistItems(String playlist, String songPath) {
        this.playlist = playlist;
        this.songPath = songPath;
    }

    @Override
    public String toString() {
        return "Playlist [id=" + id + ", playlist=" + playlist + ", playlistId=" + playlistId + ", songPath=" + songPath
                + ", albumName=" + albumName + ", albumId=" + albumId + ", songId=" + songId + "]";
    }

    public long getAlbumId() {
        return albumId;
    }

    public long getSongId() {
        return songId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public void setSongId(long songId) {
        this.songId = songId;
    }

    public long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(long playlistId) {
        this.playlistId = playlistId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

}
