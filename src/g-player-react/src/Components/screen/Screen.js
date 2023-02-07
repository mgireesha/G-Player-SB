import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Album } from "./Album";
import { AlbumArtistList } from "./artist/AlbumArtistList";
import { AlbumList } from "./AlbumList";
import { Artist } from "./artist/Artist";
import { ArtistsList } from "./artist/ArtistsList";
import { GroupBand } from "./GroupBand";
import { TrackList } from "./TrackList";
import { AlbumArtist } from "./artist/AlbumArtist";
import { Music } from "./Music";
import { TrackActionsPopup } from "./TrackActionsPopup";
import { useDispatch, useSelector } from "react-redux";
import { setShowTrackActionsPopup } from "../redux/library/LibraryActions";
import { TRACK_LIST } from "../redux/GPActionTypes";

export const Screen = () => {
    const dispatch = useDispatch();
    const showTrackPopup = useSelector(state => state.library.showTrackPopup);
    // const closeTrackActions = () => {
    //     alert("closeTrackActions");
    //     const showTrackPopup = {
    //         showTrackPopup: false,
    //         styles:{
    //             top:0,
    //             left:0
    //         }
    //     }
    //     dispatch(setShowTrackActionsPopup(showTrackPopup));
    // }

    let clearCTA;
    const closeTrackActions = () => {
        if(clearCTA)clearTimeout(clearCTA);
        clearCTA = setTimeout(() => {
            console.log("closeTrackActions");
        const showTrackPopup = {
            showTrackPopup: false,
            styles:{
                top:0,
                left:0
            }
        }
            dispatch(setShowTrackActionsPopup(showTrackPopup));
        }, 500);
        
    }

    const trackListElem = document.getElementById(TRACK_LIST);
    if(trackListElem!==null)trackListElem.addEventListener('scroll', closeTrackActions);
    return(
        <div className="screen"  id='screen'>
            <div className="header">
                <h1 style={{fontWeight:'500'}}><Link to='/music'>Music</Link></h1>
            </div>
            <GroupBand />
            <Routes>
                <Route path='/' element={<Music />} />
                <Route path='tracks' element={<TrackList />} />
                <Route path='tracks' element={<TrackList />} />
                <Route path='albums/:albumName' element={<Album />} />
                <Route path='albums' element={<AlbumList />} />
                <Route path='artists/:artist' element={<Artist />} />
                <Route path='artists' element={<ArtistsList />} />
                <Route path='album_artists/:albumArtist' element={<AlbumArtist />} />
                <Route path='album_artists' element={<AlbumArtistList />} />
            </Routes>
            {showTrackPopup.showTrackPopup!==undefined && showTrackPopup.showTrackPopup && <TrackActionsPopup styles={showTrackPopup.styles} />}
        </div>
    );
}