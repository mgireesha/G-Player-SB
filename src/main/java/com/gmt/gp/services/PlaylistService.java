package com.gmt.gp.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.PlaylistItems;
import com.gmt.gp.repositories.PlaylistRepository;
import com.gmt.gp.util.GP_CONSTANTS;
import com.gmt.gp.util.GP_ERRORS;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private MessageService messageService;

    public GPResponse addToPlaList(PlaylistItems reqPlaylist) {
        System.out.println("reqPlaylist: " + reqPlaylist);
        GPResponse resp = new GPResponse();
        PlaylistItems playlist = null;
        List<PlaylistItems> playlists = new ArrayList<PlaylistItems>();
        try {
            if (reqPlaylist.getSongId() != 0) {
                playlist = new PlaylistItems();
                Library library = libraryService.getSongBySongId(reqPlaylist.getSongId());
                playlist.setPlaylistId(reqPlaylist.getPlaylistId());
                playlist.setPlaylist(reqPlaylist.getPlaylist());
                playlist.setSongId(library.getSongId());
                playlist.setSongPath(library.getSongPath());
                playlist = playlistRepository.save(playlist);
                playlists.add(playlist);
                resp.setStatus(GP_CONSTANTS.SUCCESS);
                resp.setPlaylists(playlists);
            } else if (reqPlaylist.getAlbumId() != 0) {
                Album album = libraryService.getAlbumByAlbumId(reqPlaylist.getAlbumId());
                List<Library> songs = libraryService.getSongsByAlbum(album.getAlbumName());
                for (Library library : songs) {
                    playlist = new PlaylistItems();
                    playlist.setPlaylistId(reqPlaylist.getPlaylistId());
                    playlist.setPlaylist(reqPlaylist.getPlaylist());
                    playlist.setSongId(library.getSongId());
                    playlist.setSongPath(library.getSongPath());
                    playlist.setAlbumName(library.getAlbum());
                    playlists.add(playlist);
                    playlists = (List<PlaylistItems>) playlistRepository.saveAll(playlists);
                }
                resp.setPlaylists(playlists);
            } else {
                resp.setStatus(GP_CONSTANTS.FAILED);
                resp.setError(GP_ERRORS.ERR_PLAYLIST_REQ_ID_NOT_FOUND);
            }
        } catch (Exception e) {
            resp.setStatus(GP_CONSTANTS.FAILED);
            e.printStackTrace();
        }
        return resp;
    }

    public List<Library> getSongsInPlaylist(long playlistId) {
        List<Long> songIds = playlistRepository.getSongIdsInPlaylist(playlistId);
        return libraryService.getSongsBySongIds(songIds);
    }

    public List<String> getAlbumNamesByPlaylistId(long playlistId) {
        return playlistRepository.getAlbumNamesByPlaylistId(playlistId);
    }

    public GPResponse deletePlaylist(long playlistId) {
        GPResponse resp = new GPResponse();
        List<PlaylistItems> playlistItems = playlistRepository.getByPlaylistId(playlistId);
        if (playlistItems != null && !playlistItems.isEmpty()) {
            playlistRepository.deleteAll(playlistItems);
        }
        messageService.removeMessageById(playlistId);
        resp.setStatus(GP_CONSTANTS.SUCCESS);
        return resp;
    }

}