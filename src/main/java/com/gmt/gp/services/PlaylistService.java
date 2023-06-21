package com.gmt.gp.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Playlist;
import com.gmt.gp.repositories.PlaylistRepository;
import com.gmt.gp.util.GP_CONSTANTS;
import com.gmt.gp.util.GP_ERRORS;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private LibraryService libraryService;

    public GPResponse addToPlaList(Playlist reqPlaylist) {
        GPResponse resp = new GPResponse();
        Playlist playlist = null;
        List<Playlist> playlists = new ArrayList<Playlist>();
        try {
            if (reqPlaylist.getSongId() != 0) {
                playlist = new Playlist();
                Library library = libraryService.getSongBySongId(reqPlaylist.getSongId());
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
                    playlist = new Playlist();
                    playlist.setPlaylist(reqPlaylist.getPlaylist());
                    playlist.setSongId(library.getSongId());
                    playlist.setSongPath(library.getSongPath());
                    playlists.add(playlist);
                    playlists = (List<Playlist>) playlistRepository.saveAll(playlists);
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

    public List<Library> getSongsInPlaylist(String playlist) {
        List<Long> songIds = playlistRepository.getBySongIdsInPlaylist(playlist);
        return libraryService.getSongsBySongIds(songIds);
    }

}
