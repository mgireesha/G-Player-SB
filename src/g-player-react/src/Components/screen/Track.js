import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ALBUM } from "../redux/GPActionTypes";
import { setShowTrackActionsPopup } from "../redux/library/LibraryActions";
import { playASong, setIsPlaying } from "../redux/player/PlayerActions";
import { getMins } from "../utli";
import { ArtistLink } from "./artist/ArtistLink";
import { TrackActionsPopup } from "./TrackActionsPopup";

export const Track = ({track, playedFrom, index, hideTrackNum}) => {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.player.songPlaying);
    const currentVolume = useSelector(state => state.player.currentVolume);
    //const isPlaying = useSelector(state => state.player.isPlaying);
    const playSong = async(songId) => {
        dispatch(setIsPlaying(true));
        dispatch(playASong(songId,playedFrom,currentVolume));
    }

    // document.addEventListener('contextmenu', function(e) {
    //     alert('Right click');
    //   });

    // document.addEventListener('scroll', (event)=>{
    //     alert("Hi")
    //     const showTrackPopup = {
    //         showTrackPopup: false,
    //         styles:{
    //             top:0,
    //             left:0
    //         }
    //     }
    //     dispatch(setShowTrackActionsPopup(showTrackPopup));
    // }, { passive: true });

    const trackActions = (event) => {
        const styles = {
            top: event.clientY,
            left: event.clientX
        }
        event.preventDefault();
            //event.stopPropogation();
        /*var rightclick;
        const e = window.event;
        console.log("e.which",e.which)
        console.log("e.button",e.button)
        if (e.which) rightclick = (e.which == 3);
        else if (e.button) rightclick = (e.button == 2);
        console.log("rightclick",rightclick)
        
        if(rightclick){
            e.preventDefault();
            e.stopPropagation();
            
        }*/
        if(event.button===2){
            
            const showTrackPopup = {
                showTrackPopup: true,
                styles
            }
            dispatch(setShowTrackActionsPopup(showTrackPopup));
            
        }
    }

    return(
        <div className={songPlaying!==null && track.songId===songPlaying.songId?"track text-highlighted-y":"track"} id={"track-"+track.songId} onContextMenu={(event)=>trackActions(event)}>
            {!hideTrackNum && <label style={{paddingLeft:'5'}}>{playedFrom===ALBUM && track.trackNumber!==undefined && track.trackNumber!==0?track.trackNumber:index+1}</label>}
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