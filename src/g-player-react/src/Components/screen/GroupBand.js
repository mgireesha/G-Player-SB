import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ALBUMS, ALBUMS_LABEL, ALBUM_ARTISTS, ALBUM_ARTISTS_LABEL, ARTISTS, ARTISTS_LABEL, GENRES, GENRES_LABEL, TRACKS_LABEL, TRACK_LIST } from "../redux/GPActionTypes";

export const GroupBand = () => {
    const groupBand = useSelector(state => state.library.groupBand);
    const [selectedBand, setSelectedBand] = useState('');
    const locationL = useLocation();
    useEffect(()=>{
        let uri = locationL.pathname;
        if(uri!==null && uri!==''){
            if(uri.startsWith("/music/tracks")){
                setSelectedBand(TRACK_LIST);
            }else if(uri.startsWith("/music/albums")){
                setSelectedBand(ALBUMS);
            }else if(uri.startsWith("/music/album_artists")){
                setSelectedBand(ALBUM_ARTISTS);
            }else if(uri.startsWith("/music/artists")){
                setSelectedBand(ARTISTS);
            }else if(uri.startsWith("/music/genres")){
                setSelectedBand(GENRES);
            }else{
                setSelectedBand('');
            }
        }
    },[locationL]);
    return(
        <div className="group-band">
            <div className={selectedBand===TRACK_LIST?"traks-band group-band-highlight":"traks-band"}>
                <Link to="/music/tracks"><h3>{TRACKS_LABEL}</h3></Link>
            </div>
            <div className={selectedBand===ALBUMS?"albums-band group-band-highlight":"albums-band"}>
                <Link to="/music/albums"><h3>{ALBUMS_LABEL}</h3></Link>
            </div>
            <div className={selectedBand===ALBUM_ARTISTS?"album_artists-band group-band-highlight":"album_artists-band"}>
                <Link to="/music/album_artists"><h3>{ALBUM_ARTISTS_LABEL}</h3></Link>
            </div>
            <div className={selectedBand===ARTISTS?"artists-band group-band-highlight":"artists-band"}>
                <Link to="/music/artists"><h3>{ARTISTS_LABEL}</h3></Link>
            </div>
            <div className={selectedBand===GENRES?"genres-band group-band-highlight":"genres-band"}>
                <Link to="/music/genres"><h3>{GENRES_LABEL}</h3></Link>
            </div>
        </div>
    );
}