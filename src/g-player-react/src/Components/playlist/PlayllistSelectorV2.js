import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_NEW_PLAYLIST_LABEL, ALBUM, ARTIST, CREATE, CREATE_LABEL, GENRE, GP_CONTEXT_MENU, INPUT, LANGUAGE, MAIN_CONTAINER, NEW_PLAYLIST_BTN_LABEL, PLAYLIST_NAME, PLAYLIST_SELECTOR, TRACK } from "../redux/GPActionTypes";
import { addToPlaylist, createPlaylist, fetchAssignedPlaylists, fetchAssignedPlaylistsSucc, removeFromPlaylist } from "../redux/playlist/PlaylistActions";
import { PLAYLIST_ADD_TO_PLAYLIST_FAIL, PLAYLIST_ADD_TO_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";
import { setCommonPopupObj, setShowContextMenu, setShowPlaylistSelector } from "../redux/library/LibraryActions";
import { HiPlus } from 'react-icons/hi';
import { getCreatePlaylistObj } from "./PlalistUtil";

export const PlaylistSelector = () => {
    const dispatch = useDispatch();
    const playLists = useSelector(state => state.playlist.playlists);
    const contextObj = useSelector(state => state.library.contextObj);
    const plPhase = useSelector(state => state.playlist.phase);
    const assignedPlaylists = useSelector(state => state.playlist.assignedPlaylists);
    const [styles, setStyles] = useState({display:'none'});
    const [obj, setobj] = useState(null);
    const [displayPlaylists, setDisplayPlaylists] = useState([]);

    useEffect(()=>{
        setDisplayPlaylists(playLists?.sort((a,b)=>a.name>b.name?1:-1))
    },[playLists])

    useEffect(()=>{
        if(contextObj.type === TRACK){
            dispatch(fetchAssignedPlaylists(contextObj.type, contextObj.obj.songId));
        }else if(contextObj.type === ALBUM){
          //  console.log(contextObj)
            dispatch(fetchAssignedPlaylistsSucc([]));
        }
        setobj(contextObj.obj);
    },[contextObj])

    useEffect(()=>{
        if(contextObj && contextObj.position){
            const position = contextObj.position;
            const tempStyles = {
                left: parseInt(position.x)+185,
                width: 'auto',
                overflowY:'auto',
                maxHeight:'50vh'
            }
            // const mainContainerHeight = document.getElementById(MAIN_CONTAINER).clientHeight;
            // let gpCtxtMenuHeight = document.getElementById(GP_CONTEXT_MENU).clientHeight;
            // if(gpCtxtMenuHeight === undefined || gpCtxtMenuHeight === 0)gpCtxtMenuHeight = 160;
           
            // if((mainContainerHeight - position.top) > gpCtxtMenuHeight+ 40){
            //     tempStyles.top = parseInt(position.y)+25;
                
            // }else{
            //     tempStyles.top = parseInt(position.y)-gpCtxtMenuHeight;
            // }

            // const mainContainerWidth = document.getElementById(MAIN_CONTAINER).clientWidth;
            // let gpCtxtMenuWidth = document.getElementById(GP_CONTEXT_MENU).clientWidth;
            // if(gpCtxtMenuWidth === undefined || gpCtxtMenuWidth === 0)gpCtxtMenuWidth = 200;
            // if((mainContainerWidth - position.left) < gpCtxtMenuWidth+40){
            //     tempStyles.left = parseInt(position.x)-gpCtxtMenuWidth-154;
            // }
            
            setStyles(tempStyles);
        }
    },[contextObj]);

    const onAddToPlaylist = (playlistId,playlistName) => {
        const reqPLObj = {
            playlist: playlistName,
            playlistId: playlistId
        }
        if(contextObj.type === ALBUM){
            reqPLObj["albumId"] = parseInt(contextObj.obj.albumId);
            reqPLObj["albumName"] = contextObj.obj.albumName;
        }else if(contextObj.type === TRACK){
            reqPLObj["songId"] = contextObj.obj.songId;
            reqPLObj["albumName"] = contextObj.obj.album;
        }else if(contextObj.type === LANGUAGE){
            reqPLObj["language"] = contextObj.obj;
        }else if(contextObj.type === GENRE){
            reqPLObj["genre"] = contextObj.obj;
        }else if(contextObj.type === ARTIST){
            reqPLObj["artist"] = contextObj.obj;
        }
        dispatch(addToPlaylist(reqPLObj));
    }

    useEffect(()=>{
        
        if(plPhase === PLAYLIST_ADD_TO_PLAYLIST_SUCCESS || plPhase === PLAYLIST_ADD_TO_PLAYLIST_FAIL){
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
    const handleOnPlaylistClick = (id, name) => {
        if(assignedPlaylists.includes(name)){
            dispatch(removeFromPlaylist(id, contextObj.obj.songId))
        }else{
            onAddToPlaylist(id, name);
        }
    }

    return(
        <div id={PLAYLIST_SELECTOR} className="playlist-selector-v2" style={styles}>
            <div className="row" style={{gridColumn:'span 4', border:'none', width:'100%'}}>
                {obj && obj.title+" - "+obj.album}
            </div>
            
            {displayPlaylists && displayPlaylists.map(playlist =>
                <div className={assignedPlaylists.includes(playlist.name) ? "selected row" : "row"} onClick={()=>handleOnPlaylistClick(playlist.id,playlist.name)} title={playlist.name}>
                    <label>{playlist.name}</label>
                </div>
            )}
            <div className="row" style={{gridColumn:'span 4', width:'100%'}} onClick={addToNewPlayist}>
                <HiPlus style={{marginTop:4,marginRight:5}} /><label>{NEW_PLAYLIST_BTN_LABEL}</label>
            </div>
        </div>
    );
} 