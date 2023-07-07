import React from "react";
import { CreatePlayListBtn } from "./CreatePlayListBtn";
import { Link } from "react-router-dom";
import def_album_art from '../images/def_album_art.png';
import { useSelector } from "react-redux";
import { PlaylistImg } from "./PlaylistImg";

export const Playlists = () => {
    const playListNames = useSelector(state => state.playlist.playListNames);
    const playlistAlbums = useSelector(state => state.playlist.playlistAlbums);
    const playlistSongsCount = useSelector(state => state.playlist.playlistSongsCount);
    return(
        <div className="playlists">
            <div className="body">
                <CreatePlayListBtn />
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