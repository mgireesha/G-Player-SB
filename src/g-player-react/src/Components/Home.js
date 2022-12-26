import React, { useEffect } from "react";
import { Player } from "./player/Player";
import { Sidebar } from "./Sidebar";
import { Screen } from "./screen/Screen";
import { useDispatch } from "react-redux";
import { fetchAlbumImgs, fetchAllAlbumsDtls, fethAllSongs } from "./redux/library/LibraryActions";
import { fetchCurrentSontAndStatus, fettchCurrentSongStatus } from "./redux/player/PlayerActions";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fethAllSongs());
        dispatch(fetchAlbumImgs());
        dispatch(fetchAllAlbumsDtls());
        dispatch(fetchCurrentSontAndStatus());
    },[]);

    return(
        <div className="main-container">
            <Sidebar />
            <Screen />
            <Player />
        </div>
    );
}