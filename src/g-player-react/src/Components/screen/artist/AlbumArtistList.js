import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM_ARTIST, ALBUM_ARTISTS, A_TO_Z, A_TO_Z_DESC, SORT_COUNT_ALBUMS, SORT_YEAR } from "../../redux/GPActionTypes";
import { fetchAllAlbumArtistsDtls, setGroupband } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { sortGroupByField } from "../../utli";
import { AlbumArtistThumb } from "../artist/AlbumArtistThumb";
import { SortingContainer } from "../SortingContainer";

export const AlbumArtistList = () => {
    const dispatch = useDispatch();
    let albumArtistsDetailsFS = useSelector(state => state.library.albumArtistsDetails);
    const [albumArtistsDetails, setAlbumArtistsDetails] = useState([]);
    const [albumArtistsDetailsList, setAlbumArtistsDetailsList] = useState({});
    const [albumArtistsDetailsListKeys, setAlbumArtistsDetailsListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_COUNT_ALBUMS);

    useEffect(()=>{
        dispatch(fetchAllAlbumArtistsDtls(ALBUM_ARTIST));
        dispatch(setGroupband("album_artists"));
        dispatch(setPlayedFrom(ALBUM_ARTISTS));
    },[]);

    useEffect(()=>{
        if(albumArtistsDetailsFS.length>0){
            if(sortBy===A_TO_Z || sortBy===A_TO_Z_DESC){
                setAlbumArtistsDetailsList(sortGroupByField(albumArtistsDetailsFS,'artistName'));
            }
            if(sortBy===SORT_COUNT_ALBUMS){
                let tempAlbumArtistsDetails = [...albumArtistsDetailsFS];
                tempAlbumArtistsDetails = tempAlbumArtistsDetails.sort((a, b)=>a.count > b.count?-1:1);
                tempAlbumArtistsDetails = tempAlbumArtistsDetails.sort((a, b)=>b.imgAvl?1:-1);
                setAlbumArtistsDetails(tempAlbumArtistsDetails);
            }
        }
    },[albumArtistsDetailsFS, sortBy]);

    useEffect(()=>{
        if(Object.keys(albumArtistsDetailsList).length>0){
            let tempAlbumArtistsDetailsListKeys = Object.keys(albumArtistsDetailsList);
            if(sortBy===A_TO_Z_DESC){
                tempAlbumArtistsDetailsListKeys.sort((a,b)=>{return a>b?-1:1})
            }
            setAlbumArtistsDetailsListKeys(tempAlbumArtistsDetailsListKeys);
        }
    },[albumArtistsDetailsList]);

    return(
        <>
            <SortingContainer sortListKeys={albumArtistsDetailsListKeys} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[A_TO_Z,A_TO_Z_DESC, SORT_COUNT_ALBUMS]} />
            <div className="album-artists-list">
                {sortBy===SORT_COUNT_ALBUMS && albumArtistsDetails!==null && albumArtistsDetails!==undefined && albumArtistsDetails.length>0 && albumArtistsDetails.map((albumArtist, index) =>
                    <AlbumArtistThumb albumArtist={albumArtist} key={index} />
                )}
                {sortBy!==SORT_COUNT_ALBUMS && albumArtistsDetailsListKeys !== undefined && albumArtistsDetailsListKeys.length > 0 && albumArtistsDetailsListKeys.map((lKey, index) =>
                    <>
                        <label id={"lKey" + lKey} className="album-artists-lKey">{lKey}</label>
                        {albumArtistsDetailsList[lKey] !== undefined && albumArtistsDetailsList[lKey].length > 0 && albumArtistsDetailsList[lKey].map((albumArtist, albumArtistIndex) =>
                            <AlbumArtistThumb albumArtist={albumArtist} key={albumArtistIndex} />
                        )}
                    </>
                )}
            </div>
        </>
    );
}