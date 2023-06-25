import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE, DELETE_PLAYLIST_CONF_TEXT, DELETE_PLAYLIST_LABEL, PLAY_ALL_LABEL, REMOVE, TRACKS_LABEL } from "../redux/GPActionTypes";
import { FaPlay } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObj } from "../redux/library/LibraryActions";
import { deltePlaylist } from "../redux/playlist/PlaylistActions";
import { PLAYLIST_DELETE_PLAYLIST_SUCCESS } from "../redux/playlist/PlaylistActionTypes";
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
            primaryBtnAction: REMOVE,
            primaryBtnFun: onDeletePlaylist

        }
        dispatch(setCommonPopupObj(commonPopupObj));
    }

    const onDeletePlaylist = () => {
        console.log("playlistId",playlistId);
        dispatch(deltePlaylist(playlistId))
    }

    useEffect(()=>{
        if(plPhase === PLAYLIST_DELETE_PLAYLIST_SUCCESS){
            dispatch(setCommonPopupObj({showPopup:false}));
            navigate("/playlist");
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
                </div>
            </div>
        </div>
    );
}