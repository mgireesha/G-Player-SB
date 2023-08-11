import React, { useEffect, useState } from "react";
import { CreatePlayListBtn } from "./CreatePlayListBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlaylistImg } from "./PlaylistImg";
import { ImportExportPlaylistBtn } from "./ImportExportPlaylistBtn";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, PLAYLISTS } from "../redux/GPActionTypes";
import { setCookies } from "../utilities/util";
import { SortingContainer } from "../screen/SortingContainer";

export const Playlists = () => {
    const playListNames = useSelector(state => state.playlist.playListNames);
    const playlistAlbums = useSelector(state => state.playlist.playlistAlbums);
    const playlistSongsCount = useSelector(state => state.playlist.playlistSongsCount);

    const [sortBy, setSortBy] = useState(A_TO_Z);
    const [sortedPlaylistNames, setSortedPlaylistNames] = useState([]);

    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:PLAYLISTS}));
    },[]);

    useEffect(()=>{
        let tempPlaylistNames = [...playListNames];
        if(sortBy === A_TO_Z){
            tempPlaylistNames = tempPlaylistNames.sort((a,b)=>{return a.value>b.value?1:-1});
        }else{
            tempPlaylistNames = tempPlaylistNames.sort((a,b)=>{return a.value>b.value?-1:1});
        }
        setSortedPlaylistNames(tempPlaylistNames);
    },[playListNames, sortBy]);

    return(
        <div className="playlists">
            <div className="body">
                <div className="playlists-action">
                    <SortingContainer setSortBy={setSortBy} sortBy={sortBy} showLKey={false} sortSelectors={[A_TO_Z,A_TO_Z_DESC]} />
                    <CreatePlayListBtn />
                    <ImportExportPlaylistBtn />
                </div>
                <div className="playlist-list">
                    {sortedPlaylistNames && sortedPlaylistNames.length > 0 && sortedPlaylistNames.map((plName, i)=>
                        <div className="plalist-thumb" key={i}>
                            <Link to={`/playlist/${plName.value}/${plName.messageId}`}>
                                <div className="playlist-thumb-img-div">
                                    <PlaylistImg albumNames={playlistAlbums[plName.messageId]} />
                                </div>
                            </Link>
                            <div className="playlist-thumb-details">
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