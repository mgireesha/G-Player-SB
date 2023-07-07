import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlaylistNames, fetchSongsInPlaylist } from "../redux/playlist/PlaylistActions";
import { TrackList } from "../screen/track/TrackList";
import { CURRENT_PAGE, PLAYLIST, TRACK_LIST } from "../redux/GPActionTypes";
import { PlaylistPageHeader } from "./PlaylistPageHeader";
import { setCookies } from "../utli";
import { setCurrentPage } from "../redux/library/LibraryActions";

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const { playlistName, playlistId } = useParams();

    const playlistSongs = useSelector(state => state.playlist.playlistSongs);
    const [albumNames, setAlbumNames] = useState([]);
    const [trackListInp, setTrackListInp] = useState({});

    useEffect(()=>{
        dispatch(fetchPlaylistNames());
        dispatch(fetchSongsInPlaylist(playlistId));

        if(playlistId && playlistName){
            const currentPage = {
                id: playlistId,
                name: playlistName,
                type: PLAYLIST
            }
            dispatch(setCurrentPage(currentPage));
            setCookies(CURRENT_PAGE, JSON.stringify(currentPage));
        }

    },[playlistId, playlistName]);

    useEffect(()=>{
        const tempTrackListInp = {
            playedFrom:{
                pfKey:PLAYLIST, 
                pfVal:playlistName
            },
            showSort: false,
            showLKey: false,
        }

        if(playlistSongs){
            if(playlistSongs.length > 6){
                tempTrackListInp.showSort = true;
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 24.2em)'
                }
            }
            if(playlistSongs.length > 20){
                tempTrackListInp.showLKey = true;
                tempTrackListInp.lKeyStyle = {
                    position:'absolute', 
                    visibility:'hidden'
                }
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 26.8em)'
                }
            }
        }

        setTrackListInp(tempTrackListInp);
    },[playlistSongs]);

    const playAll = () => {
        const tracks = document.getElementById(TRACK_LIST);
        if(tracks && tracks.childElementCount > 0){
            tracks.getElementsByClassName("track")[0].children[0].click()
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
            {playlistSongs.length > 0 && trackListInp.playedFrom &&
                <TrackList tracks={playlistSongs} trackListInp={trackListInp} />
            }
        </div>
    );
}