import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_NEW_PLAYLIST_LABEL, ALBUM, CREATE, CREATE_LABEL, GP_CONTEXT_MENU, INPUT, MAIN_CONTAINER, NEW_PLAYLIST_BTN_LABEL, PLAYLIST_NAME, PLAYLIST_SELECTOR, TRACK } from "../redux/GPActionTypes";
import { addToPlaylist, createPlaylist, setAddedNewPlaylistObj, setIsAddToNewPlaylist } from "../redux/playlist/PlaylistActions";
import { PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_CREATE_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";
import { setCommonPopupObj, setShowContextMenu, setShowPlaylistSelector } from "../redux/library/LibraryActions";
import { HiPlus } from 'react-icons/hi';
import { getCreatePlaylistObj } from "./PlalistUtil";

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
                width: 150,
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
                tempStyles.left = parseInt(position.x)-gpCtxtMenuWidth-154;
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
        }else if(contextObj.type === TRACK){
            reqPLObj["songId"] = contextObj.obj.songId;
            reqPLObj["albumName"] = contextObj.obj.album;
        }
        dispatch(addToPlaylist(reqPLObj));
    }

    useEffect(()=>{
        if(plPhase === PLAYLIST_ADD_TO_PLAYLIST_SUCCESS){
            dispatch(setShowPlaylistSelector(false));
            dispatch(setShowContextMenu(false));
        }
        
    },[plPhase]);

    const addToNewPlayist = () => {
        const addToNewPLPopupObj = {
            showPopup: true,
            title: ADD_TO_NEW_PLAYLIST_LABEL,
            content: "Untitled Playlist",
            placeHolder:'New Playlist Name',
            contentType: INPUT,
            primaryBtnAction: CREATE,
            primaryBtnLabel:CREATE_LABEL,
            className:"create",
            elementId:PLAYLIST_NAME,
            primaryBtnFun: onAddToNewPlaylist
        }
        dispatch(setCommonPopupObj(addToNewPLPopupObj));
    }

    const onAddToNewPlaylist = () => {
        const createPlaylistObj = getCreatePlaylistObj();
        createPlaylistObj.addedNewPlaylistObj = {isAddToNewPlaylist: true};
        dispatch(createPlaylist(createPlaylistObj));
    }

    return(
        <div id={PLAYLIST_SELECTOR} className="playlist-selector" style={styles}>
            <div className="row" style={{display:'flex'}} onClick={addToNewPlayist}>
                <HiPlus style={{marginTop:4,marginRight:5}} /><label>{NEW_PLAYLIST_BTN_LABEL}</label>
            </div>
            {playListNames && playListNames.map(playlistName =>
                <div className="row" onClick={()=>onAddToPlaylist(playlistName.messageId,playlistName.value)}>
                    <label>{playlistName.value}</label>
                </div>
            )}
        </div>
    );
} 