import React, { useEffect } from "react";
import { Player } from "./player/Player";
import { Sidebar } from "./Sidebar";
import { Screen } from "./screen/Screen";
import { useDispatch } from "react-redux";
import { fetchAlbumImgs, fetchAllAlbumsDtls, fethAllSongs } from "./redux/library/LibraryActions";
import { fetchCurrentSontAndStatus, fettchCurrentSongStatus, setIsRepeat, setIsShuffle } from "./redux/player/PlayerActions";
import { getCookieDetails } from "./utli";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fethAllSongs());
        dispatch(fetchAlbumImgs());
        dispatch(fetchAllAlbumsDtls());
        dispatch(fetchCurrentSontAndStatus());
        getSetCookieDetails();
    },[]);

    const getSetCookieDetails = () =>{
        const cookieDetails = getCookieDetails();
        if(cookieDetails["isRepeat"]!==undefined){
            dispatch(setIsRepeat(cookieDetails["isRepeat"]));
        }
        if(cookieDetails["isShuffle"]!==undefined){
            dispatch(setIsShuffle(cookieDetails["isShuffle"]));
        }
    }

    return(
        <div className="main-container">
            <Sidebar />
            <Screen />
            <Player />
        </div>
    );
}