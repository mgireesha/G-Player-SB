package com.gmt.gp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.model.PlaylistItems;
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
    public Map<String, Object> getPlaylistNames(@PathVariable String messageType) {
        List<Message> plNames = messageService.getMessagesByType(messageType);
        Map<Long, List<String>> plAlbums = new HashMap<Long, List<String>>();
        Map<String, Object> resp = new HashMap<String, Object>();
        resp.put("PLAYLIST_NAMES", plNames);
        for (Message message : plNames) {
            plAlbums.put(message.getMessageId(), playlistService.getAlbumNamesByPlaylistId(message.getMessageId()));
        }
        resp.put("PLAYLIST_ALBUMS", plAlbums);
        return resp;
    }

    @RequestMapping("/create-playlist")
    public Message createPlalist(@RequestBody Message message) {
        return messageService.saveMaMessage(message);
    }

    @RequestMapping(value = "/rename-playlist", method = RequestMethod.PUT)
    public GPResponse renamePlaylist(@RequestBody Message reqMessage) {
        return playlistService.renamePlaylist(reqMessage);
    }

    @RequestMapping(value = "/delete-playlist/{playlistId}", method = RequestMethod.DELETE)
    public GPResponse deletePlaylist(@PathVariable String playlistId) {
        return playlistService.deletePlaylist(Long.parseLong(playlistId));
    }

    @RequestMapping("/{playlistId}/songs")
    public List<Library> getSongsInPlaylist(@PathVariable String playlistId) {
        return playlistService.getSongsInPlaylist(Long.parseLong(playlistId));
    }

    @RequestMapping("/add-to-playlist/")
    public GPResponse addToPlaList(@RequestBody PlaylistItems reqPlaylist) {
        return playlistService.addToPlaList(reqPlaylist);
    }

}
