import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM, GP_CONTEXT_MENU, MAIN_CONTAINER, PLAYLIST_SELECTOR } from "../redux/GPActionTypes";
import { addToPlaylist } from "../redux/playlist/PlaylistActions";
import { PLAYLIST_ADD_TO_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";
import { setShowContextMenu, setShowPlaylistSelector } from "../redux/library/LibraryActions";

export const PlaylistSelector = () => {
    const dispatch = useDispatch();
    const playListNames = useSelector(state => state.playlist.playListNames);
    const contextObj = useSelector(state => state.library.contextObj);
    const plPhase = useSelector(state => state.playlist.phase);

    const [styles, setStyles] = useState({display:'none'});
    useEffect(()=>{
        if(contextObj && contextObj.position){
            const position = contextObj.position;
            const tempStyles = {
                left: parseInt(position.x)+185,
                width: parseInt(position.width),
            }
            const mainContainerHeight = document.getElementById(MAIN_CONTAINER).clientHeight;
            let gpCtxtMenuHeight = document.getElementById(GP_CONTEXT_MENU).clientHeight;
            if(gpCtxtMenuHeight === undefined || gpCtxtMenuHeight === 0)gpCtxtMenuHeight = 160;
           
            if((mainContainerHeight - position.top) > gpCtxtMenuHeight+ 40){
                tempStyles.top = parseInt(position.y)+25;
                
            }else{
                tempStyles.top = parseInt(position.y)-gpCtxtMenuHeight;
            }

            const mainContainerWidth = document.getElementById(MAIN_CONTAINER).clientWidth;
            let gpCtxtMenuWidth = document.getElementById(GP_CONTEXT_MENU).clientWidth;
            if(gpCtxtMenuWidth === undefined || gpCtxtMenuWidth === 0)gpCtxtMenuWidth = 200;
            if((mainContainerWidth - position.left) < gpCtxtMenuWidth+40){
                tempStyles.left = parseInt(position.x)-151;
            }
            
            setStyles(tempStyles);
        }
    },[contextObj]);

    const onAddToPlaylist = (playlistId,playlistName) => {
        const reqPLObj = {
            playlist: playlistName,
            playlistId: playlistId
        }
        if(contextObj.type === ALBUM){
            reqPLObj["albumId"] = contextObj.obj.albumId;
            reqPLObj["albumName"] = contextObj.obj.album;
        }
        dispatch(addToPlaylist(reqPLObj));
    }

    useEffect(()=>{
        if(plPhase === PLAYLIST_ADD_TO_PLAYLIST_SUCCESS){
            dispatch(setShowPlaylistSelector(false));
            dispatch(setShowContextMenu(false))
        }
    },[plPhase]);

    return(
        <div id={PLAYLIST_SELECTOR} className="playlist-selector" style={styles}>
            {playListNames && playListNames.map(playlistName =>
                <div className="row" onClick={()=>onAddToPlaylist(playlistName.messageId,playlistName.value)}>
                    <label>{playlistName.value}</label>
                </div>
            )}
        </div>
    );
} 