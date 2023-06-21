package com.gmt.gp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.model.Playlist;
import com.gmt.gp.services.MessageService;
import com.gmt.gp.services.PlaylistService;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private MessageService messageService;

    @RequestMapping("/names/{messageType}")
    public List<Message> getPlaylistNames(@PathVariable String messageType) {
        return messageService.getMessagesByType(messageType);
    }

    @RequestMapping("/{playlist}/songs")
    public List<Library> getSongsInPlaylist(@PathVariable String playlist) {
        return playlistService.getSongsInPlaylist(playlist);
    }

    @RequestMapping("/add-to-playlist/")
    public GPResponse addToPlaList(@RequestBody Playlist reqPlaylist) {
        return playlistService.addToPlaList(reqPlaylist);
    }

}
