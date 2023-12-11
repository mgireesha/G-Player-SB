import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ALBUM, ARTIST, CURRENT_PAGE, EDIT_TRACK_INFO_LABEL, PLAYLIST, REMOVE_LABEL, TRACK, TRACK_MENU_BTN_CIRCLE } from "../../redux/GPActionTypes";
import { playASong, playPause, setIsPlaying } from "../../redux/player/PlayerActions";
import { getCookieValue, getMins } from "../../utilities/util";
import { FaPlay } from "react-icons/fa";
import { setContextObj, setMetadataPopupObj, setShowContextMenu } from "../../redux/library/LibraryActions";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineLyrics } from "react-icons/md";
import { removeFromPlaylist } from "../../redux/playlist/PlaylistActions";
import { SplitAndLink } from "../../utilities/SplitAndLink";

export const Track = ({track, playedFrom, index, hideTrackNum}) => {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.player.songPlaying);
    const currentVolume = useSelector(state => state.player.currentVolume);
    const currentPage = useSelector(state => state.library.currentPage);

    const playSong = async(songId) => {
        if(songPlaying!==null && songId===songPlaying.songId){
            dispatch(playPause(songPlaying, playedFrom, currentVolume));
        }else{
            dispatch(setIsPlaying(true));
            dispatch(playASong(songId,playedFrom,currentVolume));
        }
    }

    const showCOntextMenu = (event) => {
        const position = event.target.getBoundingClientRect();
        event.preventDefault();
        const options = [];
        if(playedFrom.pfKey === PLAYLIST){
            options.push({label:REMOVE_LABEL, callBackFunc: removeTrackFromPlaylist});
        }
        options.push({label:EDIT_TRACK_INFO_LABEL, callBackFunc: onSetShowMetadataPopup});
        const contextObj = {
            position,
            type: TRACK,
            obj: track,
            options,
            rowList:[ALBUM, ARTIST]
        }
        dispatch(setContextObj(contextObj));
        dispatch(setShowContextMenu(true));
    }

    const removeTrackFromPlaylist = () => {
        let tempCurrentObject = currentPage;
        if(!tempCurrentObject){
            tempCurrentObject = getCookieValue(CURRENT_PAGE);
        }
        if(tempCurrentObject && tempCurrentObject.type === PLAYLIST){
            dispatch(removeFromPlaylist(tempCurrentObject.id, track.songId));
        }else{
            alert("Error")
        }
    }

    const onSetShowMetadataPopup = () => {
        const metadataPopupObj = {
            showMetadataPopup : true,
            obj:track,
            objType:TRACK
        }
        dispatch(setMetadataPopupObj(metadataPopupObj));
    }

    return(
        <div className={songPlaying!==null && track.songId===songPlaying.songId?"track text-highlighted-y":"track"} id={"track-"+track.songId} onContextMenu={(event)=>showCOntextMenu(event)}>
            {!hideTrackNum && <label style={{paddingLeft:'5'}}>{playedFrom.pfKey===ALBUM && track.trackNumber!==undefined && track.trackNumber!==0?track.trackNumber:index+1}</label>}
            <label onClick={()=>playSong(track.songId)} style={{cursor:'pointer'}} className="title">
                <span>{track.title}{track.lyricsAvl && <MdOutlineLyrics title="This track has lyrics" />}</span>
                <span className="mobile-only-block track-title-artist"><SplitAndLink str={track.artist} url={`/music/artists/`} /></span>
            </label>
            <label className="mobile-only-block song-playing-icon-label">{songPlaying!==null && track.songId===songPlaying.songId ? <FaPlay className="faplay"  />:''}</label>
            <label className="text-overflow-ellipsis" onDoubleClick={()=>playSong(track.songId)} title={track.artist}>
                <SplitAndLink str={track.artist} url={`/music/artists/`} />
            </label>
            <label onDoubleClick={()=>playSong(track.songId)}>
            <Link to={`/music/albums/${track.album}`}>{track.album}</Link>
            </label>
            <label onDoubleClick={()=>playSong(track.songId)}>{track.year!==0?track.year:''}</label>
            <label className="text-overflow-ellipsis" onDoubleClick={()=>playSong(track.songId)} title={track.language}>
                <SplitAndLink str={track.language} url={`/music/languages/`} />
            </label>
            <label>{getMins(track.trackLength)}</label>
            <label style={{position:'relative'}}>
                <div className="track-menu-btn-div">
                    <div id={TRACK_MENU_BTN_CIRCLE} className="track-menu-btn-circle" onClick={(event)=>showCOntextMenu(event)}>
                        <div className="track-menu-btn">
                            <HiOutlineDotsVertical  />
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}