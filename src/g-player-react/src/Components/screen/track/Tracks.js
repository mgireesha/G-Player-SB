import React, { useEffect } from "react";
import { TrackList } from "./TrackList";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, LYRICS_AVAILABLE, SORT_ARTIST, SORT_YEAR, TRACKS } from "../../redux/GPActionTypes";
import { setCookies } from "../../utilities/util";
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
        <TrackList tracks={tracks?tracks:[]} trackListInp={{showSort:true, showLKey:true, playedFrom:{pfKey:TRACKS}, sortSelectors:[A_TO_Z,A_TO_Z_DESC, SORT_YEAR, SORT_ARTIST, LYRICS_AVAILABLE]}} />
    );
}