import React from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { NEW_PLAYLIST_BTN_LABEL } from "../redux/GPActionTypes";
import { useDispatch } from "react-redux";
import { setShowCreatePlaylistPopup } from "../redux/playlist/PlaylistActions";

export const CreatePlayListBtn = () => {
    const dispatch = useDispatch();
    return(
        <div className="create-playlist">
            <div className="create-playlist-btn" onClick={()=>dispatch(setShowCreatePlaylistPopup(true))}>
                <span>{NEW_PLAYLIST_BTN_LABEL}</span>
            </div>
        </div>
    );
}