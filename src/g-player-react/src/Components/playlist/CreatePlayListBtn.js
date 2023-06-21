import React from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { NEW_PLAYLIST_BTN_LABEL } from "../redux/GPActionTypes";

export const CreatePlayListBtn = () => {
    return(
        <div className="create-playlist">
            <div className="create-playlist-btn">
                <HiPlusSmall />
                <span>{NEW_PLAYLIST_BTN_LABEL}</span>
            </div>
        </div>
    );
}