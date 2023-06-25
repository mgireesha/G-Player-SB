import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM } from "../redux/GPActionTypes";
import { addToPlaylist } from "../redux/playlist/PlaylistActions";

export const PlaylistSelector = () => {
    const dispatch = useDispatch();
    const playListNames = useSelector(state => state.playlist.playListNames);
    const contextObj = useSelector(state => state.library.contextObj);

    const [styles, setStyles] = useState({display:'none'});
    useEffect(()=>{
        if(contextObj && contextObj.position){
            const position = contextObj.position;
            const tempStyles = {
                position:'absolute',
                left: parseInt(position.x)+parseInt(position.width)-5,
                top: parseInt(position.y)+35,
                width: parseInt(position.width),
                backgroundColor:'#AB3C3C',
                borderRadius:2,
                zIndex:1000
            }
            setStyles(tempStyles);
        }
    },[contextObj]);

    const onAddToPlaylist = (playlistId,playlistName) => {
        const reqPLObj = {
            playlist: playlistName,
            playlistId: playlistId
        }
        if(contextObj.type === ALBUM){
            reqPLObj["albumId"] = contextObj.obj.albumId;
            reqPLObj["albumName"] = contextObj.obj.album;
        }
        dispatch(addToPlaylist(reqPLObj));
    }

    return(
        <div id="playlist_selector" className="playlist-selector" style={styles}>
            {playListNames && playListNames.map(playlistName =>
                <div className="row" onClick={()=>onAddToPlaylist(playlistName.messageId,playlistName.value)}>
                    <label>{playlistName.value}</label>
                </div>
            )}
        </div>
    );
} 