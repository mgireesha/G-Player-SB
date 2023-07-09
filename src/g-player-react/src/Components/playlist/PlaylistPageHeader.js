import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COMMON_POPUP_ERROR_MSG, DELETE, DELETE_PLAYLIST_CONF_TEXT, DELETE_PLAYLIST_LABEL, INPUT, PLAYLIST, PLAY_ALL_LABEL, REMOVE, REMOVE_LABEL, RENAME, RENAME_LABEL, RENAME_PLAYLIST_INP, RENAME_PLAYLIST_LABEL, TEXT, TRACKS_LABEL } from "../redux/GPActionTypes";
import { FaPlay } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiRename } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObj } from "../redux/library/LibraryActions";
import { deltePlaylist, renamePlaylist } from "../redux/playlist/PlaylistActions";
import { PLAYLIST_DELETE_PLAYLIST_SUCCESS, PLAYLIST_RENAME_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";
import { PlaylistImg } from "./PlaylistImg";

export const PlaylistPageHeader = ({albumNames, songsCount, playAll}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { playlistName, playlistId } = useParams();
    const plPhase = useSelector(state => state.playlist.phase);

    const showDeletePlaylistPopup = () => {
        const commonPopupObj = {
            showPopup: true,
            title: DELETE_PLAYLIST_LABEL,
            content: DELETE_PLAYLIST_CONF_TEXT,
            contentType: TEXT,
            primaryBtnAction: REMOVE,
            primaryBtnLabel:REMOVE_LABEL,
            className:"remove",
            primaryBtnFun: onDeletePlaylist

        }
        dispatch(setCommonPopupObj(commonPopupObj));
    }

    const showRenamePlaylistPopup = () => {
        const commonPopupObj = {
            showPopup: true,
            title: RENAME_PLAYLIST_LABEL,
            content: playlistName,
            contentType: INPUT,
            primaryBtnAction: RENAME,
            primaryBtnLabel:RENAME_LABEL,
            className:"rename",
            elementId:RENAME_PLAYLIST_INP,
            primaryBtnFun: onRenamePlaylist

        }
        dispatch(setCommonPopupObj(commonPopupObj));
    }

    const onDeletePlaylist = () => {
        dispatch(deltePlaylist(playlistId))
    }

    const onRenamePlaylist = () => {
        const renameInp = document.getElementById(RENAME_PLAYLIST_INP);
        if(renameInp){
            if(renameInp.value !== playlistName){
                const tempPlaylistName = {
                    messageId : playlistId,
                    value: document.getElementById(RENAME_PLAYLIST_INP).value,
                    name: PLAYLIST,
                    type: PLAYLIST
        
                }
                dispatch(renamePlaylist(tempPlaylistName));
            }else{
                const errMsg = document.getElementById(COMMON_POPUP_ERROR_MSG);
                if(errMsg){
                    errMsg.innerHTML = "Please provide name different than current one.";
                }
            }
            
        }
    }

    useEffect(()=>{
        if(plPhase === PLAYLIST_DELETE_PLAYLIST_SUCCESS){
            dispatch(setCommonPopupObj({showPopup:false}));
            navigate("/playlist");
        }
        if(plPhase === PLAYLIST_RENAME_PLAYLIST_SUCCESS){
            const playlistName = document.getElementById(RENAME_PLAYLIST_INP).value;
            navigate(`/playlist/${playlistName}/${playlistId}`);
            dispatch(setCommonPopupObj({showPopup:false}));
        }
    },[plPhase]);

    return(
        <div className="playlist-page-header">
            <PlaylistImg albumNames={albumNames} />
            <div className="playlist-details">
                <div className="playlist-name">
                    <h2>{playlistName}</h2>
                    <label>{songsCount} {TRACKS_LABEL}</label>
                </div>
                <div className="playlist-actions">
                    <div className="play-all">
                        <button onClick={playAll} ><FaPlay className="faplay"  />{PLAY_ALL_LABEL}</button>
                    </div>
                    <div className="delete-playlist">
                        <button onClick={showDeletePlaylistPopup}><RiDeleteBin6Line />{DELETE}</button>
                    </div>
                    <div className="rename-playlist">
                        <button onClick={showRenamePlaylistPopup}><BiRename />{RENAME_LABEL}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}