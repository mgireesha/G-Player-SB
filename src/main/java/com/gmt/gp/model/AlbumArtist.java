package com.gmt.gp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AlbumArtist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long albumArtistId;
    private String albumArtistName;


    public AlbumArtist() {
    }
    public long getAlbumArtistId() {
        return albumArtistId;
    }
    public void setAlbumArtistId(long albumArtistId) {
        this.albumArtistId = albumArtistId;
    }
    public String getAlbumArtistName() {
        return albumArtistName;
    }
    public void setAlbumArtistName(String albumArtistName) {
        this.albumArtistName = albumArtistName;
    }

    @Override
    public String toString() {
        return "AlbumArtist [albumArtistId=" + albumArtistId + ", albumArtistName=" + albumArtistName + "]";
    }
    
}
