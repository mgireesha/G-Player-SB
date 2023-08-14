package com.gmt.gp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PlaylistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String playlist;
    private long playlistId;
    private String songPath;
    private String albumName;
    private long albumId;
    private long songId;
    private String songTitle;

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

    public long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(long playlistId) {
        this.playlistId = playlistId;
    }

    public String getSongPath() {
        return songPath;
    }

    public void setSongPath(String songPath) {
        this.songPath = songPath;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public long getSongId() {
        return songId;
    }

    public void setSongId(long songId) {
        this.songId = songId;
    }

    public String getSongTitle() {
        return songTitle;
    }

    public void setSongTitle(String songTitle) {
        this.songTitle = songTitle;
    }

    public PlaylistItem() {

    }

    public PlaylistItem(String playlist, String songPath) {
        this.playlist = playlist;
        this.songPath = songPath;
    }

    public PlaylistItem(long id, String playlist, long playlistId, String songPath, String albumName, long albumId,
            long songId, String songTitle) {
        this.id = id;
        this.playlist = playlist;
        this.playlistId = playlistId;
        this.songPath = songPath;
        this.albumName = albumName;
        this.albumId = albumId;
        this.songId = songId;
        this.songTitle = songTitle;
    }

    public PlaylistItem copy() {
        return new PlaylistItem(id, playlist, playlistId, songPath, albumName, albumId, songId, songTitle);
    }

    @Override
    public String toString() {
        return "Playlist [id=" + id + ", playlist=" + playlist + ", playlistId=" + playlistId + ", songPath=" + songPath
                + ", albumName=" + albumName + ", albumId=" + albumId + ", songId=" + songId + "]";
    }

}