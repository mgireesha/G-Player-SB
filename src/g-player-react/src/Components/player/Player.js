import React, { useEffect, useState } from "react";

import { FaPauseCircle, FaPlay } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { TbArrowsShuffle , TbRepeatOnce} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fettchCurrentSongStatus, playASong, playPause, setIsPlaying, setIsRepeat, setIsShuffle, setPlayBackLength, setRepeat } from "../redux/player/PlayerActions";
import { getCookieValue, getMins, scrolltoId, scrollToPlaying, setCookies } from "../utli";
import { VolumeH } from "./VolumeH";
import { ALBUM, ALBUMS, ALBUM_ARTISTS, ARTIST, ARTISTS, CURRENT, NEXT, PREVIOUS, RECENT_PLAYS, REPEAT_ALL, REPEAT_OFF, REPEAT_ONE, TRACK_LIST } from "../redux/GPActionTypes";
import { Link } from "react-router-dom";
import { ArtistLink } from "../screen/artist/ArtistLink";
import def_album_art from '../images/def_album_art.png';
import { fetchAllHistory, updateHistory } from "../redux/library/LibraryActions";
import { SliderRC } from "../SliderRC";

export const Player = () => {

    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.player.isPlaying);
    const repeat = useSelector(state => state.player.repeat);
    const isShuffle = useSelector(state => state.player.isShuffle);
    const songPlayingImg = useSelector(state => state.player.songPlayingImg);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const playingSongStat = useSelector(state => state.player.playingSongStat);
    const tracks = useSelector(state => state.library.trackIds);
    const albumTracks = useSelector(state => state.library.albumTracks);
    const artistTracks = useSelector(state => state.library.artistTracks);
    const historyTracks = useSelector(state => state.library.history.songs);
    const currentVolume = useSelector(state => state.player.currentVolume);
    const [statClearIntrvl, setStatClearIntrvl] = useState(0);
    const [currentPlayVal, setCurrentplayVal] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayingL, setIsPlayingL] = useState(false);
    const [playTime, setPlayTime] = useState(0); // Play time is updated every time playingSongStat chnage and is reset every time songPlaying chnages 
    const [pTrackList, setPTrackList] = useState(tracks);

    useEffect(() => {
        const handleEscape = (event) => {
            if(event.code == "Space"){
                playPauseFunc();
            }
        };
        window.addEventListener('keyup', handleEscape);
        return () => {
            window.removeEventListener('keyup', handleEscape);
        };
    }, []);

    useEffect(()=>{
        setIsPlayingL(isPlaying);
    },[isPlaying])

    useEffect(()=>{
        clearInterval(statClearIntrvl);
        if(isPlaying)setStatClearIntrvl(setInterval( dispatchFetchStat, 1000));
    },[songPlaying,isPlaying]);

    useEffect(()=>{
        if(isPlaying){
            dispatch(fettchCurrentSongStatus());
        }
        setPlayTime(0);
         const rotatingBtn = [...document.getElementsByClassName('rotate-player-button')];
         rotatingBtn.forEach((rBtn=>{
             rBtn.classList.remove('rotate-player-button');
         }));

        [...document.getElementsByClassName('player-controls')].forEach(pc => {pc.classList.remove('opacity-player-console')})
    },[songPlaying]);

    useEffect(()=>{
        const tempPlayTime = playTime;
        if(playTime===10000 && songPlaying!==null){
            dispatch(updateHistory(songPlaying.songId));
        }

        if(playTime===12000){
            dispatch(fetchAllHistory());
        }

        if(playTime > 4000 && Number.isInteger(playTime/5000)){
            setCookies("playingSongStat",JSON.stringify(playingSongStat));
        }
        setPlayTime(tempPlayTime+500);
    },[playingSongStat])

    useEffect(()=>{
        if(playingSongStat===null || playingSongStat===undefined || songPlaying===null)return;
       const currentTime = Math.floor(parseInt(playingSongStat.currentTime)/1000);
       setCurrentTime(currentTime);
       const trackLength = songPlaying.trackLength;
       if((trackLength - currentTime)<3){
            clearInterval(statClearIntrvl);
            if(repeat===REPEAT_ALL){
                setTimeout(playNextSong(NEXT),4000);
            }else if(repeat===REPEAT_ONE){
                setTimeout(playNextSong(CURRENT),4000);
            }else{
                dispatch(setIsPlaying(false))
            }
       }else{
            const pBarval = Math.floor((currentTime/trackLength)*100);
            setCurrentplayVal(pBarval);
       }
    },[playingSongStat]);

    useEffect(()=> {
        const library = getSetLibrary();
        if(library.length>0)setPTrackList(library);
    },[playedFrom, isShuffle, tracks, albumTracks, artistTracks, historyTracks]);

    const dispatchFetchStat = () => {
        dispatch(fettchCurrentSongStatus());
    }

    const getSetLibrary = () => {
        if(playedFrom === ALBUM_ARTISTS || playedFrom ===ARTISTS || playedFrom === ALBUMS)return [];
        let library = [];
        if(playedFrom===TRACK_LIST){
            library = tracks;
        }else if(playedFrom===ALBUM && albumTracks.length>0){
            library = albumTracks.map((track) => { return track.songId});
        }else if(playedFrom===ARTIST && artistTracks.length>0){
            library = artistTracks.map((track) => { return track.songId});
        }else if(playedFrom===RECENT_PLAYS && historyTracks!==undefined && historyTracks.length>0){
            library = historyTracks.map((track) => { return track.songId});
        }
        // else{
        //     library = tracks;
        // }

        if(library.length === 0)return [];

        if(isShuffle){
            library = getShuffledTrackList(library);
        }
        setPTrackList(library);
        return library;
    }

    const getShuffledTrackList = (trackList) => {
        if(trackList.length === 0)return [];
        let randomIndex;
        const tempTrackIds = [...trackList];
        const shuffledTracks = [];
        for(let i=0; i<trackList.length;i++){
            randomIndex = Math.floor(Math.random()*tempTrackIds.length);
            shuffledTracks.push(tempTrackIds[randomIndex]);
            tempTrackIds.splice(randomIndex,1);
        }
        return shuffledTracks;
    }

    const playPauseFunc = () => {
        if(isPlayingL){
            setIsPlayingL(false);
            //dispatch(setIsPlaying(false));
        }else{
            setIsPlayingL(true);
            //dispatch(setIsPlaying(true));
        }
        dispatch(playPause(songPlaying, playedFrom, currentVolume, currentTime));
    }

    const playNextSong = (action, event) => {
         if(event!==undefined){
             event.target.parentElement.classList.add('rotate-player-button');
         }

        [...document.getElementsByClassName('player-controls')].forEach(pc => {pc.classList.add('opacity-player-console')});

        if (songPlaying === null) return false;
        let library;
        let nextSong = {};
        if (action === CURRENT) {
            nextSong = songPlaying.songId;
        } else {
            if (pTrackList.length > 0) {
                library = pTrackList;
            } else {
                library = getSetLibrary();
            }
            const crrntindex = library.findIndex((track) => track === songPlaying.songId);
            if (action === NEXT) {
                if (library[crrntindex + 1] !== undefined) {
                    nextSong = library[crrntindex + 1];
                } else {
                    nextSong = library[0];
                }
            } else if (action === PREVIOUS) {
                if (library[crrntindex - 1] !== undefined) {
                    nextSong = library[crrntindex - 1];
                } else {
                    nextSong = library[library.length - 1];
                }
            }
        }
        let songId = nextSong;
        scrolltoId("track-" + songId);
        dispatch(playASong(songId, playedFrom, currentVolume));
        dispatch(setIsPlaying(true));
    }

    const setSlctdPlayBackTime = (event) => {
        
        if(!isPlaying || songPlaying===null)return;
        const pbVal = event;//event.target.value;
        const fPbVal = Math.floor(((songPlaying.trackLength*pbVal)/100)*1000);
        dispatch(setPlayBackLength(fPbVal))
    }


    const setRepeatL = () => {
        let tempRepeat;
        if(repeat===REPEAT_OFF){
            tempRepeat = REPEAT_ALL;
        }else if(repeat===REPEAT_ALL){
            tempRepeat = REPEAT_ONE;
        }else if(repeat===REPEAT_ONE){
            tempRepeat = REPEAT_OFF;
        }
        dispatch(setRepeat(tempRepeat))
        setCookies("repeat", tempRepeat);
    }

    const setIsShuffleL = () => {
        if(isShuffle){
            dispatch(setIsShuffle(false))
            setCookies("isShuffle", false);
        }else {
            dispatch(setIsShuffle(true))
            setCookies("isShuffle", true);
        }
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
                        <p style={{maxHeight: '3em',overflow: 'auto'}}>{songPlaying!==null && <ArtistLink artist={songPlaying.artist} />}</p>
                    </div>
                    
                </div>
                <div className="player-controls">
                <div className="player-controls-buttons">
                    <div className="shuffle">
                        <div className={isShuffle?"shuffle-button btn-selected":"shuffle-button"}>
                            <TbArrowsShuffle onClick={setIsShuffleL} />
                        </div>
                    </div>
                    <div className="previous">
                        <div className="previous-button" id="previous-button">
                            <MdSkipPrevious onClick={(event)=>playNextSong(PREVIOUS, event)} />
                        </div>
                    </div>
                    <div className="play">
                        <div className="play-button" onClick={playPauseFunc}>
                            {!isPlayingL && <FaPlay className="faplay"  />}
                            {isPlayingL && <FaPauseCircle className="FaPauseCircle" />}
                        </div>
                    </div>
                    <div className="next">
                        <div className="next-button" id="next-button">
                            <MdSkipNext onClick={(event)=>playNextSong(NEXT, event)} />
                        </div>
                    </div>
                    <div className="repeat">
                        <div className={repeat===REPEAT_ONE || repeat===REPEAT_ALL?"repeat-button btn-selected":"repeat-button"}>
                            {(repeat===REPEAT_OFF || repeat===REPEAT_ALL) && <TiArrowRepeat onClick={setRepeatL} />}
                            {repeat===REPEAT_ONE && <TbRepeatOnce onClick={setRepeatL} />}
                        </div>
                    </div>
                </div>
                <div className="player-controls-status-bar">
                    <div className="play-progress-bar-div">
                        <span className="play-progress-bar-start-time">{getMins(currentTime)}</span>
                        <input type="range" min="1" max="100"  className="play-progress-bar no-display" id="play_progress_bar" value={currentPlayVal}  onChange={(event)=>setSlctdPlayBackTime(event)}></input>
                        <div className="play-progress-bar">
                            <SliderRC value={currentPlayVal} onValChange={setSlctdPlayBackTime} step={0} />
                        </div>
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