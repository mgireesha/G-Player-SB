package com.gmt.gp.controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins= {"http://localhost:3000","http://gplayer.test.com:3000"})
@RequestMapping("/library")
@RestController
public class LibraryController {
    
    //private static String MUSIC_PATH1 = "E:\\Music\\myFav1";
    //private static String MUSIC_PATH2 = "E:\\Music\\Kannada";
    private static String MUSIC_PATH3 = "E:\\Music\\AAA_Updated\\";

    List<File> tempFileList = new ArrayList<File>();

    @Autowired
    private LibraryService libraryService;

    @RequestMapping("/initLibraryBuild")
    public List<File> runBuild(){
        List<File> fileList = new ArrayList<File>();
        
        libraryService.truncateMyTable();
        libraryService.cleanAlbumImageDir();

        List<String> mainFolderList = new ArrayList<String>();
        //mainFolderList.add(MUSIC_PATH1);
        //mainFolderList.add(MUSIC_PATH2);
        mainFolderList.add(MUSIC_PATH3);

        fileList = libraryService.getMusicFiles(mainFolderList);
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

    @RequestMapping(method = RequestMethod.POST , value = "/saveMusicPath")
    public void saveMusicPath(@RequestBody Message message){
        libraryService.saveMusicPath(message);
    }



}
