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

import com.gmt.gp.model.AlbumArtist;
import com.gmt.gp.model.Artist;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.services.LibraryService;

@CrossOrigin(origins= {"http://localhost:3000","http://gplayer.test.com:3000"})
@RequestMapping("/library")
@RestController
public class LibraryController {
    
    //private static String MUSIC_PATH1 = "E:\\Music\\myFav1";
    //private static String MUSIC_PATH2 = "E:\\Music\\Kannada";
    private static String MUSIC_PATH3 = "E:\\Music\\AAA_Updated";

    List<File> tempFileList = new ArrayList<File>();

    @Autowired
    private LibraryService libraryService;

    @RequestMapping("/initLibraryBuild")
    public List<File> runBuild(){
        List<File> fileList = new ArrayList<File>();
        
        libraryService.truncateMyTable();

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
    public Map<String, List<Library>> getAllAlbums(){
        return libraryService.getAllAlbums();
    }

    @RequestMapping("/getAllAlbumDetails")
    public Map<String, Library> getAllAlbumdetails(){
        return libraryService.getAllAlbumdetails(null,null);
    }

    @RequestMapping("/getAllAlbumDetailsByAA/{albumArtist}")
    public Map<String, Library> getAllAlbumDetailsByAA(@PathVariable String albumArtist){
        return libraryService.getAllAlbumdetails("ALBUM_ARTIST",albumArtist);
    }

    @RequestMapping("/getAlbumImgs")
    public Map<String, String> getAlbumImgs(){
        return libraryService.getAlbumImgs();
    }

    @RequestMapping("/getAllArtistDetails")
    public List<String> getAllArtistDetails(){
        return libraryService.getAllArtistDetails();
    }

    @RequestMapping("/getAllAlbumArtistDetails")
    public List<String> getAllAlbumArtistDetails(){
        return libraryService.getAllAlbumArtistDetails();
    }

    @RequestMapping("/readAndStoreArtistnames")
    public Iterable<Artist> readAndStoreArtistnames(){
        libraryService.readAndStoreAlbumArtistnames();
        return libraryService.readAndStoreArtistnames();
    }

    @RequestMapping("/getAllArtistImgDetails")
    public Iterable<Artist> getAllArtistImgDetails(){
        return libraryService.getAllArtistImgDetails();
    }

    @RequestMapping("/getAllAlbumArtistImgDetails")
    public Iterable<AlbumArtist> getAllAlbumArtistImgDetails(){
        return libraryService.getAllAlbumArtistImgDetails();
    }

    @RequestMapping("/downloadArtistImgToDIr")
    public Map<String, List<String>> downloadArtistImgToDIr(){
        return libraryService.downloadArtistImgToDIr();
    }

    @RequestMapping("/downloadAlbumArtistImgToDIr")
    public Map<String, List<String>> downloadAlbumArtistImgToDIr(){
        return libraryService.downloadAlbumArtistImgToDIr();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateLyrics/{songId}")
    public GPResponse updateLyrics(@RequestBody String lyrics, @PathVariable String songId){
        return libraryService.updateLyrics(songId, lyrics);
    }

    



}
