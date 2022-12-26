package com.gmt.gp.services;

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

import javax.sql.rowset.serial.SerialBlob;

import org.apache.commons.io.FileUtils;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.datatype.Artwork;
import org.json.JSONObject;
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
import com.gmt.gp.model.AlbumArtist;
import com.gmt.gp.model.Artist;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.repositories.AlbumArtistRepository;
import com.gmt.gp.repositories.AlbumRepository;
import com.gmt.gp.repositories.ArtistRepository;
import com.gmt.gp.repositories.LibraryRepository;

@Service
public class LibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumArtistRepository albumArtistRepository;

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
        try {
            albumArtistRepository.truncateMyTable();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

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

    public List<File> getMusicFiles(List<String> mainFolderList) {
        List<File> tempFileList = new ArrayList<File>();
        List<File> fileList = new ArrayList<File>();
        FileFilter folderFilter = new FileFilter() {
            public boolean accept(File file) {
                return file.isDirectory();
            }
        };
        File[] folders = null;
        for (String mainFolder : mainFolderList) {
            File musicDir = new File(mainFolder);
            fileList.addAll(Arrays.asList(musicDir.listFiles(mp3filter)));
            folders = musicDir.listFiles(folderFilter);
            fileList.addAll(recursiveSearch(folders, 0, 0, tempFileList));
        }
        return fileList;
    }

    // public static List<File> filterMusicFiles(File[] files) {
    //     List<File> fileList = new ArrayList<File>();
    //     String extension = null;
    //     for(int i=0;i<files.length;i++){
    //         int index = files[i].getName().lastIndexOf('.');
    //         if (index > 0) {
    //             extension = files[i].getName().substring(index + 1);
    //             if (extension.equalsIgnoreCase("mp3") || extension.equalsIgnoreCase("m4a")){
    //                 fileList.add(files[i]);
    //             }
    //         }
            
    //     }
    //     return fileList;
    // }

    // public static List<File> filterMusicFiles(List<File> files) {
    //     List<File> tFiles = files;
    //     String extension = null;
    //     for(int i=0;i<tFiles.size();i++){
    //         //int index = files.get(i).getName().lastIndexOf('.');
    //         //if (index > 0) {
    //             extension = tFiles.get(i).getName().substring(tFiles.get(i).getName().length()-3,tFiles.get(i).getName().length());
    //             System.out.println("extension: "+extension);
    //         //}
    //         System.out.println(tFiles.get(i).getName());
    //             System.out.println("size: "+tFiles.size());
    //         if (!extension.equals("mp3") && !extension.equals("m4a")){
                
    //             tFiles.remove(i);
    //             System.out.println("size: "+tFiles.size());
    //         }
                
    //     }
       
    //     return tFiles;
    // }

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

    // file filter for sort mp3 files
    

    public void buildLibrary(List<File> fileList) {
        AudioFile audioF = null;
        Library library = null;
        Album album = null;
        Blob albumImg = null;
        Tag tag = null;
        List<Library> libList = new ArrayList<Library>();
        List<Album> albumList = new ArrayList<Album>();
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
                    } catch (Exception e) {
                        System.out.println("exceptionCount: "+ ++exceptionCounter);
                        e.printStackTrace();
                    }
                    
                    if(!containsName(albumList, library.getAlbum())){
                        albumImg = getAlbumImgBinFromTag(tag);
                        //System.out.println("getAlbumImgBinFromTag(tag): "+getAlbumImgBinFromTag(tag));
                        if(albumImg!=null){
                            album = new Album();
                            album.setAlbumName(library.getAlbum());
                            album.setAlbumImgPath(getAlbumImgBinFromTag(tag));
                            albumList.add(album);
                        }
                    }
                } catch (Exception e) {
                    System.out.println("exceptionCount: "+ ++exceptionCounter);
                    e.printStackTrace();
                }
            }
            long endingTime = System.currentTimeMillis();
            System.out.println("Read time: "+ (endingTime-startingTime)/1000);
            startingTime = System.currentTimeMillis();
            libraryRepository.saveAll(libList);
            albumRepository.saveAll(albumList);
            endingTime = System.currentTimeMillis();
            System.out.println("Save Time: "+(endingTime-startingTime)/1000);
        } catch (Exception e) {
            System.out.println("exceptionCount: "+ ++exceptionCounter);
            e.printStackTrace();
        }
        System.out.println("exceptionCount: "+ exceptionCounter);
    }

    public boolean containsName(final List<Album> list, final String name){
        return list.stream().filter(o -> o.getAlbumName().equals(name)).findFirst().isPresent();
    }

    public Library getAlbumImg(Library song){
        AudioFile audioFile;
        try {
            audioFile = AudioFileIO.read(new File(song.getSongPath()));
            Tag tag = audioFile.getTag();
            song.setAlbumArt(getAlbumImgFromTag(tag));
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

    public Blob getAlbumImgBinFromTag(Tag tag){
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

    public String getImagePath(byte [] DP) {
    	String imgPath = "";
    	if(null!=DP) {
    		imgPath ="data:image/png;base64, " + Base64.getEncoder().encodeToString(DP); 
    	}
    	return imgPath;
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

    public List<Library> getAllSongs() {
        return libraryRepository.findAllByOrderByTitleAsc();
    }

    public Library getSongBySongId(int songId) {
        return libraryRepository.getBySongId(songId);
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
        // Iterable<Album> rAlbums = albumRepository.findAll();
        // for(Album album2 : rAlbums){
        //    rAlbumImgs.put(album2.getAlbumName(), album2.getAlbumImgPath());
        // }
        //String asd = "2964";
        byte[] btes=null;
        //Album album = albumRepository.getByAlbumId(Long.parseLong(asd));
        try {
            Iterable<Album> rAlbums = albumRepository.findAll();
            for(Album album2 : rAlbums){
                if(album2.getAlbumImgPath()!=null && album2.getAlbumName()!=null){
                    btes = album2.getAlbumImgPath().getBinaryStream().readAllBytes();
                    rAlbumImgs.put(album2.getAlbumName(), getImagePath(btes));
                }
                
            }
            
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
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
            }else if(filterColumn.equalsIgnoreCase("ALBUM_ARTIST")){
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

    /** 
     * Customized code for ; and &
     *  **/
    public List<String> getAllArtistDetails() {
        List<String> artistList =  libraryRepository.findAllByGroupByArtist();
        List<String> artistList1 =  artistList;
        List<String> artistList2 =  new ArrayList<String>();;
        String[] splitters = {",",";","&"};
        for(String splitter: splitters){
            artistList1 = filterArtistList(artistList1, splitter);
        }
        for(String artist: artistList1){
            if(!artistList2.contains(artist)){
                artistList2.add(artist);
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
    public Iterable<Artist> readAndStoreArtistnames(){
        artistRepository.truncateMyTable();
        String ArtistPath = "D:\\SWorkspace\\G-Player-SB\\src\\main\\resources\\public\\images\\artists";
        File artistsDir = new File(ArtistPath);
        File[] artistsImgs = artistsDir.listFiles();
        Artist artist = null;
        List<Artist> artistList = new ArrayList<Artist>();
        String albumImgName= null;
        for(File artistsImg: artistsImgs){
            artist = new Artist();
            albumImgName = artistsImg.getName();
            System.out.println("artistsImg.getName() 449: "+albumImgName);
            albumImgName = albumImgName.substring(0, albumImgName.length()-4);
            System.out.println("artistsImg.getName() 449: "+albumImgName);
            artist.setArtistName(artistsImg.getName().substring(0,artistsImg.getName().length()-4));
            artistList.add(artist);
        }
        return artistRepository.saveAll(artistList);
    }

    public Iterable<Artist> getAllArtistImgDetails() {
        return artistRepository.findAll();
    }

    public Iterable<AlbumArtist> getAllAlbumArtistImgDetails() {
        return albumArtistRepository.findAll();
    }

    @Transactional
    public Iterable<AlbumArtist> readAndStoreAlbumArtistnames(){
        albumArtistRepository.truncateMyTable();
        String ArtistPath = "D:\\SWorkspace\\G-Player-SB\\src\\main\\resources\\public\\images\\album_artists";
        File artistsDir = new File(ArtistPath);
        File[] artistsImgs = artistsDir.listFiles();
        AlbumArtist artist = null;
        List<AlbumArtist> artistList = new ArrayList<AlbumArtist>();
        String albumImgName= null;
        for(File artistsImg: artistsImgs){
            artist = new AlbumArtist();
            albumImgName = artistsImg.getName();
            System.out.println("artistsImg.getName() 449: "+albumImgName);
            albumImgName = albumImgName.substring(0, albumImgName.length()-4);
            System.out.println("artistsImg.getName() 449: "+albumImgName);
            artist.setAlbumArtistName(artistsImg.getName().substring(0,artistsImg.getName().length()-4));
            artistList.add(artist);
        }
        return albumArtistRepository.saveAll(artistList);
    }

    public List<Library> getSongsByArtist(String artist) {
        return libraryRepository.getByArtistContains(artist);
    }

    public Map<String, List<String>> downloadArtistImgToDIr(){
        Map<String, List<String>> artists = new HashMap<String, List<String>>();
        List<String> artistList = getAllArtistDetails();
        List<String> downloadedArtists = new ArrayList<String>();
        List<String> failedArtists = new ArrayList<String>();
        File localArtistImg = null;
        String localArtistPath = "D:\\SWorkspace\\G-Player-SB\\src\\g-player-react\\public\\images\\artists";
        String wikiUri = "https://en.wikipedia.org/api/rest_v1/page/summary/";
        String wikiResp = "";
        JSONObject wikiRespJson = null;
        for(String artist : artistList){
            localArtistImg =  new File(localArtistPath+"\\"+artist+".jpg");
            if(!localArtistImg.exists()){
                wikiResp = restExchange(wikiUri+artist);
                try {
                    wikiRespJson = new JSONObject(wikiResp);
                    if(wikiRespJson.getString("extract").contains("may refer to")){
                        wikiResp = restExchange(wikiUri+artist+"_(singer)");
                        wikiRespJson = new JSONObject(wikiResp);
                        if(wikiRespJson.getString("title").contains("Not found")){
                            wikiResp = restExchange(wikiUri+artist+"_(actor)");
                            wikiRespJson = new JSONObject(wikiResp);
                        }
                    }
                    if(wikiRespJson.getJSONObject("thumbnail")==null)continue;
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

    public Map<String, List<String>> downloadAlbumArtistImgToDIr(){
        Map<String, List<String>> artists = new HashMap<String, List<String>>();
        List<String> artistList = getAllAlbumArtistDetails();
        List<String> downloadedArtists = new ArrayList<String>();
        List<String> failedArtists = new ArrayList<String>();
        File localArtistImg = null;
        String localArtistPath = "D:\\SWorkspace\\G-Player-SB\\src\\g-player-react\\public\\images\\album_artists";
        String wikiUri = "https://en.wikipedia.org/api/rest_v1/page/summary/";
        String wikiResp = "";
        JSONObject wikiRespJson = null;
        for(String artist : artistList){
            localArtistImg =  new File(localArtistPath+"\\"+artist+".jpg");
            if(!localArtistImg.exists()){
                wikiResp = restExchange(wikiUri+artist);
                try {
                    wikiRespJson = new JSONObject(wikiResp);
                    if(wikiRespJson.getString("title").contains("Not found") || wikiRespJson.getString("extract").contains("may refer to")){
                        wikiResp = restExchange(wikiUri+artist+"_(singer)");
                        wikiRespJson = new JSONObject(wikiResp);
                        if(wikiRespJson.getString("title").contains("Not found")){
                            wikiResp = restExchange(wikiUri+artist+"_(actor)");
                            wikiRespJson = new JSONObject(wikiResp);
                        }
                    }
                    if(wikiRespJson.getJSONObject("thumbnail")==null)continue;
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

    public List<Library> getSongsByAlbumArtist(String albumArtist) {
        return libraryRepository.getByAlbumArtistOrderByAlbum(albumArtist);
    }

    public List<String> getAllAlbumArtistDetails() {
        return libraryRepository.findAllByGroupByAlbumArtist();
    }

    public Map<String, Library> getAllAlbumDetailsByAA(String albumArtist) {
        return null;
    }

    public Library getLibraryFromFile(Tag tag, AudioFile audioF) throws Exception{
        Library library = new Library();
        try {
            library = new Library();
            //AudioFile audioF = AudioFileIO.read(song);
            //Tag tag = audioF.getTag();
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
            
            if(!tag.getFirst(FieldKey.LYRICS).equals("") && tag.getFirst(FieldKey.LYRICS)!=null)
                library.setLyrics(tag.getFirst(FieldKey.LYRICS));

            try{library.setTrackLength(audioF.getAudioHeader().getTrackLength());}catch(Exception e){}
        } catch (Exception e) {
            throw e;
        }
    return library;
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

}
