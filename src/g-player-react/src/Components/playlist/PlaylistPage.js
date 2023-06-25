import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSongsInPlaylist } from "../redux/playlist/PlaylistActions";
import { TrackList } from "../screen/track/TrackList";
import { PLAYLIST, TRACK_LIST } from "../redux/GPActionTypes";
import { PlaylistPageHeader } from "./PlaylistPageHeader";
import { PLAYLIST_DELETE_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const { playlistName, playlistId } = useParams();

    const playlistSongs = useSelector(state => state.playlist.playlistSongs);
    const [albumNames, setAlbumNames] = useState([]);

    useEffect(()=>{
        dispatch(fetchSongsInPlaylist(playlistId));
    },[playlistId]);

    const playAll = () => {
        const tracks = document.getElementById(TRACK_LIST);
        if(tracks && tracks.childElementCount > 0){
            tracks.children[0].children[0].click()
        }
    }


    useEffect(()=>{
        if(playlistSongs && playlistSongs.length > 0){
            const albums = playlistSongs.filter((song, index)=>playlistSongs.findIndex((iSong)=>iSong.album === song.album)=== index);
            const tempAlbumNames = albums.map((album)=>album.album);
            if(tempAlbumNames.length > 4){
                tempAlbumNames.length = 4;
            }
            setAlbumNames(tempAlbumNames);
        }else{
            setAlbumNames([]);
        }
    },[playlistSongs]);

    return(
        <div className="playlist-page">
            <PlaylistPageHeader albumNames={albumNames} songsCount={playlistSongs.length} playAll={playAll} />
            {playlistSongs.length > 0 && <TrackList tracks={playlistSongs} trackListInp={{showSort:false, showLKey:false, playedFrom:{pfKey:PLAYLIST, pfVal:playlistName}}} />}
        </div>
    );
}