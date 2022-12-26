import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTISTS } from "../../redux/GPActionTypes";
import { fetchAllArtistsDtls, setGroupband } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { ArtistThumb } from "./ArtistThumb";

export const ArtistsList = () => {
    const dispatch = useDispatch();
    let artistsDetails = useSelector(state => state.library.artistsDetails);
    if(artistsDetails!==null && artistsDetails!==undefined && artistsDetails.length>0){
        console.log("artistsDetails: ",typeof(artistsDetails))
        artistsDetails = artistsDetails.sort();
    }
    
    const artistsImgsDetails = useSelector(state => state.library.artistsImgsDetails);
    useEffect(()=>{
        dispatch(fetchAllArtistsDtls());
        dispatch(setGroupband("artists"));
        dispatch(setPlayedFrom(ARTISTS));
    },[]);
    return(
        <div className="artists-list">
            {artistsDetails!==null && artistsDetails!==undefined && artistsDetails.length>0 && artistsDetails.map(artist =>
                    <ArtistThumb artist={artist} artistsImgsDetails={artistsImgsDetails} />
                )}
        </div>
    );
}