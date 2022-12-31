import React, { useEffect } from "react";
import { Player } from "./player/Player";
import { Sidebar } from "./Sidebar";
import { Screen } from "./screen/Screen";
import { useDispatch } from "react-redux";
import { fetchAlbumImgs, fetchAllAlbums, fetchAllAlbumsDtls, fethAllSongs } from "./redux/library/LibraryActions";
import { fetchCurrentSontAndStatus, fettchCurrentSongStatus, playASongSucc, setIsRepeat, setIsShuffle, setMediaVolume } from "./redux/player/PlayerActions";
import { getCookieDetails } from "./utli";
import { TRACK_LIST } from "./redux/GPActionTypes";
import { Route, Routes } from "react-router-dom";
import { Library } from "./Library";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fethAllSongs());
        //dispatch(fetchAlbumImgs());
        dispatch(fetchAllAlbumsDtls());
        dispatch(fetchAllAlbums());
        //dispatch(fetchCurrentSontAndStatus());
        getSetCookieDetails();
    },[]);

    const getSetCookieDetails = () =>{
        const cookieDetails = getCookieDetails();
        if(cookieDetails["isRepeat"]!==undefined){
            dispatch(setIsRepeat(cookieDetails["isRepeat"]==='true'));
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
                <Route path="/library/*" element={<Library/>} />
            </Routes>
            <Player />
        </div>
    );
}