package com.gmt.gp.controllers;

import java.io.File;
import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.GMedia;
import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.services.LibraryService;

import javafx.application.Platform;
import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.scene.media.MediaPlayer.Status;
import javafx.util.Duration;

@RestController
@RequestMapping("/media")
public class MediaController {

    private MediaPlayer mPlayer = null;

    public MediaPlayer getmPlayer() {
        return mPlayer;
    }

    public void setmPlayer(MediaPlayer mPlayer) {
        this.mPlayer = mPlayer;
    }

    @Autowired
    private LibraryService libraryService;

    @RequestMapping(method = RequestMethod.PUT, value = "/playSong/{songId}")
    public GPResponse playSong(@RequestBody String currentVolume,@PathVariable String songId){
        GPResponse resp = new GPResponse();
        Double volume = Double.parseDouble(currentVolume);
        if(songId.equals("0") || songId == null){
            resp.setError("songId 0 or null");
            return resp;
        }
        Library song = libraryService.getSongBySongId(Integer.parseInt(songId));
        //historyService.updateHistory(song);
        boolean getLyrics = false;
        if(song.getLyrics()==null){
            getLyrics = true;
        }
        song = libraryService.getAAttrFromTag(song, true, getLyrics);
        if(mPlayer!=null){
            try {
                Media media = new Media(new File(song.getSongPath()).toURI().toString());
                mPlayer.dispose();
                mPlayer = new MediaPlayer(media);
                mPlayer.setVolume(volume);
                mPlayer.play();
                resp.setStatus("PLAYING");
                resp.setLibrary(song);
            } catch (IllegalStateException ise) {
                resp.setError(ise.getMessage());
                ise.printStackTrace();
                if(ise.getMessage().contains("Toolkit not initialized")){
                    resp =  initAndPlay(song, volume);
                }
            }
        }else{
            resp =  initAndPlay(song, volume);
        }
        
        return resp;
    }

   
    public GPResponse initAndPlay(Library song, Double volume){
        GPResponse resp = new GPResponse();
        try {
            Platform.startup(()->{
                Media media = new Media(new File(song.getSongPath()).toURI().toString());
                mPlayer = new MediaPlayer(media);
                mPlayer.setVolume(volume);
                mPlayer.play();
            });
            resp.setLibrary(song);
            resp.setStatus("PLAYING");
        } catch (Exception e) {
            resp.setError(e.getMessage());
            e.printStackTrace();
        }
    return resp;
    }

    @RequestMapping("/playPause")
    public GPResponse playPause(){
        GPResponse resp = new GPResponse();
        if(mPlayer!=null){
            Status mpStatus = mPlayer.getStatus();
            if(mpStatus==Status.PLAYING){
                mPlayer.pause();
            }else{
                mPlayer.play();
            }
            
            ThreadSleep(600);
            
            resp.setStatus(mPlayer.getStatus().toString());
        }
        return resp;
    }

    @RequestMapping("/forward/{playbackTime}")
    public GPResponse forwardSong(@PathVariable Double playbackTime){
        GPResponse resp = new GPResponse();
        GMedia gMedia = new GMedia();
        if(mPlayer!=null){
            mPlayer.seek(new Duration(playbackTime));
            ThreadSleep(200);
            gMedia.setCurrentTime(mPlayer.getCurrentTime().toString());
            resp.setgMedia(gMedia);
        }
    return resp;
    }

    @RequestMapping("/volume/{volume}")
    public GPResponse setVolume(@PathVariable Double volume){
        GPResponse resp = new GPResponse();
        GMedia gMedia = new GMedia();
        if(mPlayer!=null){
            
            ThreadSleep(200);
            
            mPlayer.setVolume(volume);
            resp.setStatus(mPlayer.getStatus().toString());
            gMedia.setCurrentVolume(mPlayer.getVolume());
            resp.setgMedia(gMedia);
        }
        return resp;
    }

    @RequestMapping("/getCurrentSongStatus")
    public GPResponse getCurrentSontStatus(){
        GPResponse resp = new GPResponse();
        GMedia gMedia = new GMedia();
        if(mPlayer!=null){
            gMedia.setCurrentTime(mPlayer.getCurrentTime().toString());
            gMedia.setCurrentVolume(mPlayer.getVolume());
            resp.setStatus(mPlayer.getStatus().toString());
        }else{
            return null;
        }
        resp.setgMedia(gMedia);
        return resp;
    }

    @RequestMapping("/getCurrentSongAndStatus")
    public GPResponse getCurrentSongAndStatus(){
        GPResponse resp = new GPResponse();
        GMedia gMedia = new GMedia();
        try {
            if(mPlayer!=null){
                ThreadSleep(200);
                gMedia.setCurrentTime(mPlayer.getCurrentTime().toString());
                gMedia.setCurrentVolume(mPlayer.getVolume());
                Media media = mPlayer.getMedia();
                String fileName = media.getSource();
                fileName = fileName.substring(6, fileName.length());
                fileName = URLDecoder.decode(fileName, "UTF-8");
                fileName = fileName.replaceAll("/", "\\\\");
                Library library = libraryService.getSongBySongPath(fileName);
                library = libraryService.getAAttrFromTag(library, true, true);
                resp.setLibrary(library);
                resp.setStatus(mPlayer.getStatus().toString());
                resp.setgMedia(gMedia);
            }else{
                resp.setError("MEDIA_PLAYER_NULL");
            }
        } catch (Exception e) {
           e.printStackTrace();
        }
        return resp;
    }

    public void ThreadSleep(long time){
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
