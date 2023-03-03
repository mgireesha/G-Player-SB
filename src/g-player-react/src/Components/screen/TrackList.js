import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, TRACK_LIST, SORT_YEAR, SORT_ARTIST, A_TO_Z_DESC } from "../redux/GPActionTypes";
import { fethAllSongs } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { scrollToPlaying, sortGroupByField } from "../utli";
import { SortingContainer } from "./SortingContainer";
import { Spinner } from "./Spinner";
import { Track } from "./Track";


export const TrackList = () => {
    
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.library.tracks);
    const [trackList, setTrackList] = useState({});
    const isPlaying = useSelector(state => state.player.isPlaying);
    const [trackListKeys, setTrackListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(A_TO_Z);
    useEffect(()=>{
        //dispatch(setGroupband("tracks"));
        //dispatch(setPlayedFrom({pfKey:TRACK_LIST}));
        dispatch(fethAllSongs());
    },[]);

    useEffect(()=>{
        if(Object.keys(trackList).length>0){
            let tempTrakListKeys = Object.keys(trackList);
            if(sortBy===SORT_YEAR || sortBy===A_TO_Z_DESC){
                tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?-1:1});
            }
            if(sortBy===SORT_ARTIST){
                tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?1:-1});
            }

            setTrackListKeys(tempTrakListKeys);
            scrollToPlaying(isPlaying);
        }
    },[trackList])

    useEffect(()=>{
        if(tracks.length>0){
            if(sortBy===A_TO_Z || sortBy===A_TO_Z_DESC){
                setTrackList(sortGroupByField(tracks, 'title'));
            }else if(sortBy===SORT_YEAR){
                setTrackList(sortGroupByField(tracks, 'year'));
            }else if(sortBy===SORT_ARTIST){
                sortByArtist(tracks);
            }
        }
    },[tracks, sortBy])

    const sortByArtist = (tracks) => {
        let trackList = {};
        let tempArr = [];
        let indArr;
        tracks.forEach((track) => {
            if (track.artist !== null && track.artist !== undefined && track.artist !== "") {
                let ind = track.artist;
                if(ind.includes(",") || ind.includes(";") || ind.includes("&")){
                    if(ind.includes(";") || ind.includes("&")){
                        ind = ind.replaceAll("&", ",");
                        ind = ind.replaceAll(";", ",");
                        indArr = ind.split(",");
                        indArr.forEach((art)=>{
                            if (trackList[art] !== undefined) {
                                tempArr = trackList[art];
                                tempArr.push(track);
                                trackList[art] = tempArr;
                            } else {
                                trackList[art] = [track];
                            }
                        })
                    }
                }else{
                    if (trackList[ind] !== undefined) {
                        tempArr = trackList[ind];
                        tempArr.push(track);
                        trackList[ind] = tempArr;
                    } else {
                        trackList[ind] = [track];
                    }
                }
            }
        })
        setTrackList(trackList);
    }

    return(
        <>
            <SortingContainer sortListKeys={trackListKeys} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[A_TO_Z,A_TO_Z_DESC, SORT_YEAR, SORT_ARTIST]} />
            <div className="track-list">
                {/* {tracks!==undefined && tracks!==null &&
                            tracks.map((track,index) => 
                            track.title!==null && <Track track={track} key={track.songId} playedFrom={TRACK_LIST} index={index} />
                            )
                        } */}

                {trackListKeys !== undefined && trackListKeys.length > 0 && trackListKeys.map((lKey, index) =>
                    <>
                        <label id={"lKey" + lKey} className="track-lKey">{lKey}</label>
                        {trackList[lKey] !== undefined && trackList[lKey].length > 0 && trackList[lKey].map((track, trackIndex) =>
                            <Track track={track} key={track.songId} playedFrom={{pfKey:TRACK_LIST}} index={index} hideTrackNum={true} />
                        )}
                    </>
                )}
            </div>
            <Spinner />
        </>
    );
}