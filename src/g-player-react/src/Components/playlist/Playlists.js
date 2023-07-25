import React, { useEffect } from "react";
import { CreatePlayListBtn } from "./CreatePlayListBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlaylistImg } from "./PlaylistImg";
import { ImportExportPlaylistBtn } from "./ImportExportPlaylistBtn";
import { CURRENT_PAGE, PLAYLISTS } from "../redux/GPActionTypes";
import { setCookies } from "../utilities/util";

export const Playlists = () => {
    const playListNames = useSelector(state => state.playlist.playListNames);
    const playlistAlbums = useSelector(state => state.playlist.playlistAlbums);
    const playlistSongsCount = useSelector(state => state.playlist.playlistSongsCount);

    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:PLAYLISTS}));
    },[])

    return(
        <div className="playlists">
            <div className="body">
                <div className="playlists-action">
                    <CreatePlayListBtn />
                    <ImportExportPlaylistBtn />
                </div>
                <div className="playlist-list">
                    {playListNames !== undefined && playListNames.length > 0 && playListNames.map((plName)=>
                        <div className="plalist-thumb">
                            <Link to={`/playlist/${plName.value}/${plName.messageId}`}>
                                <div className="playlist-thumb-img-div">
                                    <PlaylistImg albumNames={playlistAlbums[plName.messageId]} />
                                </div>
                            </Link>
                            <div class="playlist-thumb-details">
                                <Link to={`/playlist/${plName.value}/${plName.messageId}`}>
                                    <label>{plName.value}</label><br />
                                    <label>{playlistSongsCount[plName.messageId]} songs</label>
                                </Link>
                            </div>
                        </div>
                    )
                    }
                </div>               
            </div>
        </div>
    );
}