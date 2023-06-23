import React from "react";
import { TrackList } from "./TrackList";
import { useSelector } from "react-redux";
import { TRACK_LIST } from "../../redux/GPActionTypes";

export const Tracks = () => {
    const tracks = useSelector(state => state.library.tracks);
    return(
        <TrackList tracks={tracks?tracks:[]} playedFrom={{pfKey:TRACK_LIST}} />
    );
}