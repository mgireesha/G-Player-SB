import React, { useEffect } from "react";
import { Player } from "./player/Player";
import { Sidebar } from "./Sidebar";
import { Screen } from "./screen/Screen";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumTacks, fetchAllAlbums, fetchAllHistory, fetchSongsByArtist, fethAllSongs } from "./redux/library/LibraryActions";
import { fetchCurrentSontAndStatus, playASongSucc, setIsShuffle, setMediaVolumeSucc, setRepeat } from "./redux/player/PlayerActions";
import { getCookieDetails, getCookieValue } from "./utli";
import { ALBUM, ARTIST, MAIN_CONTAINER, RECENT_PLAYS, TRACK_LIST } from "./redux/GPActionTypes";
import { Route, Routes } from "react-router-dom";
import { Library } from "./library/Library";
import { Search } from "./search/Search";
import { RecentPlays } from "./history/RecentPlays";
import { Playlist } from "./playlist/Playlist";
import { fetchPlaylistNames } from "./redux/playlist/PlaylistActions";
import { PlaylistSelector } from "./playlist/PlayllistSelector";
import { CommonPopup } from "./CommnPopup";
import { GPContexMenu } from "./screen/GPContextMenu";

export const Home = () => {
    const dispatch = useDispatch();
    const showContextMenu = useSelector(state => state.library.showContextMenu);
    const showPlaylistSelector = useSelector(state => state.library.showPlaylistSelector);
    useEffect(()=>{
        dispatch(fetchPlaylistNames());
        //dispatch(fetchAlbumImgs());
        //dispatch(fetchAllAlbumsDtls());
        dispatch(fetchAllAlbums());
        //dispatch(fetchCurrentSontAndStatus());
        getSetCookieDetails();
        fetchTracks();
        
    },[]);

    const getSetCookieDetails = () =>{
        const cookieDetails = getCookieDetails();
        if(cookieDetails["repeat"]!==undefined){
            dispatch(setRepeat(cookieDetails["repeat"]));
        }
        if(cookieDetails["isShuffle"]!==undefined){
            dispatch(setIsShuffle(cookieDetails["isShuffle"]==='true'));
        }
        if(cookieDetails["songPlaying"]!==undefined){
            const response={library: atob(JSON.parse(cookieDetails["songPlaying"]))};
            dispatch(playASongSucc(response,cookieDetails["playedFrom"]!==undefined?cookieDetails["playedFrom"]:TRACK_LIST));
        }else{
            dispatch(fetchCurrentSontAndStatus());
        }
        if(cookieDetails["currentVolume"]!==undefined){
            dispatch(setMediaVolumeSucc({currentVolume:cookieDetails["currentVolume"]}));
        }
    }

    const fetchTracks = () => {
        let playedFromCookieValue = getCookieValue("playedFrom");
        if(playedFromCookieValue!==undefined){
            playedFromCookieValue = JSON.parse(playedFromCookieValue);
        if(playedFromCookieValue.pfKey!==undefined){
            switch (playedFromCookieValue.pfKey) {
                case ALBUM:
                    dispatch(fetchAlbumTacks(playedFromCookieValue.pfVal));
                    break;
                case ARTIST:
                    dispatch(fetchSongsByArtist(playedFromCookieValue.pfVal));
                    break;
                case RECENT_PLAYS:
                    dispatch(fetchAllHistory());
                    break;
                default:
                    dispatch(fethAllSongs());
                    break;
            }
        }else{
            dispatch(fethAllSongs());
        }
        }
    }

    return(
        <div className="main-container" id={MAIN_CONTAINER}>
            <Sidebar />
            <Routes>
                <Route path="/music/*" element={<Screen/>} />
                <Route path="/search/:searchKey" element={<Search/>} />
                <Route path="/recent" element={<RecentPlays />} />
                <Route path="/library/*" element={<Library/>} />
                <Route path="/playlist/*" element={<Playlist/>} />
                <Route path="/*" element={<Screen/>} />
            </Routes>
            <Player />
            {showContextMenu && <GPContexMenu />}
            {showPlaylistSelector && <PlaylistSelector />}
            <CommonPopup />
        </div>
    );
}