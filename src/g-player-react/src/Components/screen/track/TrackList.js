import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, SORT_YEAR, SORT_ARTIST, A_TO_Z_DESC, TRACK_LIST, TRACK_NUMBER, LYRICS_AVAILABLE, NO_SORT } from "../../redux/GPActionTypes";
import { scrollToPlaying, sortGroupByField } from "../../utilities/util";
import { SortingContainer } from "../SortingContainer";
import { Spinner } from "../../utilities/Spinner";
import { Track } from "./Track";
import {ViewportList} from "react-viewport-list";
import { useRef } from "react";


export const TrackList = ({tracks, trackListInp}) => {
    const ref = useRef(null);
    const [trackList, setTrackList] = useState({});
    const isPlaying = useSelector(state => state.player.isPlaying);
    const [trackListKeys, setTrackListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [trackIndex, setTrackIndex] = useState({});

    useEffect(()=>{
        setSortBy(trackListInp.selectedSortBy?trackListInp.selectedSortBy:NO_SORT);
    },[trackListInp])

    useEffect(()=>{
        if(Object.keys(trackList).length>0){
            let tempTrakListKeys = Object.keys(trackList);
            switch (sortBy) {
                case SORT_YEAR || A_TO_Z_DESC || LYRICS_AVAILABLE:
                    tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?-1:1});
                    break;
                case A_TO_Z || SORT_ARTIST:
                    tempTrakListKeys = tempTrakListKeys.sort((a,b)=>{return a>b?1:-1});
                    break;
                default:
                    break;
            }
            setTrackListKeys(tempTrakListKeys);
            if(trackListInp.playedFrom.pfKey !== TRACK_LIST){
                scrollToPlaying(isPlaying);
            }
            
            const tempTrackIndex = {};
            let list = [];
            if(sortBy !== NO_SORT){
                tempTrakListKeys.forEach(tlk =>{
                    list = trackList[tlk];
                        list.forEach(tr =>{
                            tempTrackIndex[tr.songId] = Object.keys(tempTrackIndex).length;
                        })
                })
            }
            setTrackIndex(tempTrackIndex);
        }
    },[trackList, sortBy])

    useEffect(()=>{
        if(tracks.length>0){
            switch (sortBy) {
                case A_TO_Z || A_TO_Z_DESC:
                    setTrackList(sortGroupByField(tracks, 'title'));
                    break;
                case SORT_YEAR:
                    setTrackList(sortGroupByField(tracks, 'year'));
                    break;
                case TRACK_NUMBER:
                    setTrackList(sortGroupByField(tracks, 'trackNumber'));
                    break;
                case LYRICS_AVAILABLE:
                    setTrackList(sortGroupByField(tracks, 'lyricsAvl'));
                    break;
                case SORT_ARTIST:
                    sortByArtist(tracks);
                    break;
                default:
                    setTrackList(tracks)
                    break;
            }
        }
    },[tracks, sortBy]);

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
            {trackListInp.showSort &&<SortingContainer sortListKeys={trackListKeys} setSortBy={setSortBy} sortBy={sortBy} showLKey={trackListInp.showLKey} sortSelectors={trackListInp.sortSelectors} />}
            <div className="track-list scroll-container" id={TRACK_LIST} style={trackListInp.traskListStyle?trackListInp.traskListStyle:{}} ref={ref}>
                 {trackListKeys && trackListKeys.length > 0 && trackListKeys.map((lKey, index) =>
                    <>
                        {trackListInp.showLKey && <label id={"lKey" + lKey} className="track-lKey" style={trackListInp.lKeyStyle?trackListInp.lKeyStyle:{}}>{lKey}</label>}
                        {trackList[lKey] && trackList[lKey].length > 0 && Object.keys(trackIndex).length > 0 &&
                            <ViewportList viewportRef={ref} items={trackList[lKey]} itemMinSize={tracks ? tracks.length:50} margin={8}>
                                {(track) => (
                                    <Track track={track} key={track.songId} playedFrom={trackListInp.playedFrom} index={trackIndex[track.songId]} hideTrackNum={trackListInp.hideTrackNum} />
                                )}
                            </ViewportList>
                        }
                    </>
                )}
                {sortBy===NO_SORT && tracks && tracks.length > 0 && tracks.map((track, i)=>
                    <Track track={track} key={track.songId} playedFrom={trackListInp.playedFrom} index={i} hideTrackNum={trackListInp.hideTrackNum} />
                )}
            </div>
            <Spinner />
        </>
    );
}