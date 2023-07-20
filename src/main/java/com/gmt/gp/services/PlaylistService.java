package com.gmt.gp.services;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.model.PlaylistItems;
import com.gmt.gp.repositories.PlaylistRepository;
import com.gmt.gp.util.GPUtil;
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

    @Autowired
    private HistoryService historyService;

    public List<PlaylistItems> getAllPlaylistItems() {
        return (List<PlaylistItems>) playlistRepository.findAll();
    }

    public void removeAll(List<PlaylistItems> playlistsR) {
        playlistRepository.deleteAll(playlistsR);
    }

    public void saveAll(List<PlaylistItems> playlistsU) {
        playlistRepository.saveAll(playlistsU);
    }

    public GPResponse addToPlaList(PlaylistItems reqPlaylist) {
        GPResponse resp = new GPResponse();
        PlaylistItems playlistItem = null;
        List<PlaylistItems> playlists = new ArrayList<PlaylistItems>();
        try {
            if (reqPlaylist.getSongId() != 0) {
                playlistItem = new PlaylistItems();
                Library library = libraryService.getSongBySongId(reqPlaylist.getSongId());
                playlistItem.setPlaylistId(reqPlaylist.getPlaylistId());
                playlistItem.setPlaylist(reqPlaylist.getPlaylist());
                playlistItem.setSongId(library.getSongId());
                playlistItem.setSongPath(library.getSongPath());
                playlistItem.setAlbumName(library.getAlbum());
                playlistItem = playlistRepository.save(playlistItem);
                playlists.add(playlistItem);
                resp.setStatus(GP_CONSTANTS.SUCCESS);
                resp.setPlaylists(playlists);
            } else if (reqPlaylist.getAlbumId() != 0) {
                Album album = libraryService.getAlbumByAlbumId(reqPlaylist.getAlbumId());
                List<Library> songs = libraryService.getSongsByAlbum(album.getAlbumName());
                for (Library library : songs) {
                    playlistItem = new PlaylistItems();
                    playlistItem.setPlaylistId(reqPlaylist.getPlaylistId());
                    playlistItem.setPlaylist(reqPlaylist.getPlaylist());
                    playlistItem.setSongId(library.getSongId());
                    playlistItem.setSongPath(library.getSongPath());
                    playlistItem.setAlbumName(library.getAlbum());
                    playlistItem.setAlbumId(reqPlaylist.getAlbumId());
                    playlists.add(playlistItem);
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
        List<Library> songs = libraryService.findAllByIds(songIds);
        List<Library> songsInPlaylist = new ArrayList<Library>();
        for (long songId : songIds) {
            songsInPlaylist.add(songs.stream().filter(o -> (o.getSongId() == songId)).findFirst().orElse(null));
        }
        Collections.sort(songsInPlaylist, (o1, o2) -> (o1.getTitle().compareTo(o2.getTitle())));

        return songsInPlaylist;
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

    public GPResponse renamePlaylist(Message reqMessage) {
        GPResponse resp = new GPResponse();
        try {
            Message playlistName = messageService.getMessageBYId(reqMessage.getMessageId());
            playlistName.setValue(reqMessage.getValue());
            playlistName = messageService.saveMaMessage(playlistName);
            List<PlaylistItems> playlistItems = playlistRepository.getByPlaylistId(reqMessage.getMessageId());
            for (PlaylistItems playlistItem : playlistItems) {
                playlistItem.setPlaylist(reqMessage.getValue());
            }
            playlistRepository.saveAll(playlistItems);
            resp.setMessage(playlistName);
            resp.setStatus(GP_CONSTANTS.SUCCESS);
        } catch (Exception e) {
            resp.setStatus(GP_CONSTANTS.FAILED);
            resp.setError(e.getMessage());
            e.printStackTrace();
        }
        return resp;
    }

    public GPResponse removeFromPlaylist(long playlistId, long songId) {
        GPResponse resp = new GPResponse();
        try {
            System.out.println("playlistId: " + playlistId + ",  songId: " + songId);
            List<PlaylistItems> playlistItems = playlistRepository.getByPlaylistIdAndSongId(playlistId, songId);
            if (playlistItems != null && playlistItems.size() > 0) {
                PlaylistItems playlistItem = playlistItems.get(0);
                playlistRepository.delete(playlistItem);
                resp.setPlaylist(playlistItem);
                resp.setStatus(GP_CONSTANTS.SUCCESS);
            }
        } catch (Exception e) {
            resp.setError(e.getMessage());
            resp.setStatus(GP_CONSTANTS.FAILED);
        }
        return resp;
    }

    public Map<String, Object> getPlaylistNames(String messageType) {
        List<Message> plNames = messageService.getMessagesByType(messageType);
        Map<Long, List<String>> plAlbums = new HashMap<Long, List<String>>();
        List<String> plAlbumList = null;
        List<String> tempPlAlbumList = new ArrayList<String>();
        String albumName = null;
        List<Map<String, Object>> hisAlbumList = null;
        Map<String, Object> resp = new HashMap<String, Object>();
        Map<Long, Integer> playlistSongsCount = new HashMap<Long, Integer>();
        resp.put(GP_CONSTANTS.PLAYLIST_NAMES, plNames);
        for (Message message : plNames) {
            tempPlAlbumList = getAlbumNamesByPlaylistId(message.getMessageId());
            hisAlbumList = historyService.getAlbumsGroupedFromHistoryJDBC(0, "count");
            int counter = 0;
            plAlbumList = new ArrayList<String>();
            if (tempPlAlbumList.size() <= GP_CONSTANTS.GROUPED_ALBUM_COUNT_4) {
                plAlbumList.addAll(tempPlAlbumList);
            } else {
                for (int i = 0; i < hisAlbumList.size(); i++) {
                    albumName = (String) hisAlbumList.get(i).get("albumName");
                    if (tempPlAlbumList.contains(albumName)) {
                        counter++;
                        plAlbumList.add(albumName);
                    }
                    if (counter == 3) {
                        counter = 0;
                        break;
                    }
                }
                if (plAlbumList.size() < 4 && tempPlAlbumList.size() >= 4) {
                    for (String albumName1 : tempPlAlbumList) {
                        if (!plAlbumList.contains(albumName1)) {
                            plAlbumList.add(albumName1);
                            if (plAlbumList.size() == 4) {
                                break;
                            }
                        }
                    }
                }
            }
            plAlbums.put(message.getMessageId(), plAlbumList);
            playlistSongsCount.put(message.getMessageId(), getSongsInPlaylist(message.getMessageId()).size());
        }
        resp.put(GP_CONSTANTS.PLAYLIST_ALBUMS, plAlbums);
        resp.put(GP_CONSTANTS.PLAYLIST_SONGS_COUNT, playlistSongsCount);
        return resp;
    }

    public GPResponse exportPlaylists() {
        GPResponse resp = new GPResponse();
        Map<String, List<PlaylistItems>> plItemsMap = new HashMap<String, List<PlaylistItems>>();
        List<PlaylistItems> plItems = getAllPlaylistItems();
        List<PlaylistItems> tempPlItems = null;
        String plItemIdentifier = null;
        for (PlaylistItems plItem : plItems) {
            plItemIdentifier = plItem.getPlaylistId() + plItem.getPlaylist();
            if (plItemsMap.containsKey(plItemIdentifier)) {
                tempPlItems = plItemsMap.get(plItemIdentifier);
                tempPlItems.add(plItem);
            } else {
                tempPlItems = new ArrayList<PlaylistItems>();
                tempPlItems.add(plItem);
            }
            plItemsMap.put(plItemIdentifier, tempPlItems);
        }
        resp.setResponse(plItemsMap);
        resp.setStatus1(GP_CONSTANTS.GP_PLAYLIST_PATH);
        FileWriter fileWriter = null;
        File file = null;
        boolean isDirExists = GPUtil
                .checkAndCreateFolders(GP_CONSTANTS.GP_PLAYLIST_PATH);
        for (String plItemsMapKey : plItemsMap.keySet()) {
            tempPlItems = plItemsMap.get(plItemsMapKey);
            try {
                if (isDirExists && tempPlItems.size() > 0) {
                    file = new File(GP_CONSTANTS.GP_PLAYLIST_PATH + tempPlItems.get(0).getPlaylist() + ".csv");

                    fileWriter = new FileWriter(file);
                    for (PlaylistItems plItem : tempPlItems) {
                        fileWriter.append(plItem.getSongPath()).append(System.lineSeparator());
                    }
                    fileWriter.close();
                    fileWriter.flush();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return resp;
    }

    public GPResponse importPlaylists(String payload) {
        GPResponse resp = new GPResponse();
        JSONObject reqPlaylistsObj = new JSONObject(payload);
        Set<String> reqPlaylistObjKeys = reqPlaylistsObj.keySet();
        JSONArray reqPlaylistArr = null;
        List<Library> songs = null;
        List<String> songPathList = null;
        Message playlistName = null;
        for (String reqPlName : reqPlaylistObjKeys) {
            playlistName = messageService.getMessageByValue(reqPlName);
            if (playlistName == null) {
                playlistName = new Message(GP_CONSTANTS.PLAYLIST, GP_CONSTANTS.PLAYLIST, reqPlName);
                playlistName = messageService.saveMaMessage(playlistName);
            }
            reqPlaylistArr = (JSONArray) reqPlaylistsObj.get(reqPlName);
            songPathList = new ArrayList<String>();
            for (int i = 0; i < reqPlaylistArr.length(); i++) {
                songPathList.add(reqPlaylistArr.getString(i));
            }
            songs = libraryService.getSongsBySongPath(songPathList);
            addSongsToPlaylist(songs, playlistName);
        }
        resp.setResponse(getPlaylistNames(GP_CONSTANTS.PLAYLIST));
        resp.setStatus1(String.valueOf(reqPlaylistObjKeys.size()));
        return resp;
    }

    private PlaylistItems createPlaylistItemBySong(Library song, Message playlistName) {
        PlaylistItems playlistItem = new PlaylistItems();
        playlistItem.setPlaylistId(playlistName.getMessageId());
        playlistItem.setPlaylist(playlistName.getValue());
        playlistItem.setSongId(song.getSongId());
        playlistItem.setSongPath(song.getSongPath());
        playlistItem.setAlbumName(song.getAlbum());
        return playlistItem;
    }

    private Iterable<PlaylistItems> addSongsToPlaylist(List<Library> songs, Message playlistName) {
        List<PlaylistItems> playlistItems = new ArrayList<PlaylistItems>();
        for (Library song : songs) {
            playlistItems.add(createPlaylistItemBySong(song, playlistName));
        }
        return playlistRepository.saveAll(playlistItems);
    }
}
