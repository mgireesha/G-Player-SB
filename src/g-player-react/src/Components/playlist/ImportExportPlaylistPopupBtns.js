import React from "react";
import { EXPORT_LABEL } from "../redux/GPActionTypes";
import { useDispatch } from "react-redux";
import { exportPlaylists } from "../redux/playlist/PlaylistActions";

export const ImportExportPlaylistPopupBtns = () => {
    const dispatch = useDispatch();
    return(
        <div className="import-export-playlist-popup-btns">
            <div className="export-playlist">
                <button className="export-playlist-btn" onClick={()=>dispatch(exportPlaylists())}>
                    <spna>{EXPORT_LABEL}</spna>
                </button>
            </div>
        </div>
    );
}