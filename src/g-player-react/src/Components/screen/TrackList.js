import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, TRACK_LIST, SORT_YEAR, SORT_ARTIST, ARTIST } from "../redux/GPActionTypes";
import { fethAllSongs, setGroupband } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { scrollToPlaying, scrolltoId } from "../utli";
import { Spinner } from "./Spinner";
import { Track } from "./Track";


export const TrackList = () => {
    
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.library.tracks);
    const [trackList, setTrackList] = useState({});
    const isPlaying = useSelector(state => state.player.isPlaying);
    const [trackListKeys, setTrackListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(A_TO_Z);
    useEffect(()=>{
        dispatch(setGroupband("tracks"));
        dispatch(setPlayedFrom(TRACK_LIST));
        
    },[]);

    useEffect(()=>{
        if(Object.keys(trackList).length>0){
            let tempTrakListKeys = Object.keys(trackList);
            if(sortBy===SORT_YEAR){
                tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?-1:1});
            }
            if(sortBy===SORT_ARTIST){
                tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?1:-1});
            }
            setTrackListKeys(tempTrakListKeys);
            scrollToPlaying(isPlaying);
        }
    },[trackList])

    useEffect(()=>{
        if(tracks.length>0){
            if(sortBy===A_TO_Z){
                sortAZ(tracks);
            }else if(sortBy===SORT_YEAR){
                sortByYear(tracks);
            }else if(sortBy===SORT_ARTIST){
                sortByArtist(tracks);
            }
        }
    },[tracks, sortBy])

    const sortAZ = (tracks) => {
        let trackList = {};
        let tempArr = [];
        tracks.forEach((track) => {
            if (track.title !== null && track.title !== undefined && track.title !== "") {
                let ind = track.title.substring(0, 1).toUpperCase();
                if (!isNaN(ind)) {
                    ind = '#';
                }
                if (trackList[ind] !== undefined) {
                    tempArr = trackList[ind];
                    tempArr.push(track);
                    trackList[ind] = tempArr;
                } else {
                    trackList[ind] = [track];
                }
            }
        });
    setTrackList(trackList);
    }

    const sortByYear = (tracks) => {
        let trackList = {};
        let tempArr = [];
        tracks.forEach((track) => {
            if (track.year !== null && track.year !== undefined && track.year !== "") {
                let ind = track.year;
                if (trackList[ind] !== undefined) {
                    tempArr = trackList[ind];
                    tempArr.push(track);
                    trackList[ind] = tempArr;
                } else {
                    trackList[ind] = [track];
                }
            }
        })
        setTrackList(trackList);
    }

    const sortByArtist = (tracks) => {
        let trackList = {};
        let tempArr = [];
        let indArr;
        tracks.forEach((track) => {
            if (track.artist !== null && track.artist !== undefined && track.artist !== "") {
                let ind = track.artist;
                if(ind.includes(",") || ind.includes(";") || ind.includes("&")){
                    if(ind.includes(";") || ind.includes("&")){
                        ind = ind.replaceAll("&", ",");
                        ind = ind.replaceAll(";", ",");
                        indArr = ind.split(",");
                        indArr.forEach((art)=>{
                            if (trackList[art] !== undefined) {
                                tempArr = trackList[art];
                                tempArr.push(track);
                                trackList[art] = tempArr;
                            } else {
                                trackList[art] = [track];
                            }
                        })
                    }
                }else{
                    if (trackList[ind] !== undefined) {
                        tempArr = trackList[ind];
                        tempArr.push(track);
                        trackList[ind] = tempArr;
                    } else {
                        trackList[ind] = [track];
                    }
                }
            }
        })
        setTrackList(trackList);
    }

    return(
        <>
            <div className="order-container">
                <span>Sort By:</span>
                <select onChange={(event)=>setSortBy(event.target.value)} className="sortby">
                    <option value={A_TO_Z}>{A_TO_Z}</option>
                    <option value={SORT_YEAR}>{SORT_YEAR}</option>
                    <option value={SORT_ARTIST}>{SORT_ARTIST}</option>
                </select>
            </div>
            <div className="lKey-line">
                {sortBy!==SORT_ARTIST && trackListKeys !== undefined && trackListKeys.length > 0 && trackListKeys.map((lKey, index) =>
                    <span onClick={() => scrolltoId("lKey" + lKey)} className={lKey.length>8?sortBy+"_25":sortBy+"_10"}>{lKey}</span>
                )}
            </div>
            <div className="track-list">
                {/* {tracks!==undefined && tracks!==null &&
                            tracks.map((track,index) => 
                            track.title!==null && <Track track={track} key={track.songId} playedFrom={TRACK_LIST} index={index} />
                            )
                        } */}

                {trackListKeys !== undefined && trackListKeys.length > 0 && trackListKeys.map((lKey, index) =>
                    <>
                        <label id={"lKey" + lKey} className="track-lKey">{lKey}</label>
                        {trackList[lKey] !== undefined && trackList[lKey].length > 0 && trackList[lKey].map((track, trackIndex) =>
                            <Track track={track} key={track.songId} playedFrom={TRACK_LIST} index={index} hideTrackNum={true} />
                        )}
                    </>
                )}
            </div>
            <Spinner />
        </>
    );
}