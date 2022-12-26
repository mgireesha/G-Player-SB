package com.gmt.gp.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long albumId;
    private String albumName;
    @Lob
    private Blob albumImgPath;

    
    @Override
    public String toString() {
        return "Album [albumId=" + albumId + ", albumName=" + albumName + ", albumImgPath=" + albumImgPath + "]";
    }
    public Album() {
    }
    public long getAlbumId() {
        return albumId;
    }
    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }
    public String getAlbumName() {
        return albumName;
    }
    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }
    public Blob getAlbumImgPath() {
        return albumImgPath;
    }
    public void setAlbumImgPath(Blob albumImgPath) {
        this.albumImgPath = albumImgPath;
    }

    
}
