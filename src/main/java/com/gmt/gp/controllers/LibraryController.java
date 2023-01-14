package com.gmt.gp.controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.Artist;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.services.LibraryService;
import com.gmt.gp.services.MessageService;
import com.gmt.gp.util.GPUtil;

@RequestMapping("/library")
@RestController
public class LibraryController {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryService.class);

    private static final String BUILD_STATUS = "BUILD_STATUS";

    private static final String BUILD_STATUS_STEP = "BUILD_STATUS_STEP";

    private static final String RUNNING = "RUNNING";

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private MessageService messageService;

    @RequestMapping("/initLibraryBuild")
    public List<File> runBuild(){
        final String methodName = "runBuild";
        List<File> fileList = new ArrayList<File>();
        
        messageService.removeMessageType(BUILD_STATUS);
        messageService.updateBuildStatus(BUILD_STATUS, BUILD_STATUS, RUNNING);

        libraryService.truncateMyTable();
        LOG.info(methodName+" - Truncated all repositories.");
        messageService.updateBuildStatus(BUILD_STATUS, BUILD_STATUS_STEP, "Truncated all repositories.");
        GPUtil.ThreadSleep(1000);

        libraryService.cleanAlbumImageDir();
        LOG.info(methodName+" - Deleted all images from albums folder");
        messageService.updateBuildStatus(BUILD_STATUS, BUILD_STATUS_STEP, "Deleted all images from albums folder.");

        List<Message> mainFolderList = messageService.getAllMusicPaths();

        LOG.info(methodName+" - Started searching for audio files in : "+mainFolderList);
        fileList = libraryService.getMusicFiles(mainFolderList);
        LOG.info(methodName+" - Found "+fileList.size()+" audio files");
        messageService.updateBuildStatus(BUILD_STATUS, "FILES_TO_READ", String.valueOf(fileList.size()));

        LOG.info(methodName+" - calling build library");
        libraryService.buildLibrary(fileList);
        return fileList;
    }

    @RequestMapping("/getAllSongs")
    public List<Library> getAllSongs(){
        return libraryService.getAllSongs();
    }

    @RequestMapping("/getByAlbum/{album}")
    public List<Library> getSongsByAlbum(@PathVariable String album){
        return libraryService.getSongsByAlbum(album);
    }

    @RequestMapping("/getByYear/{year}")
    public List<Library> getSongsByYear(@PathVariable int year){
        return libraryService.getSongsByYear(year);
    }

    @RequestMapping("/getByGenre/{genre}")
    public List<Library> getSongsByGenre(@PathVariable String genre){
        return libraryService.getSongsByGenre(genre);
    }

    @RequestMapping("/getByArtist/{artist}")
    public List<Library> getSongsByArtist(@PathVariable String artist){
        return libraryService.getSongsByArtist(artist);
    }

    @RequestMapping("/getByAlbumArtist/{albumArtist}")
    public List<Library> getSongsByAlbumArtist(@PathVariable String albumArtist){
        return libraryService.getSongsByAlbumArtist(albumArtist);
    }

    @RequestMapping("/getAllAlbums")
    public Iterable<Album> getAllAlbums(){
        return libraryService.getAllAlbumsFromDb();
    }

    @RequestMapping("/getAllAlbumDetails")
    public Map<String, Library> getAllAlbumdetails(){
        return libraryService.getAllAlbumdetails(null,null);
    }

    @RequestMapping("/getAlbumByAlbumName/{albumName}")
    public Album getAlbumByAlbumName(@PathVariable String albumName){
        return libraryService.getAlbumByAlbumName(albumName);
    }

    @RequestMapping("/getAllAlbumDetailsByAA/{albumArtist}")
    public List<Album> getAllAlbumDetailsByAA(@PathVariable String albumArtist){
        return libraryService.getAlbumListOfAA(albumArtist);
    }

    @RequestMapping("/getAlbumImgs")
    public Map<String, String> getAlbumImgs(){
        return libraryService.getAlbumImgs();
    }

    @RequestMapping("/getAllArtistDetails/{type}")
    public List<Artist> getAllArtistDetails(@PathVariable String type){
        return libraryService.getAllArtistDetails(type);
    }

    @RequestMapping("/getAllAlbumArtistDetails")
    public List<String> getAllAlbumArtistDetails(){
        return libraryService.getAllAlbumArtistDetails();
    }

    @RequestMapping("/readAndStoreArtistnames/{artistType}")
    public Iterable<Artist> readAndStoreArtistnames(@PathVariable String artistType){
        return libraryService.setArtistLocalImgAvlStatus(artistType);
    }

    @RequestMapping("/downloadArtistImgToDIr")
    public Map<String, List<Artist>> downloadArtistImgToDIr(){
        return libraryService.downloadArtistImgToDIr();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateLyrics/{songId}")
    public GPResponse updateLyrics(@RequestBody String lyrics, @PathVariable String songId){
        return libraryService.updateLyrics(songId, lyrics);
    }

    @RequestMapping("/resizeArtistImgs")
    public void resizeArtistImgs(){
        libraryService.resizeArtistImgs();
    }

    @RequestMapping("/searchByKey/{searchKey}")
    public Map<String, List<Object>> searchbyKey(@PathVariable String searchKey){
        return libraryService.searchbyKey(searchKey);
    }

}
