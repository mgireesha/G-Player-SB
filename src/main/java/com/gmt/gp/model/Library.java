package com.gmt.gp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long songId;
    private String songPath;
    private String title;
    private String artist;
    private String albumArtist;
    private String album;
    private int year;
    private String composer;
    private String lyricist;
    private boolean isLyricsAvl;
    private int trackNumber;
    private int totaltracks;
    private String label;
    private String genre;
    private long trackLength;
    private String albumArt;
    @Column(columnDefinition = "VARCHAR(10000)")
    private String lyrics;

    @Transient
    private long playlistItemId;

    public long getPlaylistItemId() {
        return playlistItemId;
    }

    public void setPlaylistItemId(long playlistItemId) {
        this.playlistItemId = playlistItemId;
    }

    public void setTrackLength(long trackLength) {
        this.trackLength = trackLength;
    }

    public long getTrackLength() {
        return trackLength;
    }

    public long getSongId() {
        return songId;
    }

    public String getSongPath() {
        return songPath;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public String getAlbumArtist() {
        return albumArtist;
    }

    public String getAlbum() {
        return album;
    }

    public int getYear() {
        return year;
    }

    public String getComposer() {
        return composer;
    }

    public String getLyricist() {
        return lyricist;
    }

    public int getTrackNumber() {
        return trackNumber;
    }

    public int getTotaltracks() {
        return totaltracks;
    }

    public String getLabel() {
        return label;
    }

    public void setSongId(long songId) {
        this.songId = songId;
    }

    public void setSongPath(String songPath) {
        this.songPath = songPath;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setAlbumArtist(String albumArtist) {
        this.albumArtist = albumArtist;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public void setLyricist(String lyricist) {
        this.lyricist = lyricist;
    }

    public void setTrackNumber(int trackNumber) {
        this.trackNumber = trackNumber;
    }

    public void setTotaltracks(int totaltracks) {
        this.totaltracks = totaltracks;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Library() {
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getAlbumArt() {
        return albumArt;
    }

    public void setAlbumArt(String albumArt) {
        this.albumArt = albumArt;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    @Override
    public String toString() {
        return "Library [songId=" + songId + ", songPath=" + songPath + ", title=" + title + ", artist=" + artist
                + ", albumArtist=" + albumArtist + ", album=" + album + ", year=" + year + ", composer=" + composer
                + ", lyricist=" + lyricist + ", trackNumber=" + trackNumber + ", totaltracks=" + totaltracks
                + ", label=" + label + ", genre=" + genre + ", trackLength=" + trackLength + ", albumArt=" + albumArt
                + ", lyrics=" + lyrics + "]";
    }

    public boolean isLyricsAvl() {
        return isLyricsAvl;
    }

    public void setLyricsAvl(boolean isLyricsAvl) {
        this.isLyricsAvl = isLyricsAvl;
    }

}
