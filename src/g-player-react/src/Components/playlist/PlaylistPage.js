import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSongsInPlaylist } from "../redux/playlist/PlaylistActions";
import { TrackList } from "../screen/track/TrackList";
import { PLAYLIST } from "../redux/GPActionTypes";

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const { playlistName } = useParams();
    console.log("playlistName: ",playlistName);

    const playlistSongs = useSelector(state => state.playlist.playlistSongs);
    console.log("playlistSongs: ",playlistSongs);

    useEffect(()=>{
        dispatch(fetchSongsInPlaylist(playlistName));
    },[playlistName]);
    return(
        <div className="playlist-page">
            <h1>{playlistName}</h1>
            <TrackList tracks={playlistSongs}  playedFrom={{pfKey:PLAYLIST, pfVal:playlistName}} />
        </div>
    );
}