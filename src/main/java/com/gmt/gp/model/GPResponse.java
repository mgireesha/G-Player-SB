package com.gmt.gp.model;

import java.util.List;

public class GPResponse {
    private String status;
    private String error;
    private Library library;
    private GPMedia gMedia;
    private PlaylistItems playlist;
    private Message message;
    private List<PlaylistItems> playlists;
    private Object response;
    private String status1;

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

    public GPMedia getgMedia() {
        return gMedia;
    }

    public void setgMedia(GPMedia gMedia) {
        this.gMedia = gMedia;
    }

    public PlaylistItems getPlaylist() {
        return playlist;
    }

    public void setPlaylist(PlaylistItems playlist) {
        this.playlist = playlist;
    }

    public List<PlaylistItems> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<PlaylistItems> playlists) {
        this.playlists = playlists;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Object getResponse() {
        return response;
    }

    public void setResponse(Object response) {
        this.response = response;
    }

    public String getStatus1() {
        return status1;
    }

    public void setStatus1(String status1) {
        this.status1 = status1;
    }

}
