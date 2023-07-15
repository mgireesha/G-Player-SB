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
    private String albumArtist;
    private String composer;
    private int year;
    private int totaltracks;
    private String genre;
    private boolean isAlbumImgAvl;
    private String genreType;
    private String genres;

    public Album() {
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
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

    public String getAlbumArtist() {
        return albumArtist;
    }

    public void setAlbumArtist(String albumArtist) {
        this.albumArtist = albumArtist;
    }

    public String getComposer() {
        return composer;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getTotaltracks() {
        return totaltracks;
    }

    public void setTotaltracks(int totaltracks) {
        this.totaltracks = totaltracks;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public boolean isAlbumImgAvl() {
        return isAlbumImgAvl;
    }

    public void setAlbumImgAvl(boolean isAlbumImgAvl) {
        this.isAlbumImgAvl = isAlbumImgAvl;
    }

    public String getGenreType() {
        return genreType;
    }

    public void setGenreType(String genreType) {
        this.genreType = genreType;
    }

    @Override
    public String toString() {
        return "Album [albumId=" + albumId + ", albumName=" + albumName + ", albumImgPath=" + albumImgPath
                + ", albumArtist=" + albumArtist + ", composer=" + composer + ", year=" + year + ", totaltracks="
                + totaltracks + ", genre=" + genre + ", isAlbumImgAvl=" + isAlbumImgAvl + ", genreType=" + genreType
                + "]";
    }

}
