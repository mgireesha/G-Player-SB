import React from "react";
import { CREATE, CREATE_PLAYLIST_LABEL, INPUT, NEW_PLAYLIST_BTN_LABEL, PLAYLIST_NAME } from "../redux/GPActionTypes";
import { useDispatch } from "react-redux";
import { createPlaylist, setShowCreatePlaylistPopup } from "../redux/playlist/PlaylistActions";
import { setCommonPopupObj } from "../redux/library/LibraryActions";

export const CreatePlayListBtn = () => {
    const dispatch = useDispatch();
    
    const showCreatePlaylistPopup = () => {
        const commonPopupObj = {
            showPopup: true,
            title: CREATE_PLAYLIST_LABEL,
            contentType: INPUT,
            placeHolder:'Playlist Name',
            primaryBtnAction: CREATE,
            elementId: PLAYLIST_NAME,
            primaryBtnFun: onCreatePlalist

        }
        dispatch(setCommonPopupObj(commonPopupObj));
    }

    const onCreatePlalist = () => {
		const playlistName = document.getElementById(PLAYLIST_NAME);
		if(!playlistName || playlistName.value === ""){
			if(playlistName)playlistName.style.border = '1px solid red';
			return;
		}
		playlistName.style.border = '1px solid lightgrey';
		const createPlaylistObj = {
			"name":"PLAYLIST",
			"value":playlistName.value,
			"type":"PLAYLIST"
			}
		dispatch(createPlaylist(createPlaylistObj));
	}

    return(
        <div className="create-playlist">
            <div className="create-playlist-btn" onClick={showCreatePlaylistPopup}>
                <span>{NEW_PLAYLIST_BTN_LABEL}</span>
            </div>
        </div>
    );
}