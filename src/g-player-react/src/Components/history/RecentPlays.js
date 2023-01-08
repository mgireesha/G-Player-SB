import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RECENT_PLAYS, TRACK_LIST } from "../redux/GPActionTypes";
import { fetchAllHistory } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { AlbumThumb } from "../screen/AlbumThumb";
import { Track } from "../screen/Track";
import { scrollToPlaying } from "../utli";

export const RecentPlays = () => {
    const dispatch = useDispatch();
    const historyTracks = useSelector(state => state.library.history.songs);
    const historyAlbums = useSelector(state => state.library.history.albums);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const isPlaying = useSelector(state => state.player.isPlaying);
    
    useEffect(()=>{
        dispatch(setPlayedFrom(RECENT_PLAYS));
    },[])

    useEffect(()=>{
        dispatch(fetchAllHistory());
    },[songPlaying])

    useEffect(()=>{
        scrollToPlaying(isPlaying);
    },[historyTracks])
    
    return(
        <div className="recent-plays">
            <div className="header">
                <h1>Recently Played</h1>
            </div>
            <div className="body">
                {historyAlbums!==undefined && historyAlbums.length>0 &&
                    <div className="albums">
                        <h3>Albums</h3>
                        <div className="album-list">
                            {historyAlbums.map((album, index) =>
                                <AlbumThumb album={album} key={index} />
                            )}
                        </div>
                    </div>
                }
                <div className="track-list">
                    <h3>Tracks</h3>
                    {historyTracks!==undefined && historyTracks.length>0 && historyTracks.map((track, index)=>
                        <Track track={track} key={index} playedFrom={RECENT_PLAYS} index={index} />
                    )}
                </div>
            </div>
        </div>
    );
}