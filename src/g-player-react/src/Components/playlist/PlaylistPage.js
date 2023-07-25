import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlaylistNames, fetchSongsInPlaylist } from "../redux/playlist/PlaylistActions";
import { TrackList } from "../screen/track/TrackList";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, PLAYLIST, SORT_YEAR, TRACK_LIST } from "../redux/GPActionTypes";
import { PlaylistPageHeader } from "./PlaylistPageHeader";
import { setCookies } from "../utilities/util";
import { setCurrentPage } from "../redux/library/LibraryActions";

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const { playlistName, playlistId } = useParams();

    const playlistSongs = useSelector(state => state.playlist.playlistSongs);
    const playlistAlbums = useSelector(state => state.playlist.playlistAlbums);
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
                pfVal:playlistId,
                pfField:{name:playlistName}
            },
            sortSelectors:[A_TO_Z,A_TO_Z_DESC, SORT_YEAR],
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
                    maxHeight : 'calc(100vh - 30.8em)'
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

    return(
        <div className="playlist-page">
            <PlaylistPageHeader albumNames={playlistAlbums[playlistId]} songsCount={playlistSongs.length} playAll={playAll} />
            {playlistSongs.length > 0 && trackListInp.playedFrom &&
                <TrackList tracks={playlistSongs} trackListInp={trackListInp} />
            }
        </div>
    );
}