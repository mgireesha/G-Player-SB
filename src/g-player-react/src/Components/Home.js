import React, { useEffect } from "react";
import { Player } from "./player/Player";
import { Sidebar } from "./Sidebar";
import { Screen } from "./screen/Screen";
import { useDispatch } from "react-redux";
import { fetchAllAlbums, fethAllSongs, setShowTrackActionsPopup } from "./redux/library/LibraryActions";
import { fetchCurrentSontAndStatus, playASongSucc, setIsShuffle, setMediaVolume, setRepeat } from "./redux/player/PlayerActions";
import { getCookieDetails } from "./utli";
import { TRACK_LIST } from "./redux/GPActionTypes";
import { Route, Routes } from "react-router-dom";
import { Library } from "./library/Library";
import { Search } from "./search/Search";
import { RecentPlays } from "./history/RecentPlays";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fethAllSongs());
        //dispatch(fetchAlbumImgs());
        //dispatch(fetchAllAlbumsDtls());
        dispatch(fetchAllAlbums());
        //dispatch(fetchCurrentSontAndStatus());
        getSetCookieDetails();
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
            dispatch(setMediaVolume(cookieDetails["currentVolume"]));
        }
    }

    return(
        <div className="main-container">
            <Sidebar />
            <Routes>
                <Route path="/music/*" element={<Screen/>} />
                <Route path="/search/:searchKey" element={<Search/>} />
                <Route path="/recent" element={<RecentPlays />} />
                <Route path="/library/*" element={<Library/>} />
                <Route path="/*" element={<Screen/>} />
            </Routes>
            <Player />
        </div>
    );
}