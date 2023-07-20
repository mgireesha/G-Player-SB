import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTIST, ARTISTS, A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, SORT_COUNT_TRACKS } from "../../redux/GPActionTypes";
import { fetchAllArtistsDtls } from "../../redux/library/LibraryActions";
import { setCookies, sortGroupByField } from "../../utli";
import { SortingContainer } from "../SortingContainer";
import { ArtistThumb } from "./ArtistThumb";

export const ArtistsList = () => {
    const dispatch = useDispatch();
    let artistsDetailsFS = useSelector(state => state.library.artistsDetails);
    const [artistsDetails, setAlbumArtistsDetails] = useState([]);
    const [artistsDetailsList, setArtistsDetailsList] = useState({});
    const [artistsDetailsListKeys, setArtistsDetailsListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_COUNT_TRACKS);
    
    useEffect(()=>{
        dispatch(fetchAllArtistsDtls(ARTIST));
        setCookies(CURRENT_PAGE, JSON.stringify({type:ARTISTS}));
    },[]);

    useEffect(()=>{
        if(artistsDetailsFS.length>0){
            if(sortBy===A_TO_Z || sortBy===A_TO_Z_DESC){
                setArtistsDetailsList(sortGroupByField(artistsDetailsFS,'artistName'));
            }
            if(sortBy===SORT_COUNT_TRACKS){
                let tempArtistsDetails = [...artistsDetailsFS];
                tempArtistsDetails = tempArtistsDetails.sort((a, b)=>a.count > b.count?-1:1);
                //tempArtistsDetails = tempArtistsDetails.sort((a, b)=>b.imgAvl?1:-1);
                //tempArtistsDetails = tempArtistsDetails.filter(artist => {return artist.imgAvl || artist.count>1})
                setAlbumArtistsDetails(tempArtistsDetails);
            }
        }
    },[artistsDetailsFS, sortBy]);

    useEffect(()=>{
        if(Object.keys(artistsDetailsList).length>0){
            let tempArtistsDetailsListKeys = Object.keys(artistsDetailsList);
            if(sortBy===A_TO_Z_DESC){
                tempArtistsDetailsListKeys = tempArtistsDetailsListKeys.sort((a,b)=>{return a>b?-1:1})
            }
            setArtistsDetailsListKeys(tempArtistsDetailsListKeys);
        }
    },[artistsDetailsList]);
    
    return(
        <>
            <SortingContainer sortListKeys={artistsDetailsListKeys} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[A_TO_Z,A_TO_Z_DESC, SORT_COUNT_TRACKS]} />
            <div className="artists-list">
                {sortBy === SORT_COUNT_TRACKS && artistsDetails!==null && artistsDetails!==undefined && artistsDetails.length>0 && artistsDetails.map((artist, index) =>
                    <ArtistThumb artist={artist} key={index} />
                )}
                {sortBy!==SORT_COUNT_TRACKS && artistsDetailsListKeys !== undefined && artistsDetailsListKeys.length > 0 && artistsDetailsListKeys.map((lKey, index) =>
                    <>
                        <label id={"lKey" + lKey} className="artists-lKey">{lKey}</label>
                        {artistsDetailsList[lKey] !== undefined && artistsDetailsList[lKey].length > 0 && artistsDetailsList[lKey].map((artist, artistIndex) =>
                            <ArtistThumb artist={artist} key={artistIndex} />
                        )}
                    </>
                )}
            </div>
        </>
    );
}