import React, { useCallback, useEffect, useState } from "react";

import { FaPauseCircle, FaPlay } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { TbArrowsShuffle } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fettchCurrentSongStatus, playASong, playPause, setIsPlaying, setIsPlayingSucc, setIsRepeat, setPlayBackLength } from "../redux/player/PlayerActions";
import def_album_art from '../images/def_album_art.png';
import { debounce, getMins, scrolltoId, scrollToPlaying } from "../utli";
import { VolumeH } from "./VolumeH";
import { ALBUM, ARTIST, TRACK_LIST } from "../redux/GPActionTypes";
import { Link } from "react-router-dom";
import { ArtistLink } from "../screen/artist/ArtistLink";

export const Player = () => {

    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.player.isPlaying);
    const isRepeat = useSelector(state => state.player.isRepeat);
    const songPlayingImg = useSelector(state => state.player.songPlayingImg);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const playingSongStat = useSelector(state => state.player.playingSongStat);
    const tracks = useSelector(state => state.library.tracks);
    const album = useSelector(state => state.library.album);
    const artistTracks = useSelector(state => state.library.artistTracks);
    const [isInitiated, setIsinitiated] = useState(false);
    const [statClearIntrvl, setStatClearIntrvl] = useState(0);
    const [currentPlayVal, setCurrentplayVal] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayingL, setIsPlayingL] = useState(false);


    useEffect(()=>{
        setIsPlayingL(isPlaying);
    },[isPlaying])

    useEffect(()=>{
        clearInterval(statClearIntrvl);
        if(isPlaying)
            setStatClearIntrvl(setInterval( dispatchFetchStat, 500));
       
    },[songPlaying,isPlaying]);

    useEffect(()=>{
        if(isPlaying)
            dispatch(fettchCurrentSongStatus());
       
    },[songPlaying]);


    useEffect(()=>{
        if(playingSongStat===null || playingSongStat===undefined || songPlaying===null)return;
       const currentTime = Math.floor(parseInt(playingSongStat.currentTime)/1000);
       setCurrentTime(currentTime);
       const trackLength = songPlaying.trackLength;
       if(currentTime===trackLength){
            clearInterval(statClearIntrvl);
            playNext();
       }else{
            const pBarval = Math.floor((currentTime/trackLength)*100);
            setCurrentplayVal(pBarval);
       }
    },[playingSongStat]);

    const dispatchFetchStat = () => {
        dispatch(fettchCurrentSongStatus());
    }

    

    const playPauseFunc = () => {
        if(isPlaying){
            setIsPlayingL(false)
        }else{
            setIsPlayingL(true);
        }
        dispatch(playPause());
    }

    const playNext = () => {
        if(songPlaying===null)return false;
        let library;
        if(playedFrom===TRACK_LIST){
            library = tracks;
        }else if(playedFrom===ALBUM){
            library = album;
        }else if(playedFrom===ARTIST){
            library = artistTracks;
        }else{
            library = tracks;
        }
        const crrntindex = library.findIndex((track)=>track.songId===songPlaying.songId);
        console.log("crrntindex",crrntindex);
        let nextSong = {};
        if(library[crrntindex+1]!==undefined){
            nextSong = library[crrntindex+1];
        }else{
            nextSong = library[0];
            
        }scrolltoId("track-"+nextSong.songId);
        dispatch(playASong(nextSong.songId, playedFrom));
    }

    const playPrevious = () => {
        if(songPlaying===null)return false;
        let previousSong;
        let library;
        if(playedFrom===TRACK_LIST){
            library = tracks;
        }else if(playedFrom===ALBUM){
            library = album;
        }else if(playedFrom===ARTIST){
            library = artistTracks;
        }else{
            library = tracks;
        }
        const crrntindex = library.findIndex((track)=>track.songId===songPlaying.songId);
        if(library[crrntindex-1]!==undefined){
            previousSong = library[crrntindex-1];
        }else{
            previousSong = library[library.length-1];
            scrolltoId("track-"+previousSong.songId);
        }
        dispatch(playASong(previousSong.songId, playedFrom));
    }

    const setSlctdPlayBackTime = (event) => {
        if(!isPlaying || songPlaying===null)return;
        const pbVal = event.target.value;
        const fPbVal = Math.floor(((songPlaying.trackLength*pbVal)/100)*1000);
        dispatch(setPlayBackLength(fPbVal))
    }


    const setIsRepeatL = () => {
        if(isRepeat)dispatch(setIsRepeat(false))
        else dispatch(setIsRepeat(true))
    }

    return (
        <div className="player">
            <div className="player-container">
                <div className="song-info">
                    <Link to={songPlaying!==null?`/music/albums/${songPlaying.album}`:'#'}>
                        <div className="song-info-img">
                            {songPlayingImg !== null && songPlayingImg!=='' && <img src={songPlayingImg} />}
                            {(songPlayingImg===null || songPlayingImg==='') && <img src={def_album_art} />}
                        </div>
                    </Link>
                    <div className="song-info-title">
                        <p onClick={()=>scrollToPlaying(isPlaying)} style={{cursor:'pointer'}}>{songPlaying!==null && songPlaying.title}</p>
                        <p>{songPlaying!==null && <ArtistLink artist={songPlaying.artist} />}</p>
                    </div>
                    
                </div>
                <div className="player-controls">
                <div className="player-controls-buttons">
                    <div className="shuffle">
                        <div className="shuffle-button">
                            <TbArrowsShuffle />
                        </div>
                    </div>
                    <div className="previous">
                        <div className="previous-button">
                            <MdSkipPrevious onClick={playPrevious} />
                        </div>
                    </div>
                    <div className="play">
                        <div className="play-button" onClick={playPauseFunc}>
                            {!isPlayingL && <FaPlay className="faplay"  />}
                            {isPlayingL && <FaPauseCircle className="FaPauseCircle" />}
                        </div>
                    </div>
                    <div className="next">
                        <div className="next-button">
                            <MdSkipNext onClick={playNext} />
                        </div>
                    </div>
                    <div className="repeat">
                        <div className={isRepeat?"repeat-button btn-selected":"repeat-button"}>
                            <TiArrowRepeat onClick={setIsRepeatL} />
                        </div>
                    </div>
                </div>
                <div className="player-controls-status-bar">
                    <div className="play-progress-bar-div">
                        <span className="play-progress-bar-start-time">{getMins(currentTime)}</span>
                        {/* <div id="play_progress_pointer" className="play-progress-pointer"></div>
                        <div className="play-progress-bar"></div> */}
                        <input type="range" min="1" max="100"  className="play-progress-bar" id="play_progress_bar" value={currentPlayVal}  onChange={(event)=>setSlctdPlayBackTime(event)}></input>
                        <span className="play-progress-bar-end-time">{songPlaying!==null ? getMins(songPlaying.trackLength):'0:00'}</span>
                    </div>
                </div>
                </div>
                <div className="other-actions">
                        <VolumeH />
                </div>
            </div>
        </div>
    );
}