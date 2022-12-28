import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRACK_LIST } from "../redux/GPActionTypes";
import { fethAllSongs, setGroupband } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { scrollToPlaying } from "../utli";
import { Track } from "./Track";


export const TrackList = () => {
    
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.library.tracks);
    const isPlaying = useSelector(state => state.player.isPlaying);
    useEffect(()=>{
        dispatch(setGroupband("tracks"));
        dispatch(setPlayedFrom(TRACK_LIST));
        scrollToPlaying(isPlaying);
    },[]);

    return(
        <div className="track-list">
            {tracks!==undefined && tracks!==null &&
                tracks.map((track,index) => 
                    track.title!==null && <Track track={track} key={track.songId} playedFrom={TRACK_LIST} index={index} />
                )
            }
        </div>
    );
}