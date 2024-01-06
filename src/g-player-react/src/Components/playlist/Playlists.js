import React, { useEffect, useState } from "react";
import { CreatePlayListBtn } from "./CreatePlayListBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlaylistImg } from "./PlaylistImg";
import { ImportExportPlaylistBtn } from "./ImportExportPlaylistBtn";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, PLAYLISTS, SORT_A_TO_Z, SORT_A_TO_Z_DESC } from "../redux/GPActionTypes";
import { setCookies } from "../utilities/util";
import { SortingContainer } from "../screen/SortingContainer";

export const Playlists = () => {
    const playListNames = useSelector(state => state.playlist.playListNames);
    const playlistAlbums = useSelector(state => state.playlist.playlistAlbums);
    const playlistSongsCount = useSelector(state => state.playlist.playlistSongsCount);

    const [sortBy, setSortBy] = useState(A_TO_Z);

    const globalFilterText = useSelector(state => state.library.globalFilterText);

    const [sortedPlaylistNames, setSortedPlaylistNames] = useState([]);
    const [filteredPlaylistNames, setFilteredPlaylistNames] = useState([]);

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

    useEffect(() => {
        if (globalFilterText && globalFilterText.length > 2) {
            let tempFilteredPlaylistNames = [...sortedPlaylistNames];
            setFilteredPlaylistNames(tempFilteredPlaylistNames.filter(tpln=>tpln.value.toLowerCase().includes(globalFilterText)));
        } else {
            setFilteredPlaylistNames(sortedPlaylistNames);
        }
    }, [globalFilterText,sortedPlaylistNames]);

    return(
        <div className="playlists">
            <div className="body">
                <div className="playlists-action">
                    <SortingContainer setSortBy={setSortBy} sortBy={sortBy} showLKey={false} sortSelectors={[SORT_A_TO_Z,SORT_A_TO_Z_DESC]} />
                    <CreatePlayListBtn />
                    <ImportExportPlaylistBtn />
                </div>
                <div className="playlist-list">
                    {filteredPlaylistNames && filteredPlaylistNames.length > 0 && filteredPlaylistNames.map((plName, i)=>
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