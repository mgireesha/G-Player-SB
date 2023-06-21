package com.gmt.gp.model;

import java.util.List;

public class GPResponse {
    private String status;
    private String error;
    private Library library;
    private GMedia gMedia;
    private Playlist playlist;
    private List<Playlist> playlists;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Library getLibrary() {
        return library;
    }

    public void setLibrary(Library library) {
        this.library = library;
    }

    public GPResponse(String status, String error, Library library) {
        this.status = status;
        this.error = error;
        this.library = library;
    }

    public GPResponse(Library library) {
        this.library = library;
    }

    public GPResponse() {
    }

    @Override
    public String toString() {
        return "GPResponse [status=" + status + ", error=" + error + ", library=" + library + "]";
    }

    public GMedia getgMedia() {
        return gMedia;
    }

    public void setgMedia(GMedia gMedia) {
        this.gMedia = gMedia;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<Playlist> playlists) {
        this.playlists = playlists;
    }

}
