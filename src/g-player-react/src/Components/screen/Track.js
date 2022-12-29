import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ALBUM } from "../redux/GPActionTypes";
import { playASong, setIsPlaying } from "../redux/player/PlayerActions";
import { getMins } from "../utli";
import { ArtistLink } from "./artist/ArtistLink";

export const Track = ({track, playedFrom, index}) => {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.player.songPlaying);
    const currentVolume = useSelector(state => state.player.currentVolume);
    //const isPlaying = useSelector(state => state.player.isPlaying);
    const playSong = async(songId) => {
        dispatch(setIsPlaying(true));
        dispatch(playASong(songId,playedFrom,currentVolume));
    }

    return(
        <div className={songPlaying!==null && track.songId===songPlaying.songId?"track text-highlighted-y":"track"} id={"track-"+track.songId}>
            <label style={{paddingLeft:'5'}}>{playedFrom===ALBUM && track.trackNumber!==undefined?track.trackNumber:index+1}</label>
            <label onClick={()=>playSong(track.songId)} style={{cursor:'pointer'}}>{track.title}</label>
            <label onDoubleClick={()=>playSong(track.songId)}>
                <ArtistLink artist={track.artist} />
            </label>
            <label onDoubleClick={()=>playSong(track.songId)}>
            <Link to={`/music/albums/${track.album}`}>{track.album}</Link>
            </label>
            <label onDoubleClick={()=>playSong(track.songId)}>{track.year!==0?track.year:''}</label>
            <label onDoubleClick={()=>playSong(track.songId)}>{track.genre}</label>
            <label>{getMins(track.trackLength)}</label>
        </div>
    );
}