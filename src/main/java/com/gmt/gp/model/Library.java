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
    private String album;
    private String artist;
    private String albumArtist;
    private String composer;
    private int year;
    private String genre;
    private String lyricist;
    private boolean isLyricsAvl;
    @Column(columnDefinition = "VARCHAR(10000)")
    private String lyrics;
    private int trackNumber;
    private int totaltracks;
    private String label;
    private long trackLength;
    private String albumArt;

    @Transient
    private long playlistItemId;

    public long getSongId() {
        return songId;
    }

    public void setSongId(long songId) {
        this.songId = songId;
    }

    public String getSongPath() {
        return songPath;
    }

    public void setSongPath(String songPath) {
        this.songPath = songPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
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

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLyricist() {
        return lyricist;
    }

    public void setLyricist(String lyricist) {
        this.lyricist = lyricist;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public boolean isLyricsAvl() {
        return isLyricsAvl;
    }

    public void setLyricsAvl(boolean isLyricsAvl) {
        this.isLyricsAvl = isLyricsAvl;
    }

    public int getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(int trackNumber) {
        this.trackNumber = trackNumber;
    }

    public int getTotaltracks() {
        return totaltracks;
    }

    public void setTotaltracks(int totaltracks) {
        this.totaltracks = totaltracks;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getTrackLength() {
        return trackLength;
    }

    public void setTrackLength(long trackLength) {
        this.trackLength = trackLength;
    }

    public String getAlbumArt() {
        return albumArt;
    }

    public void setAlbumArt(String albumArt) {
        this.albumArt = albumArt;
    }

    public long getPlaylistItemId() {
        return playlistItemId;
    }

    public void setPlaylistItemId(long playlistItemId) {
        this.playlistItemId = playlistItemId;
    }

    public Library() {

    }

    public Library(long songId, String songPath, String title, String artist, String albumArtist, String album,
            int year, String composer, String lyricist, boolean isLyricsAvl, int trackNumber, int totaltracks,
            String label, String genre, long trackLength, String albumArt, String lyrics, long playlistItemId) {
        this.songId = songId;
        this.songPath = songPath;
        this.title = title;
        this.artist = artist;
        this.albumArtist = albumArtist;
        this.album = album;
        this.year = year;
        this.composer = composer;
        this.lyricist = lyricist;
        this.isLyricsAvl = isLyricsAvl;
        this.trackNumber = trackNumber;
        this.totaltracks = totaltracks;
        this.label = label;
        this.genre = genre;
        this.trackLength = trackLength;
        this.albumArt = albumArt;
        this.lyrics = lyrics;
        this.playlistItemId = playlistItemId;
    }

    public Library copy() {
        return new Library(songId, songPath, title, artist, albumArtist, album, year, composer, lyricist,
                isLyricsAvl, trackNumber, totaltracks, label, genre, trackLength, albumArt, lyrics, playlistItemId);
    }

    @Override
    public String toString() {
        return "Library [songId=" + songId + ", songPath=" + songPath + ", title=" + title + ", album=" + album
                + ", artist=" + artist + ", albumArtist=" + albumArtist + ", composer=" + composer + ", year=" + year
                + ", genre=" + genre + ", lyricist=" + lyricist + ", isLyricsAvl=" + isLyricsAvl + ", lyrics=" + lyrics
                + ", trackNumber=" + trackNumber + ", totaltracks=" + totaltracks + ", label=" + label
                + ", trackLength=" + trackLength + ", albumArt=" + albumArt + ", playlistItemId=" + playlistItemId
                + "]";
    }

}
