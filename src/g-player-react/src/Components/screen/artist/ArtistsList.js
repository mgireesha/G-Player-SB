import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTIST, ARTISTS, CURRENT_PAGE, SORT_A_TO_Z, SORT_A_TO_Z_DESC, SORT_COUNT_TRACKS } from "../../redux/GPActionTypes";
import { fetchAllArtistsDtls } from "../../redux/library/LibraryActions";
import { setCookies, sortGroupByField } from "../../utilities/util";
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
            if(sortBy===SORT_A_TO_Z || sortBy===SORT_A_TO_Z_DESC){
                setArtistsDetailsList(sortGroupByField(artistsDetailsFS,'artistName'));
            }
            if(sortBy===SORT_COUNT_TRACKS){
                let tempArtistsDetails = [...artistsDetailsFS];
                tempArtistsDetails = tempArtistsDetails.sort((a, b)=>a.count > b.count?-1:1);
                setAlbumArtistsDetails(tempArtistsDetails);
            }
        }
    },[artistsDetailsFS, sortBy]);

    useEffect(()=>{
        if(Object.keys(artistsDetailsList).length>0){
            let tempArtistsDetailsListKeys = Object.keys(artistsDetailsList);
            if(sortBy===SORT_A_TO_Z_DESC){
                tempArtistsDetailsListKeys = tempArtistsDetailsListKeys.sort((a,b)=>{return a>b?-1:1})
            }
            setArtistsDetailsListKeys(tempArtistsDetailsListKeys);
        }
    },[artistsDetailsList]);
    
    return(
        <>
            <SortingContainer sortListKeys={artistsDetailsListKeys} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[SORT_A_TO_Z,SORT_A_TO_Z_DESC, SORT_COUNT_TRACKS]} showSortByLabel={true} />
            <div className="artists-list">
                {sortBy === SORT_COUNT_TRACKS && artistsDetails?.map((artist, index) =>
                    <ArtistThumb artist={artist} key={index} />
                )}
                {sortBy!==SORT_COUNT_TRACKS && artistsDetailsListKeys?.map((lKey, index) =>
                    <>
                        <label id={"lKey" + lKey} className="artists-lKey" key={index}>{lKey}</label>
                        {artistsDetailsList[lKey]?.map((artist, artistIndex) =>
                            <ArtistThumb artist={artist} key={artistIndex} />
                        )}
                    </>
                )}
            </div>
        </>
    );
}