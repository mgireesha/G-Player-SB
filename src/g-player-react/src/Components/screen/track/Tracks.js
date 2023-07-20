import React, { useEffect } from "react";
import { TrackList } from "./TrackList";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_PAGE, TRACKS } from "../../redux/GPActionTypes";
import { setCookies } from "../../utli";
import { fetchAllSongs } from "../../redux/library/LibraryActions";

export const Tracks = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.library.tracks);
    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:TRACKS}));
        if(tracks.length === 0){
            dispatch(fetchAllSongs());
        }
    },[tracks])
    return(
        <TrackList tracks={tracks?tracks:[]} trackListInp={{showSort:true, showLKey:true, playedFrom:{pfKey:TRACKS}}} />
    );
}