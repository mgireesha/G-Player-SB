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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.Artist;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.services.LibraryService;
import com.gmt.gp.services.MessageService;
import com.gmt.gp.util.GP_CONSTANTS;

@RequestMapping("/library")
@RestController
public class LibraryController {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryService.class);

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private MessageService messageService;

    @RequestMapping("/initLibraryBuild")
    public GPResponse runBuild() {
        final String methodName = "runBuild";
        GPResponse resp = new GPResponse();
        List<File> fileList = new ArrayList<File>();

        boolean isImgDirExists = libraryService.checkAndCreateUserImageFolders();
        if (!isImgDirExists) {
            resp = new GPResponse(GP_CONSTANTS.FAILED, "Failed to create / featch user image folders");
            messageService.updateBuildStatus(GP_CONSTANTS.BUILD_STATUS, GP_CONSTANTS.BUILD_STATUS, GP_CONSTANTS.FAILED);
            return resp;
        }

        messageService.removeMessageType(GP_CONSTANTS.BUILD_STATUS);
        // messageService.removeMessageName(GP_CONSTANTS.LAST_PLAYED_SONG_ID);
        messageService.updateBuildStatus(GP_CONSTANTS.BUILD_STATUS, GP_CONSTANTS.BUILD_STATUS, GP_CONSTANTS.RUNNING);

        List<String> mainFolderList = messageService.getAllMusicPaths();

        LOG.info(methodName + " - Started searching for audio files in : " + mainFolderList);
        fileList = libraryService.getMusicFiles(mainFolderList);
        LOG.info(methodName + " - Found " + fileList.size() + " audio files");
        messageService.updateBuildStatus(GP_CONSTANTS.BUILD_STATUS, "FILES_TO_READ", String.valueOf(fileList.size()));

        libraryService.cleanAlbumImageDir();
        LOG.info(methodName + " - Deleted all images from albums folder");
        messageService.updateBuildStatus(GP_CONSTANTS.BUILD_STATUS, GP_CONSTANTS.BUILD_STATUS_STEP,
                "Deleted all images from albums folder.");

        LOG.info(methodName + " - calling build library");
        libraryService.buildLibrary(fileList);
        return resp;
    }

    @RequestMapping("/getAllSongs")
    public Map<String, Object> getAllSongs() {
        return libraryService.getAllSongs();
    }

    @RequestMapping("/getAllSongIds")
    public List<Long> getAllSongIds() {
        return libraryService.getAllSongIds();
    }

    @RequestMapping("/getByAlbum/{album}")
    public List<Library> getSongsByAlbum(@PathVariable String album) {
        return libraryService.getSongsByAlbum(album);
    }

    @RequestMapping("/getByAlbum/{album}/{language}")
    public List<Library> getSongsByAlbumAndLanguage(@PathVariable String album, @PathVariable String language) {
        return libraryService.getSongsByAlbumAndLanguage(album, language);
    }

    @RequestMapping("/getByYear/{year}")
    public List<Library> getSongsByYear(@PathVariable int year) {
        return libraryService.getSongsByYear(year);
    }

    @RequestMapping("/getByGenre/{genre}")
    public List<Library> getSongsByGenre(@PathVariable String genre) {
        return libraryService.getSongsByGenre(genre);
    }

    @RequestMapping("/getByLanguage/{language}")
    public List<Library> getSongsByLanguage(@PathVariable String language) {
        return libraryService.getSongsByLanguage(language);
    }

    @RequestMapping("/getByArtist/{artist}")
    public List<Library> getSongsByArtist(@PathVariable String artist) {
        return libraryService.getSongsByArtist(artist);
    }

    @RequestMapping("/getByAlbumArtist/{albumArtist}")
    public List<Library> getSongsByAlbumArtist(@PathVariable String albumArtist) {
        return libraryService.getSongsByAlbumArtist(albumArtist);
    }

    @RequestMapping("/getAllAlbums")
    public Iterable<Album> getAllAlbums() {
        return libraryService.getAllAlbumsFromDb();
    }

    @RequestMapping("/getAllAlbumDetails")
    public Map<String, Library> getAllAlbumdetails() {
        return libraryService.getAllAlbumdetails(null, null);
    }

    @RequestMapping("/getAlbumByAlbumName/{albumName}")
    public Album getAlbumByAlbumName(@PathVariable String albumName) {
        return libraryService.getAlbumByAlbumName(albumName);
    }

    @RequestMapping("/getAllAlbumDetailsByAA/{albumArtist}")
    public List<Album> getAllAlbumDetailsByAA(@PathVariable String albumArtist) {
        return libraryService.getAlbumListOfAA(albumArtist);
    }

    @RequestMapping("/getAlbumImgs")
    public Map<String, String> getAlbumImgs() {
        return libraryService.getAlbumImgs();
    }

    @RequestMapping("/getAllArtistDetails/{type}")
    public List<Artist> getAllArtistDetails(@PathVariable String type) {
        return libraryService.getAllArtistDetails(type);
    }

    @RequestMapping("/getAllAlbumArtistDetails")
    public List<String> getAllAlbumArtistDetails() {
        return libraryService.getAllAlbumArtistDetails();
    }

    @RequestMapping("/readAndStoreArtistnames/{artistType}") // Not used currently
    public Iterable<Artist> readAndStoreArtistnames(@PathVariable String artistType) {
        return libraryService.setArtistLocalImgAvlStatusList(artistType, null);
    }

    @RequestMapping("/downloadArtistImgToDIr")
    public Map<String, List<Artist>> downloadArtistImgToDIr() {
        return libraryService.downloadArtistImgToDIr();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateLyrics/{songId}")
    public GPResponse updateLyrics(@RequestBody String lyrics, @PathVariable String songId) {
        return libraryService.updateLyrics(songId, lyrics);
    }

    @RequestMapping("/resizeArtistImgs")
    public void resizeArtistImgs() {
        libraryService.resizeArtistImgs();
    }

    @RequestMapping("/search/key/{searchKey}")
    public Map<String, List<Object>> searchbyKey(@PathVariable String searchKey) {
        return libraryService.searchbyKey(searchKey);
    }

    @RequestMapping("/genre-details")
    public Map<String, Object> getGenreDetails() {
        return libraryService.getGenreDetails();
    }

    @RequestMapping("/language-details")
    public Map<String, Object> getLanguageDetails() {
        return libraryService.getLanguageDetails();
    }

    // @RequestMapping(method = RequestMethod.PUT, value =
    // "/upload-artist-image/{artistId}", consumes =
    // MediaType.MULTIPART_FORM_DATA_VALUE)
    // public String uploadArtistImg(@RequestParam String name, @RequestPart
    // MultipartFile file,
    // @PathVariable String artistId) {
    // System.out.println(name);
    // return name;
    // }

    @RequestMapping(method = RequestMethod.PUT, value = "/upload-artist-image/{artistId}")
    public GPResponse uploadArtistImg(@RequestBody String imageB64, @PathVariable String artistId) {
        return libraryService.uploadArtistImg(imageB64, Long.parseLong(artistId));
    }

    // temporary apis
    @RequestMapping(method = RequestMethod.GET, value = "/update-mp3-files/{field}")
    public GPResponse updateMp3Files(@RequestParam String path, @RequestParam String value,
            @PathVariable String field) {
        return libraryService.updateMp3Files(path, field, value);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/edit-track-info/{type}")
    public GPResponse updateTrackInfo(@RequestBody Library reqLibrary, @PathVariable String type) {
        return libraryService.updateTrackInfo(reqLibrary, type);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/edit-album-info")
    public GPResponse updateAlbumInfo(@RequestBody Album reqAlbum) {
        return libraryService.updateAlbumInfo(reqAlbum);
    }

}
