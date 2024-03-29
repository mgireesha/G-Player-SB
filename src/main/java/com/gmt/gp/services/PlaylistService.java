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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.model.PlaylistItem;
import com.gmt.gp.repositories.PlaylistRepository;
import com.gmt.gp.util.GPUtil;
import com.gmt.gp.util.GP_CONSTANTS;
import com.gmt.gp.util.GP_ERRORS;

@Service
public class PlaylistService {

    private static final Logger LOG = LoggerFactory.getLogger(PlaylistItem.class);

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private HistoryService historyService;

    public List<PlaylistItem> getAllPlaylistItems() {
        return (List<PlaylistItem>) playlistRepository.findAll();
    }

    public void removeAll(List<PlaylistItem> playlistsR) {
        playlistRepository.deleteAll(playlistsR);
    }

    public void saveAll(List<PlaylistItem> playlistsU) {
        playlistRepository.saveAll(playlistsU);
    }

    public GPResponse addToPlaList(PlaylistItem reqPlaylist) {
        GPResponse resp = new GPResponse();
        PlaylistItem playlistItem = null;
        List<PlaylistItem> playlistItems = new ArrayList<PlaylistItem>();
        PlaylistItem existingPLItem = null;
        try {
            if (reqPlaylist.getSongId() != 0) {
                Library library = libraryService.getSongBySongId(reqPlaylist.getSongId());
                playlistItem = createPlaylistItemBySong(library, reqPlaylist);
                existingPLItem = playlistRepository.getByPlaylistIdAndSongPath(playlistItem.getPlaylistId(),
                        playlistItem.getSongPath());
                // playlistItem.setSongId(reqPlaylist.getSongId());
                if (existingPLItem == null) {
                    playlistItem = playlistRepository.save(playlistItem);
                    playlistItems.add(playlistItem);
                    resp.setStatus(GP_CONSTANTS.SUCCESS);
                    resp.setPlaylistItems(playlistItems);
                } else {
                    resp.setStatus(GP_CONSTANTS.FAILED);
                    resp.setPlaylistItems(playlistItems);
                    resp.setError("Track is already exists in selected playlist");
                }

            } else if (reqPlaylist.getAlbumId() != 0) {
                Album album = libraryService.getAlbumByAlbumId(reqPlaylist.getAlbumId());
                List<Library> songs = libraryService.getSongsByAlbum(album.getAlbumName());
                // for (Library library : songs) {
                // playlistItem = createPlaylistItemBySong(library, reqPlaylist);
                // playlistItem.setAlbumId(reqPlaylist.getAlbumId());
                // playlistItems.add(playlistItem);
                // playlistItems = (List<PlaylistItem>)
                // playlistRepository.saveAll(playlistItems);
                // }
                playlistItems = (List<PlaylistItem>) addSongsToPlaylist(songs,
                        new Message(reqPlaylist.getPlaylistId(), null, null, reqPlaylist.getPlaylist()));
                resp.setPlaylistItems(playlistItems);
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
        List<PlaylistItem> playlistItems = playlistRepository.getByPlaylistId(playlistId);
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
            List<PlaylistItem> playlistItems = playlistRepository.getByPlaylistId(reqMessage.getMessageId());
            for (PlaylistItem playlistItem : playlistItems) {
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
            List<PlaylistItem> playlistItems = playlistRepository.getByPlaylistIdAndSongId(playlistId, songId);
            if (playlistItems != null && playlistItems.size() > 0) {
                PlaylistItem playlistItem = playlistItems.get(0);
                playlistRepository.delete(playlistItem);
                resp.setPlaylistItem(playlistItem);
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
        Map<String, List<PlaylistItem>> plItemsMap = new HashMap<String, List<PlaylistItem>>();
        List<PlaylistItem> plItems = getAllPlaylistItems();
        List<PlaylistItem> tempPlItems = null;
        String plItemIdentifier = null;
        for (PlaylistItem plItem : plItems) {
            plItemIdentifier = plItem.getPlaylistId() + plItem.getPlaylist();
            if (plItemsMap.containsKey(plItemIdentifier)) {
                tempPlItems = plItemsMap.get(plItemIdentifier);
                tempPlItems.add(plItem);
            } else {
                tempPlItems = new ArrayList<PlaylistItem>();
                tempPlItems.add(plItem);
            }
            plItemsMap.put(plItemIdentifier, tempPlItems);
        }
        resp.setResponse(plItemsMap);
        resp.setStatus1(GP_CONSTANTS.GP_PLAYLIST_PATH);
        boolean isDirExists = GPUtil
                .checkAndCreateFolders(GP_CONSTANTS.GP_PLAYLIST_PATH);
        for (String plItemsMapKey : plItemsMap.keySet()) {
            tempPlItems = plItemsMap.get(plItemsMapKey);
            if (isDirExists && tempPlItems.size() > 0) {
                writeSongPathToCSV(tempPlItems);
                writePlItemToGPFIle(tempPlItems);
            }
        }
        return resp;
    }

    private void writePlItemToGPFIle(List<PlaylistItem> plItems) {
        final String methodName = "writePlItemToGPFIle";
        try {
            boolean isGpDirExists = GPUtil.checkAndCreateFolders(GP_CONSTANTS.GP_PLAYLIST_PATH_GP);
            if (!isGpDirExists) {
                LOG.error(methodName + ", exiting, directory: " + GP_CONSTANTS.GP_PLAYLIST_PATH_GP + " doesn't esists");
                return;
            }
            File gpFile = new File(GP_CONSTANTS.GP_PLAYLIST_PATH_GP + plItems.get(0).getPlaylist() + ".gp");
            FileWriter gpFileWriter = new FileWriter(gpFile);
            for (PlaylistItem plItem : plItems) {
                gpFileWriter.append(plItem.getSongTitle())
                        .append(",")
                        .append(plItem.getAlbumName())
                        .append(",")
                        .append(plItem.getSongPath())
                        .append(System.lineSeparator());
            }
            gpFileWriter.close();
            gpFileWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void writeSongPathToCSV(List<PlaylistItem> plItems) {
        final String methodName = "writeSongPathToCSV";
        try {
            boolean isCSVDirExists = GPUtil.checkAndCreateFolders(GP_CONSTANTS.GP_PLAYLIST_PATH_CSV);
            if (!isCSVDirExists) {
                LOG.error(
                        methodName + ", exiting, directory: " + GP_CONSTANTS.GP_PLAYLIST_PATH_CSV + " doesn't esists");
                return;
            }
            File songPathCSVFile = new File(GP_CONSTANTS.GP_PLAYLIST_PATH_CSV + plItems.get(0).getPlaylist() + ".csv");
            FileWriter songPathCSVFileWriter = new FileWriter(songPathCSVFile);
            for (PlaylistItem plItem : plItems) {
                songPathCSVFileWriter.append(plItem.getSongPath())
                        .append(System.lineSeparator());
            }
            songPathCSVFileWriter.close();
            songPathCSVFileWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public GPResponse importPlaylists(String payload, String fileType) {
        GPResponse resp = new GPResponse();
        JSONObject reqPlaylistsObj = new JSONObject(payload);
        Set<String> reqPlaylistObjKeys = reqPlaylistsObj.keySet();
        JSONArray reqPlaylistArr = null;
        List<Library> songs = null;
        List<String> songPathList = null;
        Message playlistName = null;
        JSONObject reqPlaylistItemObj = null;
        Library reqPlaylistLibrary = null;
        List<Library> reqPlaylistLibraryList = null;
        for (String reqPlName : reqPlaylistObjKeys) {
            playlistName = messageService.getMessageByValue(reqPlName);
            if (playlistName == null) {
                playlistName = new Message(GP_CONSTANTS.PLAYLIST, GP_CONSTANTS.PLAYLIST, reqPlName);
                playlistName = messageService.saveMaMessage(playlistName);
            }
            reqPlaylistArr = (JSONArray) reqPlaylistsObj.get(reqPlName);
            if (GP_CONSTANTS.FILETYPE_CSV.equals(fileType)) {
                songPathList = new ArrayList<String>();
                for (int i = 0; i < reqPlaylistArr.length(); i++) {
                    songPathList.add(reqPlaylistArr.getString(i));
                }
                songs = libraryService.getSongsBySongPath(songPathList);
            } else if (GP_CONSTANTS.FILETYPE_GP.equals(fileType)) {
                reqPlaylistLibraryList = new ArrayList<Library>();
                for (int i = 0; i < reqPlaylistArr.length(); i++) {
                    reqPlaylistItemObj = reqPlaylistArr.getJSONObject(i);
                    reqPlaylistLibrary = new Library();
                    reqPlaylistLibrary.setAlbum(reqPlaylistItemObj.getString("album"));
                    reqPlaylistLibrary.setTitle(reqPlaylistItemObj.getString("title"));
                    reqPlaylistLibrary.setSongPath(reqPlaylistItemObj.getString("songPath"));
                    reqPlaylistLibraryList.add(reqPlaylistLibrary);
                }
                songs = libraryService.getSongsByAlbumAndTitle(reqPlaylistLibraryList);
            }

            addSongsToPlaylist(songs, playlistName);
        }
        resp.setResponse(getPlaylistNames(GP_CONSTANTS.PLAYLIST));
        resp.setStatus1(String.valueOf(reqPlaylistObjKeys.size()));
        return resp;
    }

    private PlaylistItem createPlaylistItemBySong(Library song, Message playlistName) {
        PlaylistItem playlistItem = new PlaylistItem();
        playlistItem.setPlaylistId(playlistName.getMessageId());
        playlistItem.setPlaylist(playlistName.getValue());
        playlistItem.setSongId(song.getSongId());
        playlistItem.setSongPath(song.getSongPath());
        playlistItem.setAlbumName(song.getAlbum());
        playlistItem.setSongTitle(song.getTitle());
        return playlistItem;
    }

    private PlaylistItem createPlaylistItemBySong(Library library, PlaylistItem reqPlaylist) {
        return createPlaylistItemBySong(library,
                new Message(reqPlaylist.getPlaylistId(), null, null, reqPlaylist.getPlaylist()));
    }

    private Iterable<PlaylistItem> addSongsToPlaylist(List<Library> songs, Message playlistName) {
        List<PlaylistItem> playlistItems = new ArrayList<PlaylistItem>();
        List<PlaylistItem> existingPlaylistItems = playlistRepository.getByPlaylistId(playlistName.getMessageId());
        boolean isSongPresentInPL = false;
        for (Library song : songs) {
            isSongPresentInPL = existingPlaylistItems.stream().filter(o -> o.getSongPath().equals(song.getSongPath()))
                    .findFirst().isPresent();
            if (!isSongPresentInPL) {
                playlistItems.add(createPlaylistItemBySong(song, playlistName));
            }
        }
        return playlistRepository.saveAll(playlistItems);
    }
}
