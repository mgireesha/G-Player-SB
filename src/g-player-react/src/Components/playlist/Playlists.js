import React from "react";
import { CreatePlayListBtn } from "./CreatePlayListBtn";
import { Link } from "react-router-dom";
import def_album_art from '../images/def_album_art.png';
import { useSelector } from "react-redux";

export const Playlists = () => {
    const playListNames = useSelector(state => state.playlist.playListNames);
    return(
        <div className="playlists">
            <div className="body">
                <CreatePlayListBtn />
                <div className="playlist-list">
                    {playListNames !== undefined && playListNames.length > 0 && playListNames.map((plName)=>
                        <div className="plalist-thumb">
                            <div className="playlist-thumb-img-div">
                                <Link to={`/playlist/${plName.value}/${plName.messageId}`}>
                                    <img src={def_album_art} />
                                </Link>
                            </div>
                            <div class="playlist-thumb-details">
                                <label><Link to={`/playlist/${plName.value}/${plName.messageId}`}>{plName.value}</Link></label>
                            </div>
                        </div>
                    )
                    }
                </div>               
            </div>
        </div>
    );
}