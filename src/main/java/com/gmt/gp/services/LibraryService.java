package com.gmt.gp.services;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.URL;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;

import org.apache.commons.io.FileUtils;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.datatype.Artwork;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.gmt.gp.model.Album;
import com.gmt.gp.model.Artist;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.model.Message;
import com.gmt.gp.repositories.AlbumRepository;
import com.gmt.gp.repositories.ArtistRepository;
import com.gmt.gp.repositories.LibraryRepository;

import java.awt.image.BufferedImage;
import java.awt.Image;

@Service
public class LibraryService {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryService.class);

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    private static final String ARTIST = "ARTIST";

    private static final String ALBUM_ARTIST = "ALBUM_ARTIST";

    private static final String ALBUM_IMAGES_PATH = "D:\\SWorkspace\\G-Player-SB\\src\\main\\resources\\public\\images\\albums\\";

    private static final String ARTIST_IMAGES_PATH = "D:\\SWorkspace\\G-Player-SB\\src\\main\\resources\\public\\images\\artists\\";

    private static final String TRACK_LIST = "TRACK_LIST";

    private static final String ALBUM_ARTISTS = "ALBUM_ARTISTS";

    private static final String ARTISTS = "ARTISTS";

    private static final String ALBUMS = "ALBUMS";

    static FileFilter mp3filter = new FileFilter() {
        @Override 
          public boolean accept(File file)
        {
            if (file.getName().endsWith(".mp3")
                || file.getName().endsWith(".m4a")) {
                return true;
            }
            return false;
        }
    };

    @Transactional
    public void truncateMyTable() {
        try {
            libraryRepository.truncateMyTable();
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            albumRepository.truncateMyTable();
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            artistRepository.truncateMyTable();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // try {
        //     albumArtistRepository.truncateMyTable();
        // } catch (Exception e) {
        //     e.printStackTrace();
        // }
    }

    public List<File> getMusicFiles(List<Message> mainFolderList) {
        List<File> tempFileList = new ArrayList<File>();
        List<File> fileList = new ArrayList<File>();
        FileFilter folderFilter = new FileFilter() {
            public boolean accept(File file) {
                return file.isDirectory();
            }
        };
        File[] folders = null;
        for (Message mainFolder : mainFolderList) {
            File musicDir = new File(mainFolder.getValue());
            fileList.addAll(Arrays.asList(musicDir.listFiles(mp3filter)));
            folders = musicDir.listFiles(folderFilter);
            fileList.addAll(recursiveSearch(folders, 0, 0, tempFileList));
        }
        return fileList;
    }

    public List<File> recursiveSearch(File[] folders, int index, int level, List<File> tempFileList) {
        // terminate condition
        if (index == folders.length)
            return tempFileList;

        // for files
        if (folders[index].isFile()) {
            if(folders[index].getName().endsWith(".mp3") || folders[index].getName().endsWith(".m4a")){
                tempFileList.add(folders[index]);
            }
            
        }
        // for sub-directories
        else if (folders[index].isDirectory()) {
            recursiveSearch(folders[index].listFiles(), 0, level + 1, tempFileList);
        }

        // recursion for main directory
        recursiveSearch(folders, ++index, level, tempFileList);
        return tempFileList;
    }
   

    public void buildLibrary(List<File> fileList) {
        AudioFile audioF = null;
        Library library = null;
        Album album = null;
        byte[] albumImg = null;
        Tag tag = null;
        Artist artist = null;
        Artist albumArtist = null;
        List<Artist> artistList = new ArrayList<Artist>();
        List<Library> libList = new ArrayList<Library>();
        List<Album> albumList = new ArrayList<Album>();
        Map<String, Integer> artistArtCount = new HashMap<String, Integer>();
        Map<String, Integer> albumArtistArtCount = new HashMap<String, Integer>();
        String artistName = null;
        int artCount = 0;
        String[] artistNameArr = null;
        int exceptionCounter = 0;
        long startingTime = System.currentTimeMillis();
        try {
            for (File file : fileList) {
                try {
                    try {
                        audioF = AudioFileIO.read(file);
                        tag = audioF.getTag();
                        library = getLibraryFromFile(tag, audioF);
                        library.setSongPath(file.getAbsolutePath());
                        libList.add(library);
                        if (library.getArtist() != null) {
                            artistName = library.getArtist().trim();
                            if (library.getArtist().contains(",") || library.getArtist().contains(";")
                                    || library.getArtist().contains("&")) {
                                artistName = artistName.replaceAll("[;&]", ",");
                                artistNameArr = artistName.split(",");
                                for (String artistName1 : artistNameArr) {
                                    if(artistName1!=null)artistName1=artistName1.trim();
                                    if (artistArtCount.get(artistName1) != null) {
                                        artistArtCount.put(artistName1, artistArtCount.get(artistName1) + 1);
                                    } else {
                                        artistArtCount.put(artistName1, 1);
                                    }
                                }
                            } else {
                                if (artistArtCount.get(artistName) != null) {
                                    artistArtCount.put(artistName, artistArtCount.get(artistName) + 1);
                                } else {
                                    artistArtCount.put(artistName, 1);
                                }
                            }
                        }
                        System.out.println("artistArtCount: "+artistArtCount);
                    } catch (Exception e) {
                        System.out.println("exceptionCount: "+ ++exceptionCounter);
                        e.printStackTrace();
                    }
                    
                    if(!containsName(albumList, library.getAlbum())){
                        albumImg = getAlbumImgBinFromTag(tag);
                        //System.out.println("getAlbumImgBinFromTag(tag): "+getAlbumImgBinFromTag(tag));
                        if(albumImg!=null){
                            album = new Album();
                            album.setAlbumImgAvl(true);
                            album.setAlbumName(library.getAlbum());
                            album.setAlbumArtist(library.getAlbumArtist());
                            album.setComposer(library.getComposer());
                            album.setGenre(library.getGenre());
                            album.setTotaltracks(library.getTotaltracks());
                            album.setYear(library.getYear());
                            album = writeByteArryaTOimgFile(album, albumImg);
                            albumList.add(album);
                            if(album.getAlbumArtist()!=null){
                                artistName = album.getAlbumArtist().trim();
                                if(albumArtistArtCount.get(artistName)!=null){
                                    albumArtistArtCount.put(artistName, albumArtistArtCount.get(artistName)+1);
                                }else{
                                    albumArtistArtCount.put(artistName, 1);
                                }
                            }
                        }else{
                            // Logic to include albums without image
                        }
                    }

                } catch (Exception e) {
                    System.out.println("exceptionCount: "+ ++exceptionCounter);
                    e.printStackTrace();
                }
            }
            long endingTime = System.currentTimeMillis();
            LOG.info("Time took to read mp3 metadata: "+ (endingTime-startingTime) +" ms, "+(endingTime-startingTime)/1000+" secs");
            
            startingTime = System.currentTimeMillis();
            libraryRepository.saveAll(libList);
            albumRepository.saveAll(albumList);
            endingTime = System.currentTimeMillis();
            LOG.info("Time took to save library and album list: "+ (endingTime-startingTime) +" ms, "+(endingTime-startingTime)/1000+" secs");

            startingTime = System.currentTimeMillis();
            List<String> artistNameList = new ArrayList<String>(artistArtCount.keySet());//getFilteredArtistDetailsFromDb(ARTIST);
            for(String artistName2 : artistNameList){
                artCount = artistArtCount.get(artistName2)!=null?artistArtCount.get(artistName2):0;
                artist = new Artist();
                artist.setArtistName(artistName2);
                artist.setType(ARTIST);
                artist.setImgAvl(false);
                artist.setCount(artCount);
                artistList.add(artist);
            }
            List<String> albumArtistNameList = new ArrayList<String>(albumArtistArtCount.keySet());//getFilteredArtistDetailsFromDb(ALBUM_ARTIST);
            for(String albumArtistName : albumArtistNameList){
                artCount = albumArtistArtCount.get(albumArtistName)!=null?albumArtistArtCount.get(albumArtistName):0;
                albumArtist = new Artist();
                albumArtist.setArtistName(albumArtistName);
                albumArtist.setType(ALBUM_ARTIST);
                albumArtist.setImgAvl(false);
                albumArtist.setCount(artCount);
                artistList.add(albumArtist);
            }
            artistRepository.saveAll(artistList);

            setArtistLocalImgAvlStatus(ARTIST);
            setArtistLocalImgAvlStatus(ALBUM_ARTIST);

            endingTime = System.currentTimeMillis();
            LOG.info("Time took to filter, save and update imgAvl of artist and album artist: "+ (endingTime-startingTime) +" ms, "+(endingTime-startingTime)/1000+" secs");

        } catch (Exception e) {
            System.out.println("exceptionCount: "+ ++exceptionCounter);
            e.printStackTrace();
        }
        System.out.println("exceptionCount: "+ exceptionCounter);
    }

    public Library getLibraryFromFile(Tag tag, AudioFile audioF) throws Exception{
        Library library = new Library();
        try {
            library = new Library();
            if(!tag.getFirst(FieldKey.TITLE).equals("") && tag.getFirst(FieldKey.TITLE)!=null)
                library.setTitle(tag.getFirst(FieldKey.TITLE));
            
            if(!tag.getFirst(FieldKey.ARTIST).equals("") && tag.getFirst(FieldKey.ARTIST)!=null)
                library.setArtist(tag.getFirst(FieldKey.ARTIST));
            
            if(!tag.getFirst(FieldKey.ALBUM).equals("") && tag.getFirst(FieldKey.ALBUM)!=null)
                library.setAlbum(tag.getFirst(FieldKey.ALBUM));
            
            try{library.setTrackNumber(Integer.parseInt(tag.getFirst(FieldKey.TRACK)));}catch(Exception e){}
            
            try{library.setYear(Integer.parseInt(tag.getFirst(FieldKey.YEAR)));}catch(Exception e){}
            
            if(!tag.getFirst(FieldKey.ALBUM_ARTIST).equals("") && tag.getFirst(FieldKey.ALBUM_ARTIST)!=null)
                library.setAlbumArtist(tag.getFirst(FieldKey.ALBUM_ARTIST));
            
            if(!tag.getFirst(FieldKey.COMPOSER).equals("") && tag.getFirst(FieldKey.COMPOSER)!=null)
                library.setComposer(tag.getFirst(FieldKey.COMPOSER));
            
            if(!tag.getFirst(FieldKey.GENRE).equals("") && tag.getFirst(FieldKey.GENRE)!=null)
                library.setGenre(tag.getFirst(FieldKey.GENRE));
            
            try{library.setTotaltracks(Integer.parseInt(tag.getFirst(FieldKey.TRACK_TOTAL)));}catch(Exception e){}
            
            if(!tag.getFirst(FieldKey.LYRICIST).equals("") && tag.getFirst(FieldKey.LYRICIST)!=null)
                library.setLyricist(tag.getFirst(FieldKey.LYRICIST));
            
            //if(!tag.getFirst(FieldKey.LYRICS).equals("") && tag.getFirst(FieldKey.LYRICS)!=null)
            //    library.setLyrics(tag.getFirst(FieldKey.LYRICS));

            try{library.setTrackLength(audioF.getAudioHeader().getTrackLength());}catch(Exception e){}
        } catch (Exception e) {
            throw e;
        }
    return library;
    }

    public boolean containsName(final List<Album> list, final String name){
        return list.stream().filter(o -> o.getAlbumName().equals(name)).findFirst().isPresent();
    }

    public Library getAAttrFromTag(Library song, boolean getAlbumImg, boolean getLyrics){
        AudioFile audioFile;
        try {
            audioFile = AudioFileIO.read(new File(song.getSongPath()));
            Tag tag = audioFile.getTag();
            if(getAlbumImg){
                song.setAlbumArt(getAlbumImgFromTag(tag));
            }
            if(getLyrics && !tag.getFirst(FieldKey.LYRICS).equals("") && tag.getFirst(FieldKey.LYRICS)!=null){
                song.setLyrics(tag.getFirst(FieldKey.LYRICS));
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    return song;
    }

    public String getAlbumImgFromTag(Tag tag){
        byte[] awtb = null;
        try {
            List<Artwork> artworks = tag.getArtworkList();
            for(Artwork awt : artworks){
                awtb = awt.getBinaryData();
                if(awtb!=null)break;
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    return getImagePath(awtb);
    }

    public Blob getAlbumImgBlobFromTag(Tag tag){
        byte[] awtb = null;
        Blob blob = null;
        try {
            List<Artwork> artworks = tag.getArtworkList();
            for(Artwork awt : artworks){
                awtb = awt.getBinaryData();
                if(awtb!=null)break;
            }
            blob = new SerialBlob(awtb);
        }catch (Exception e) {
            e.printStackTrace();
        }
    return blob;
    }

    public byte[] getAlbumImgBinFromTag(Tag tag){
        byte[] awtb = null;
        try {
            List<Artwork> artworks = tag.getArtworkList();
            for(Artwork awt : artworks){
                awtb = awt.getBinaryData();
                if(awtb!=null)break;
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    return awtb;
    }

    public String getImagePath(byte [] DP) {
    	String imgPath = "";
    	if(null!=DP) {
    		imgPath ="data:image/png;base64, " + Base64.getEncoder().encodeToString(DP); 
    	}
    	return imgPath;
    }

    //Transactional
    public List<Library> getAllSongs() {
        return libraryRepository.findAllByOrderByTitleAsc();
    }

    public Library getSongBySongId(int songId) {
        return libraryRepository.getBySongId(songId);
    }

    public List<Library> getSongsByAlbum(String album){
        return libraryRepository.getByAlbum(album);
    }

    public List<Library> getSongsByYear(int year) {
        return libraryRepository.getByYear(year);
    }

    public List<Library> getSongsByGenre(String genre) {
        return libraryRepository.getByGenre(genre);
    }

    public Library getSongBySongPath(String songPath) {
        return libraryRepository.getBySongPath(songPath);
    }

    public Map<String, List<Library>> getAllAlbums() {
        Map<String, List<Library>> albums = new HashMap<String, List<Library>>();
        List<Library> album = null;
        Map<String, Blob> rAlbumImgs = new HashMap<String, Blob>(); 
        Iterable<Album> rAlbums = albumRepository.findAll();
        try {
            for(Album album2 : rAlbums){
                if(album2.getAlbumName()!=null)
               rAlbumImgs.put(album2.getAlbumName(), album2.getAlbumImgPath());
            }
            Iterable<Library> trackList = libraryRepository.findAll();
            Iterator<Library> tlIt = trackList.iterator();
            Library track = null;
            while(tlIt.hasNext()){
                track = tlIt.next();
                if(track.getAlbum()==null)continue;
                if(albums.containsKey(track.getAlbum())){
                    album =albums.get(track.getAlbum());
                    album.add(track);
                    albums.put(track.getAlbum(), album);
                }else{
                    album = new ArrayList<Library>();
                    //track.setAlbumArt(rAlbumImgs.get(track.getAlbum()));
                    album.add(track);
                    albums.put(track.getAlbum(), album);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    return albums;
    }

    public Map<String, String> getAlbumImgs () {
        Map<String, String> rAlbumImgs = new HashMap<String, String>(); 
        byte[] btes=null;
        try {
            Iterable<Album> rAlbums = albumRepository.findAll();
            for(Album album2 : rAlbums){
                if(album2.getAlbumImgPath()!=null && album2.getAlbumName()!=null){
                    btes = album2.getAlbumImgPath().getBinaryStream().readAllBytes();
                    rAlbumImgs.put(album2.getAlbumName(), getImagePath(btes));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    return rAlbumImgs;
    }

    public Map<String, Library> getAllAlbumdetails(String filterColumn, String filterValue) {
        Map<String, Library> albums = new HashMap<String, Library>();
        Iterable<Library> trackList = null;
        try {
            if(filterColumn==null){
                trackList = libraryRepository.findAllByOrderByAlbumAsc();
            }else if(filterColumn.equalsIgnoreCase(ALBUM_ARTIST)){
                trackList = libraryRepository.getByAlbumArtistOrderByYearAsc(filterValue);
            }
             
            Iterator<Library> tlIt = trackList.iterator();
            Library track = null;
            while(tlIt.hasNext()){
                track = tlIt.next();
                if(track.getAlbum()==null)continue;
                if(!albums.containsKey(track.getAlbum())){
                    albums.put(track.getAlbum(), track);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    return albums;
    }

    public Iterable<Album> getAllAlbumsFromDb(){
        return albumRepository.findAll();
    }
    
    public List<Artist> getAllArtistDetails(String type) {
        return artistRepository.getByTypeOrderByArtistNameAsc(type);
    }

    /** 
     * Customized code for ; and &
     *  **/
    public List<String> getFilteredArtistDetailsFromDb(String type) {
        List<String> artistList = null;
        if(type.equals(ARTIST)){
            artistList = libraryRepository.findAllByGroupByArtist();
        }else if(type.equals(ALBUM_ARTIST)){
            artistList = libraryRepository.findAllByGroupByAlbumArtist();
        }
        List<String> artistList2 = new ArrayList<String>();
        String[] artistArr = null;
        for(String artist1 : artistList){
            if(artist1!=null)artist1 = artist1.trim();
            else continue;
            if((artist1.contains(";") || artist1.contains("&") && !type.equals(ALBUM_ARTIST))){
                artist1 = artist1.replaceAll("[;&]", ",");
            }
            if(artist1.contains(",") && !type.equals(ALBUM_ARTIST)){
                artistArr = artist1.split(",");
                for(String artist2 : artistArr){
                    if(!artistList2.contains(artist2.trim())){
                        artistList2.add(artist2.trim());
                    }
                }
            }else{
                if(!artistList2.contains(artist1.trim())){
                    artistList2.add(artist1.trim());
                }
            }
        }
    return artistList2;
    }

    public List<String> filterArtistList(List<String> artistList, String splitter){
        List<String> artistList1 =  new ArrayList<String>();
        String artist = null;
        String[] artistArr = null;
        for(int i=0;i<artistList.size();i++){
            artist = artistList.get(i);
            if(artist!=null){
                artist = artist.trim();
            }else{
                continue;
            }
            if(artist.contains(splitter)){
                artistArr = artist.split(splitter);
                for(String artist1 : artistArr){
                    artist1 = artist1.trim();
                    if(!artistList1.contains(artist1)){
                        artistList1.add(artist1);
                    }
                }
            }else{
                artistList1.add(artist);
            }
        }
        return artistList1;
    }

    @Transactional
    public Iterable<Artist> setArtistLocalImgAvlStatus(String artistType){
        String artistPath = "D:\\SWorkspace\\G-Player-SB\\src\\main\\resources\\public\\images\\artists";
        Artist artist = null;
        List<Artist> artistList = artistRepository.getByTypeOrderByArtistNameAsc(artistType);
        File artistImgFIle = null;
        for(int i=0;i<artistList.size();i++){
            artist = artistList.get(i);
            artistImgFIle = new File(artistPath+"\\"+artist.getArtistName()+".jpg");
            artist.setImgAvl(artistImgFIle.exists());
            artistList.set(i, artist);
        }
        return artistRepository.saveAll(artistList);
    }

    public List<Library> getSongsByArtist(String artist) {
        List<Library> songsByArtist= libraryRepository.getByArtistContains(artist);
        List<Library> resultSongsByArtist = new ArrayList<Library>();
        Library song = null;
        String songArtist = "";
        String[] songArtistArr = null;
        for(int i=0; i<songsByArtist.size();i++){
            song = songsByArtist.get(i);
            songArtist = song.getArtist();
            if(songArtist==null)continue;
            songArtist = songArtist.trim();
            if(songArtist.contains(",") || songArtist.contains(";") || songArtist.contains("&")){
                songArtist = songArtist.replaceAll("[;&]", ",");
                songArtistArr = songArtist.split(",");
                for(String songArtist1: songArtistArr){
                    if(songArtist1.trim().equalsIgnoreCase(artist)){
                        resultSongsByArtist.add(song);
                        break;
                    }
                }
            }else{
                if(songArtist.equalsIgnoreCase(artist)){
                    resultSongsByArtist.add(song);
                }
            }
        }
        return resultSongsByArtist;
    }

    public Map<String, List<Artist>> downloadArtistImgToDIr(){
        Map<String, List<Artist>> artists = new HashMap<String, List<Artist>>();
        Iterable<Artist> artistList = artistRepository.findAll();
        List<Artist> downloadedArtists = new ArrayList<Artist>();
        List<Artist> failedArtists = new ArrayList<Artist>();
        File localArtistImg = null;
        String localArtistPath = "D:\\SWorkspace\\G-Player-SB\\src\\g-player-react\\public\\images\\artists";
        String wikiUri = "https://en.wikipedia.org/api/rest_v1/page/summary/";
        String wikiResp = "";
        JSONObject wikiRespJson = null;
        for(Artist artist : artistList){
            localArtistImg =  new File(localArtistPath+"\\"+artist.getArtistName()+".jpg");
            if(!localArtistImg.exists()){
                wikiResp = restExchange(wikiUri+artist.getArtistName());
                try {
                    wikiRespJson = new JSONObject(wikiResp);
                    if(wikiRespJson.getString("title").contains("Not found") ||  wikiRespJson.getString("extract").contains("may refer to")){
                        wikiResp = restExchange(wikiUri+artist.getArtistName()+"_(singer)");
                        wikiRespJson = new JSONObject(wikiResp);
                        if(wikiRespJson.getString("title").contains("Not found")){
                            wikiResp = restExchange(wikiUri+artist.getArtistName()+"_(actor)");
                            wikiRespJson = new JSONObject(wikiResp);
                        }
                    }
                    if(wikiRespJson.getJSONObject("thumbnail")==null || !wikiRespJson.getString("extract").contains("singer") 
                        || !wikiRespJson.getString("extract").contains("actor") || !wikiRespJson.getString("extract").contains("composer") 
                        || !wikiRespJson.getString("extract").contains("musician")
                        || !wikiRespJson.getString("extract").contains("director"))continue;

                    System.out.println("wikiRespJson: "+wikiRespJson.getJSONObject("thumbnail").getString("source"));
                    FileUtils.copyURLToFile(new URL(wikiRespJson.getJSONObject("thumbnail").getString("source")), localArtistImg);
                    downloadedArtists.add(artist);
                } catch (Exception e) {
                    failedArtists.add(artist);
                    e.printStackTrace();
                }
            }
        }
        artists.put("downloadedArtists: ", downloadedArtists);
        artists.put("failedArtists: ", failedArtists);
    return artists;
    }

    public List<Library> getSongsByAlbumArtist(String albumArtist) {
        return libraryRepository.getByAlbumArtistOrderByAlbum(albumArtist);
    }

    public List<String> getAllAlbumArtistDetails() {
        return libraryRepository.findAllByGroupByAlbumArtist();
    }

    public Map<String, Library> getAllAlbumDetailsByAA(String albumArtist) {
        return null;
    }

    public String restExchange(String uUrl) {
		String respBody = "";
		try {
            RestTemplate restTemplate = new RestTemplateBuilder()
			        .setConnectTimeout(Duration.ofMillis(30000))
			        .setReadTimeout(Duration.ofMillis(30000))
			        .build();
			HttpHeaders headers = new HttpHeaders();
			UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(uUrl);
		    UriComponents uriComponents = builder.build(); 
			HttpEntity<String> request = new HttpEntity<String>(headers);
			ResponseEntity<String> response = restTemplate.exchange(uriComponents.toUriString(), HttpMethod.GET, request, String.class);
			respBody = response.getBody();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return respBody;
	}

    public GPResponse updateLyrics(String songId, String lyrics) {
        GPResponse resp = new GPResponse();
        try {
            lyrics = lyrics.replaceAll("\"", "");
            lyrics = lyrics.replaceAll("(\\\\r\\\\n|\\\\n)", "\\\n");
            System.out.println("lyrics: "+lyrics);
            Library song = libraryRepository.getBySongId(Integer.parseInt(songId));
            song.setLyrics(lyrics);
            song = libraryRepository.save(song);
            resp.setLibrary(song);
            AudioFile audioFile = AudioFileIO.read(new File(song.getSongPath()));
            Tag tag = audioFile.getTag();
            tag.addField(FieldKey.LYRICS, lyrics);
            audioFile.setTag(tag);
            audioFile.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resp;
    }

    private Album writeByteArryaTOimgFile (Album album, byte[] binImg) {
        try {
            File albumImgFile = new File(ALBUM_IMAGES_PATH+album.getAlbumName()+".jpg");
            if(!albumImgFile.exists()){
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(binImg);
                BufferedImage newImage  = ImageIO.read(byteArrayInputStream);
                Image image = newImage.getScaledInstance(250, 250, Image.SCALE_DEFAULT);

                newImage = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);
                newImage.getGraphics().drawImage(image, 0, 0, null);

                ImageIO.write(newImage, "jpg", albumImgFile);
                album.setAlbumImgAvl(true);
            }else{
                album.setAlbumImgAvl(true);
            }
            
        } catch (IOException e) {
            album.setAlbumImgAvl(false);
            e.printStackTrace();
        }
    return album;
    }

    public void cleanAlbumImageDir(){
        try {
            FileUtils.cleanDirectory(new File(ALBUM_IMAGES_PATH));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Album getAlbumByAlbumName(String albumName) {
        return albumRepository.getByAlbumName(albumName);
    }

    public List<Album> getAlbumListOfAA(String albumArtist) {
        return albumRepository.getByAlbumArtist(albumArtist);
    }

    public void resizeArtistImgs(){
        try {
            File artistDir = new File(ARTIST_IMAGES_PATH);
            File[] artistImgs = artistDir.listFiles();
            for(File artistImg : artistImgs){
                ByteArrayInputStream byteArrayInputStream 
                                = new ByteArrayInputStream(FileUtils.readFileToByteArray(artistImg));
                BufferedImage newImage  = ImageIO.read(byteArrayInputStream);
                Image image = newImage.getScaledInstance(250, 250, Image.SCALE_DEFAULT);
                newImage = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);
                newImage.getGraphics().drawImage(image, 0, 0, null);
                ImageIO.write(newImage, "jpg", artistImg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, List<Object>> searchbyKey(String searchKey) {
        Map<String, List<Object>> resultMap = new HashMap<String, List<Object>>();
        List<Object> tracks = libraryRepository.getByTitleContainsIgnoreCase(searchKey);
        List<Object> artists = artistRepository.getByArtistNameContainsIgnoreCaseAndType(searchKey, ARTIST);
        List<Object> albumArtists = artistRepository.getByArtistNameContainsIgnoreCaseAndType(searchKey, ALBUM_ARTIST);
        List<Object> albums = albumRepository.getByAlbumNameContainsIgnoreCase(searchKey);
        resultMap.put(TRACK_LIST, tracks);
        resultMap.put(ARTISTS, artists);
        resultMap.put(ALBUM_ARTISTS, albumArtists);
        resultMap.put(ALBUMS, albums);
        return resultMap;
    }

}
